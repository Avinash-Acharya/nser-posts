"""Download the real photos / video clips a studio reel asks for. Runs on GitHub Actions (open internet).

Each explainer beat may carry  "media": {"q": "hands typing on a laptop", "kind": "video" | "photo"}.
Results go to posts/<date>/media/<beat>.mp4|.jpg plus media/manifest.json. Already-fetched beats are skipped.
A file you drop into posts/<date>/media/<beat>.jpg|.mp4 yourself wins over any search.

Sources, in order:
  1. Pexels (photos + videos, free for commercial use, no attribution needed) - needs secret PEXELS_API_KEY
  2. Openverse (photos only), filtered to CC0 / public domain so no attribution is needed
Never use these to fetch photos of a real, named person: queries must describe scenes, objects, hands, places.

Usage: python poster/fetch_media.py <YYYY-MM-DD | folder>
"""
import json, os, sys, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {"User-Agent": "nser-reels/1.0 (media fetcher)"}


def get(url, headers=None):
    import time
    for attempt in range(4):   # Openverse often answers 504 at first
        try:
            req = urllib.request.Request(url, headers={**UA, **(headers or {})})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504) or attempt == 3: raise
            time.sleep(4 * (attempt + 1))


def pexels_video(q, key):
    d = json.loads(get("https://api.pexels.com/videos/search?" + urllib.parse.urlencode(
        {"query": q, "orientation": "portrait", "per_page": 8, "size": "medium"}), {"Authorization": key}))
    for v in d.get("videos", []):
        if not 3 <= v.get("duration", 0) <= 40: continue
        files = sorted([f for f in v["video_files"] if f.get("file_type") == "video/mp4" and (f.get("height") or 0) >= 1080],
                       key=lambda f: f["height"])
        if files: return files[0]["link"], f"Pexels video {v['id']} by {v['user']['name']}"
    return None, None


def pexels_photo(q, key):
    d = json.loads(get("https://api.pexels.com/v1/search?" + urllib.parse.urlencode(
        {"query": q, "orientation": "portrait", "per_page": 8}), {"Authorization": key}))
    for p in d.get("photos", []):
        return p["src"]["large2x"], f"Pexels photo {p['id']} by {p['photographer']}"
    return None, None


def openverse_photo(q):
    d = json.loads(get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
        {"q": q, "license": "cc0,pdm", "page_size": 10, "mature": "false"})))
    for r in d.get("results", []):
        if (r.get("height") or 0) >= 900 and (r.get("width") or 0) >= 700:
            return r["url"], f"Openverse {r.get('license','')} {r.get('foreign_landing_url','')}"
    return None, None


def main(arg):
    pd = os.path.join(ROOT, arg) if "/" in arg else os.path.join(ROOT, "posts", arg)
    post = json.load(open(os.path.join(pd, "post.json"), encoding="utf-8"))
    md = os.path.join(pd, "media"); os.makedirs(md, exist_ok=True)
    mf = os.path.join(md, "manifest.json")
    man = json.load(open(mf)) if os.path.exists(mf) else {}
    key = os.environ.get("PEXELS_API_KEY", "")
    for i, b in enumerate(post.get("explainer", [])):
        m = b.get("media")
        if not m: continue
        mine = [f for f in os.listdir(md) if f.split(".")[0] == f"{i:02d}" and f.split(".")[-1] in ("jpg", "jpeg", "png", "mp4")]
        if mine:
            man[str(i)] = {"file": mine[0], "kind": "video" if mine[0].endswith(".mp4") else "photo", "credit": man.get(str(i), {}).get("credit", "own")}
            continue
        url = credit = None; kind = m.get("kind", "photo")
        try:
            if key and kind == "video": url, credit = pexels_video(m["q"], key)
            if key and not url: url, credit = pexels_photo(m["q"], key); kind = "photo" if url else kind
            if not url: url, credit = openverse_photo(m["q"]); kind = "photo"
        except Exception as e:
            print(f"  beat {i}: search failed ({e})")
        if not url:
            print(f"  beat {i}: nothing found for '{m['q']}'"); continue
        ext = "mp4" if kind == "video" else "jpg"; fn = f"{i:02d}.{ext}"
        raw = get(url)
        if ext == "mp4":   # keep the repo small: first 10 s, 1280 tall, no audio
            tmp = os.path.join(md, "_raw.mp4"); open(tmp, "wb").write(raw)
            os.system(f'ffmpeg -y -loglevel error -i "{tmp}" -t 10 -an -vf "scale=-2:1280" -c:v libx264 -crf 26 -preset veryfast "{os.path.join(md, fn)}"')
            os.remove(tmp)
        else:
            open(os.path.join(md, fn), "wb").write(raw)
        man[str(i)] = {"file": fn, "kind": kind, "credit": credit, "q": m["q"]}
        print(f"  beat {i}: {kind} <- {credit}")
    json.dump(man, open(mf, "w"), indent=1)
    print(f"{len(man)} media files in {md}")


if __name__ == "__main__":
    main(sys.argv[1])
