"""Render the UI-motion reel (engine/reel3.html). Usage: python3 render_reel3.py <post_dir> [--frames t1,t2,...]"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
pd = os.path.abspath(sys.argv[1]); rd = os.path.join(pd, "reel")
tl = json.load(open(os.path.join(rd, "timeline.json"), encoding="utf-8"))
post = json.load(open(os.path.join(pd, "post.json"), encoding="utf-8"))
post["_dir"] = "file://" + pd + "/"
FPS = int(os.environ.get("FPS", "60"))
stills = sys.argv[3].split(",") if len(sys.argv) > 3 and sys.argv[2] == "--frames" else None
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("file://" + os.path.join(HERE, "reel3.html"))
    pg.evaluate("([t,p]) => window.setTimeline(t,p)", [tl, post]); pg.evaluate("document.fonts.ready")
    pg.evaluate("Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})))")
    # soft UI click under each cursor press (pure synth, -20 dB under the voice)
    import numpy as np, wave
    clicks = pg.evaluate("window.CLICKS")
    w = wave.open(os.path.join(rd, "narration.wav")); sr = w.getframerate(); ch = w.getnchannels(); sw = w.getsampwidth()
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32).reshape(-1, ch); w.close()
    n_ = int(.03 * sr); tt = np.arange(n_) / sr
    clk = (np.sin(2*np.pi*2400*tt) * .6 + np.random.default_rng(1).normal(0, .3, n_)) * np.exp(-tt * 260) * 3200
    for c in clicks:
        i = int(c * sr)
        if i + n_ < len(a): a[i:i+n_] += clk[:, None]
    mix = os.path.join(rd, "narration_mix.wav"); o = wave.open(mix, "wb"); o.setnchannels(ch); o.setsampwidth(2); o.setframerate(sr)
    o.writeframes(np.clip(a, -32768, 32767).astype(np.int16).tobytes()); o.close()
    if stills:
        for s in stills:
            pg.evaluate(f"window.render({float(s)})")
            pg.screenshot(path=os.path.join(rd, f"still_{s}.jpg"), type="jpeg", quality=92)
        print("errors:", errs); b.close(); sys.exit(0)
    tmp = os.path.join(rd, "reel.tmp.mp4"); out = os.path.join(rd, "reel.mp4")
    n = int(tl["total"] * FPS) + 1
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
        "-i", mix, "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-pix_fmt", "yuv420p", "-r", str(FPS),
        "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-t", str(tl["total"]), "-movflags", "+faststart", tmp], stdin=subprocess.PIPE)
    for f in range(n):
        pg.evaluate(f"window.render({f / FPS})")
        ff.stdin.write(pg.screenshot(type="jpeg", quality=92))
    b.close(); ff.stdin.close()
    if ff.wait() == 0: os.replace(tmp, out); print(f"{n} frames -> {out}", "errors:", errs)
    else: print("ffmpeg failed")
