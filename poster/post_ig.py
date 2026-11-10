"""Publish today's nser post to Instagram through the official Graph API.

Usage:  python poster/post_ig.py carousel|reel|check [--date YYYY-MM-DD] [--force]

Reads   posts/<date>/  (carousel/*.jpg + caption.txt, reel.mp4 + reel-caption.txt)
Checks  the Notion "Content Queue" row whose Post date = <date>:
        posts only if Status is Approved or Failed (= approved, retry) (or Ready when AUTO_APPROVE=true). Skipped = never.
Writes  the post link back to Notion, and Status = Posted once both are out.

Env:    IG_USER_ID, IG_TOKEN            (Instagram professional account id + page access token)
        NOTION_TOKEN, NOTION_DB         (Notion connection token + Content Queue database id)
        AUTO_APPROVE=true|false         GITHUB_REPOSITORY (set by GitHub Actions)
"""
import datetime as dt, glob, json, os, sys, time, urllib.parse, urllib.request

GRAPH = "https://graph.facebook.com"
IST = dt.timezone(dt.timedelta(hours=5, minutes=30))
DRY = False
# GitHub's own timer can fire hours late; a late scheduled run must not post at 2am.
WINDOW = {"carousel": (10, 14), "reel": (18, 22)}   # IST hours, [start, end)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def die(msg):
    print("ERROR:", msg); sys.exit(1)


