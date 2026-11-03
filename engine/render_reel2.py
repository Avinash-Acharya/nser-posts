"""Render the motion-graphics reel. Usage: python3 render_reel2.py <post_dir> [--frames t1,t2,...]"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
pd = os.path.abspath(sys.argv[1]); rd = os.path.join(pd, "reel")
tl = json.load(open(os.path.join(rd, "timeline.json"), encoding="utf-8"))
post = json.load(open(os.path.join(pd, "post.json"), encoding="utf-8"))
post["_dir"] = "file://" + pd + "/"
FPS = 30
stills = sys.argv[3].split(",") if len(sys.argv) > 3 and sys.argv[2] == "--frames" else None
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("file://" + os.path.join(HERE, "reel2.html"))
    pg.evaluate("([t,p]) => window.setTimeline(t,p)", [tl, post]); pg.evaluate("document.fonts.ready")
    pg.evaluate("Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})))")
    if stills:
        for s in stills:
            pg.evaluate(f"window.render({float(s)})")
            pg.screenshot(path=os.path.join(rd, f"still_{s}.jpg"), type="jpeg", quality=92)
        print("errors:", errs); b.close(); sys.exit(0)
    tmp = os.path.join(rd, "reel.tmp.mp4"); out = os.path.join(rd, "reel.mp4")
    n = int(tl["total"] * FPS) + 1
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
        "-i", os.path.join(rd, "narration.wav"), "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-pix_fmt", "yuv420p", "-r", str(FPS),
        "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-t", str(tl["total"]), "-movflags", "+faststart", tmp], stdin=subprocess.PIPE)
    for f in range(n):
        pg.evaluate(f"window.render({f / FPS})")
        ff.stdin.write(pg.screenshot(type="jpeg", quality=92))
    b.close(); ff.stdin.close()
    if ff.wait() == 0: os.replace(tmp, out); print(f"{n} frames -> {out}", "errors:", errs)
    else: print("ffmpeg failed")