def http(method, url, data=None, headers=None, raw=None):
    body = raw if raw is not None else (urllib.parse.urlencode(data).encode() if data and method != "GET" else None)
    if data and method == "GET":
        url += ("&" if "?" in url else "?") + urllib.parse.urlencode(data)
    req = urllib.request.Request(url, data=body, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        txt = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {url.split('?')[0]} -> {e.code}: {txt[:600]}")


# ---------- Instagram ----------
def ig(method, path, **params):
    params["access_token"] = os.environ["IG_TOKEN"]
    return http(method, f"{GRAPH}/{path}", params)


def wait_ready(container, label, timeout=600):
    t0 = time.time()
    while time.time() - t0 < timeout:
        st = ig("GET", container, fields="status_code,status").get("status_code")
        print(f"  {label}: {st}")
        if st == "FINISHED": return
        if st in ("ERROR", "EXPIRED"): die(f"{label} processing failed: {ig('GET', container, fields='status')}")
        time.sleep(8)
    die(f"{label} not ready after {timeout}s")


def permalink(media_id):
    try: return ig("GET", media_id, fields="permalink").get("permalink", "")
    except Exception: return ""


def publish_carousel(day, user):
    folder = os.path.join(ROOT, "posts", day)
    slides = sorted(glob.glob(os.path.join(folder, "carousel", "*.jpg")))
    if not 2 <= len(slides) <= 20: die(f"carousel needs 2-20 JPEGs, found {len(slides)}")
    caption = open(os.path.join(folder, "caption.txt"), encoding="utf-8").read().strip()
    repo = os.environ.get("GITHUB_REPOSITORY", "Avinash-Acharya/nser-posts")
    base = f"https://raw.githubusercontent.com/{repo}/main/posts/{day}/carousel/"
    alt = json.load(open(os.path.join(folder, "post.json"), encoding="utf-8")).get("carousel_alt", "")
    kids = []
    for i, s in enumerate(slides):
        params = dict(image_url=base + os.path.basename(s), is_carousel_item="true")
        if alt and i == 0: params["alt_text"] = alt[:1000]
        try: c = ig("POST", f"{user}/media", **params)
        except RuntimeError as e:
            if "alt_text" in str(e): params.pop("alt_text", None); c = ig("POST", f"{user}/media", **params)
            else: raise
        kids.append(c["id"]); print(f"  slide {i+1}/{len(slides)} -> {c['id']}")
    for k in kids: wait_ready(k, "slide")
    parent = ig("POST", f"{user}/media", media_type="CAROUSEL", children=",".join(kids), caption=caption)["id"]
    wait_ready(parent, "carousel")
    if DRY: return "dry run OK: uploaded and processed, NOT published"
    mid = ig("POST", f"{user}/media_publish", creation_id=parent)["id"]
    return permalink(mid) or mid


def publish_reel(day, user):
    folder = os.path.join(ROOT, "posts", day)
    path = os.path.join(folder, "reel.mp4")
    if not os.path.exists(path): die("reel.mp4 missing")
    caption = open(os.path.join(folder, "reel-caption.txt"), encoding="utf-8").read().strip()
    params = dict(media_type="REELS", upload_type="resumable", caption=caption, share_to_feed="true",
                  thumb_offset="1500", is_ai_generated="true")   # AI voice -> Instagram's AI label
    data = open(path, "rb").read()
    repo = os.environ.get("GITHUB_REPOSITORY", "Avinash-Acharya/nser-posts")
    video_url = f"https://raw.githubusercontent.com/{repo}/main/posts/{day}/reel.mp4"
    # Meta's upload server sometimes answers 400 ProcessingFailedError at random.
    # So: try the direct upload 3 times (fresh container each time), then let Instagram fetch the file itself.
    for attempt in range(1, 5):
        url_mode = attempt == 4
        p = dict(params, video_url=video_url) if url_mode else params
        if url_mode: p.pop("upload_type", None)
        try:
            try: c = ig("POST", f"{user}/media", **p)
            except RuntimeError as e:
                if "is_ai_generated" not in str(e): raise
                params.pop("is_ai_generated", None); p.pop("is_ai_generated", None); c = ig("POST", f"{user}/media", **p)
            cid = c["id"]
            if url_mode:
                print("  direct upload kept failing; Instagram is fetching the file from GitHub instead")
                break
            uri = c.get("uri") or f"https://rupload.facebook.com/ig-api-upload/{cid}"
            http("POST", uri, raw=data, headers={"Authorization": "OAuth " + os.environ["IG_TOKEN"],
                                                "offset": "0", "file_size": str(len(data))})
            print(f"  uploaded {len(data)//1024} KB")
            break
        except RuntimeError as e:
            if url_mode: raise
            print(f"  upload attempt {attempt} failed: {str(e)[:200]}. Retrying in 20s...")
            time.sleep(20)
    wait_ready(cid, "reel", timeout=900)
    if DRY: return "dry run OK: uploaded and processed, NOT published"
    mid = ig("POST", f"{user}/media_publish", creation_id=cid)["id"]
    return permalink(mid) or mid


def token_warning():
    """Meta tokens have a 90-day 'data access' clock. Warn 14 days before it runs out."""
    try:
        d = ig("GET", "debug_token", input_token=os.environ["IG_TOKEN"]).get("data", {})
    except Exception:
        return ""
    now = time.time()
    exp, data_exp = d.get("expires_at", 0), d.get("data_access_expires_at", 0)
    if not d.get("is_valid", True):
        return "Instagram token is no longer valid. Make a new one (see README)."
    for label, t in (("token", exp), ("data access", data_exp)):
        if t and t - now < 14 * 86400:
            return (f"Instagram {label} expires {dt.datetime.fromtimestamp(t, IST):%d %b %Y}. "
                    "Re-do the token steps in README and update the IG_TOKEN secret.")
    return ""


# ---------- Notion ----------
def notion(method, path, body=None):
    return http(method, "https://api.notion.com/v1/" + path,
                raw=json.dumps(body).encode() if body is not None else None,
                headers={"Authorization": "Bearer " + os.environ["NOTION_TOKEN"],
                         "Notion-Version": "2022-06-28", "Content-Type": "application/json"})


def notion_row(day):
    res = notion("POST", f"databases/{os.environ['NOTION_DB']}/query",
                 {"filter": {"property": "Post date", "date": {"equals": day}}}).get("results", [])
    return res[0] if res else None


def prop_text(row, name):
    p = row["properties"].get(name, {})
    if p.get("type") == "select": return (p.get("select") or {}).get("name", "")
    if p.get("type") == "url": return p.get("url") or ""
    return ""


def set_props(row, **props):
    out = {}
    for k, v in props.items():
        out[k] = {"select": {"name": v}} if k == "Status" else ({"url": v} if k.endswith("post") else
                 {"rich_text": [{"text": {"content": v[:1900]}}]})
    notion("PATCH", f"pages/{row['id']}", {"properties": out})


# ---------- main ----------
def main():
    args = sys.argv[1:]
    if not args or args[0] not in ("carousel", "reel", "check"): die(__doc__)
    kind = args[0]
    day = args[args.index("--date") + 1] if "--date" in args else dt.datetime.now(IST).strftime("%Y-%m-%d")
    force = "--force" in args
    global DRY; DRY = "--dry" in args
    if os.environ.get("EVENT") == "schedule" and kind in WINDOW:
        h = dt.datetime.now(IST).hour; a, b = WINDOW[kind]
        if not a <= h < b:
            print(f"Scheduled run fired late ({h}:xx IST), outside the {kind} window. Not posting."); return
    for v in ("IG_USER_ID", "IG_TOKEN", "NOTION_TOKEN", "NOTION_DB"):
        if not os.environ.get(v): die(f"missing secret {v}")
    user = os.environ["IG_USER_ID"]
    warn = token_warning()
    if warn: print("WARNING:", warn)

    if kind == "check":
        me = ig("GET", user, fields="username,media_count")
        print(f"Instagram OK: @{me.get('username')}, {me.get('media_count')} posts")
        d = ig("GET", "debug_token", input_token=os.environ["IG_TOKEN"]).get("data", {})
        fmt = lambda t: "never" if not t else f"{dt.datetime.fromtimestamp(t, IST):%d %b %Y}"
        print(f"Token: type {d.get('type')}, expires {fmt(d.get('expires_at'))}, "
              f"data access until {fmt(d.get('data_access_expires_at'))}")
        lim = ig("GET", f"{user}/content_publishing_limit", fields="quota_usage,config")
        print("Publishing quota:", lim.get("data", lim))
        row = notion_row(day)
        print(f"Notion OK. Row for {day}:", (row and prop_text(row, 'Status')) or "none")
        print("Files:", os.listdir(os.path.join(ROOT, "posts", day)) if os.path.isdir(os.path.join(ROOT, "posts", day)) else "no folder")
        return

    if not os.path.isdir(os.path.join(ROOT, "posts", day)):
        print(f"No post folder for {day}. Nothing to do."); return
    if kind == "carousel" and not os.path.isdir(os.path.join(ROOT, "posts", day, "carousel")):
        print(f"No carousel for {day} (reel-only day). Nothing to do."); return
    row = notion_row(day)
    if not row: print(f"No Notion row with Post date {day}. Nothing to do."); return
    status = prop_text(row, "Status")
    auto = os.environ.get("AUTO_APPROVE", "false").lower() == "true"
    if status == "Skipped": print("Row is Skipped. Not posting."); return
    # 'Failed' means it was approved but Instagram errored, so a re-run may try again.
    if not force and not (status in ("Approved", "Failed") or (auto and status in ("Ready", "Approved"))):
        print(f"Row status is '{status}', not Approved. Not posting."); return
    done_field = "Carousel post" if kind == "carousel" else "Reel post"
    if prop_text(row, done_field) and not force:
        print(f"{kind} already posted: {prop_text(row, done_field)}"); return

    try:
        link = publish_carousel(day, user) if kind == "carousel" else publish_reel(day, user)
    except Exception as e:
        if not DRY: set_props(row, Status="Failed", Notes=f"{kind} failed {dt.datetime.now(IST):%d %b %H:%M}: {e}")
        raise
    print(f"Published {kind}: {link}")
    if DRY: return
    other = prop_text(row, "Reel post" if kind == "carousel" else "Carousel post")
    upd = {done_field: link if link.startswith("http") else None}
    reel_only = not os.path.isdir(os.path.join(ROOT, "posts", day, "carousel"))
    if other or (kind == "reel" and reel_only): upd["Status"] = "Posted"
    if warn: upd["Notes"] = warn
    set_props(row, **{k: v for k, v in upd.items() if v is not None})


if __name__ == "__main__":
    main()
