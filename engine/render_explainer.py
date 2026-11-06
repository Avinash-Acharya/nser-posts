"""Render the explainer reel (engine/explainer.html) with narration, sound effects and a soft music bed.
Usage: python3 render_explainer.py <post_dir> [--frames t1,t2,...] [--no-music]
Needs <post_dir>/reel/narration.wav + timeline.json from tts.py.
"""
import json, os, subprocess, sys
import numpy as np, soundfile as sf
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, "audio"))
import sfx

pd = os.path.abspath(sys.argv[1]); rd = os.path.join(pd, "reel")
tl = json.load(open(os.path.join(rd, "timeline.json"), encoding="utf-8"))
post = json.load(open(os.path.join(pd, "post.json"), encoding="utf-8")); post["_dir"] = "file://" + pd + "/"
FPS = 30
stills = sys.argv[sys.argv.index("--frames") + 1].split(",") if "--frames" in sys.argv else None
MUSIC = "--no-music" not in sys.argv and post.get("music", True)


def mix(events, total, out):
    SR = sfx.SR; n = int((total + .5) * SR); buf = np.zeros((n, 2))
    v, sr0 = sf.read(os.path.join(rd, "narration.wav"), dtype="float64")
    if v.ndim > 1: v = v.mean(1)
    v = np.interp(np.arange(0, len(v), sr0 / SR), np.arange(len(v)), v)          # 24k -> 48k
    v = sfx.compress(sfx.norm(v, .9), thr=.3, ratio=3)
    # voice envelope for ducking
    win = int(.12 * SR); env = np.convolve(np.abs(v), np.ones(win) / win, "same"); env = np.clip(env / (env.max() + 1e-9) * 4, 0, 1)
    if MUSIC:
        m = music(total, SR)[:n]; duck = 1 - .55 * np.pad(env, (0, max(0, len(m) - len(env))))[:len(m)]
        buf[:len(m)] += (m * duck[:, None]) * .16
    lib = {"whoosh": lambda: sfx.whoosh(.32), "pop": sfx.pop, "click": lambda: sfx.click(1.2), "tick": lambda: sfx.click(1.8, .6),
           "ding": sfx.ding, "step": sfx.step, "creak": sfx.creak, "thump": lambda: sfx.thump(1, 90),
           "clink": lambda: sfx.click(2.4), "scribble": lambda: sfx.lp(sfx.bp(sfx.noise(.28), 1500, 5000) * np.abs(np.sin(np.linspace(0, 18, int(.28 * SR)))), 6000),
           "whoosh_up": lambda: sfx.whoosh(.7)}
    for t, name, g in events:
        if name in lib: sfx.add(buf, sfx.norm(lib[name]()), t, g * .55, pan=float(np.clip(np.sin(t * 7) * .3, -.3, .3)))
    vv = np.zeros(n); vv[:min(n, len(v))] = v[:n]
    buf[:, 0] += vv * .9; buf[:, 1] += vv * .9
    buf = np.stack([sfx.limit(buf[:, 0], .95), sfx.limit(buf[:, 1], .95)], 1)
    sf.write(out, buf.astype(np.float32), SR)


def music(total, SR):
    """A soft, warm loop: electric-piano chords + a light pluck arpeggio + a shaker. Original, made here."""
    bpm = 92; beat = 60 / bpm; n = int((total + 1) * SR); out = np.zeros((n, 2))
    prog = [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 65]]   # Cmaj7 Am7 Fmaj7 G7
    f = lambda m: 440 * 2 ** ((m - 69) / 12)
    def ep(freq, d):
        t = np.arange(int(d * SR)) / SR; e = np.exp(-t / 1.4) * np.minimum(1, t / .02)
        return (np.sin(2 * np.pi * freq * t) + .35 * np.sin(4 * np.pi * freq * t) * np.exp(-t / .3) + .1 * np.sin(6 * np.pi * freq * t)) * e
    def pluck(freq, d=.5):
        t = np.arange(int(d * SR)) / SR; return np.sin(2 * np.pi * freq * t) * np.exp(-t / .18) * np.minimum(1, t / .004)
    bar = 4 * beat; k = 0; tt = 0.0
    while tt < total + bar:
        ch = prog[k % 4]
        for j, m in enumerate(ch):
            s = ep(f(m), bar * 1.1) * .16; a = int(tt * SR); e = min(n, a + len(s)); pan = (j - 1.5) * .25
            if a >= n: continue
            out[a:e, 0] += s[:e - a] * (1 - pan); out[a:e, 1] += s[:e - a] * (1 + pan)
        for q in range(8):                                   # eighth-note arpeggio
            m = ch[[0, 2, 1, 3, 2, 1, 3, 2][q]] + 12; s = pluck(f(m)) * (.07 if q % 2 else .1)
            a = int((tt + q * beat / 2) * SR); e = min(n, a + len(s))
            if a < n: out[a:e, 0] += s[:e - a] * .8; out[a:e, 1] += s[:e - a] * 1.1
        for q in range(8):                                   # shaker
            s = sfx.hp(sfx.noise(.06), 6000) * sfx.env_exp(.06, .012) * (.05 if q % 2 else .03)
            a = int((tt + q * beat / 2) * SR); e = min(n, a + len(s))
            if a < n: out[a:e] += s[:e - a, None]
        tt += bar; k += 1
    fade = np.ones(n); fl = int(1.5 * SR); fade[-fl:] = np.linspace(1, 0, fl); fade[:int(.5 * SR)] = np.linspace(0, 1, int(.5 * SR))
    return out * fade[:, None] / (np.abs(out).max() + 1e-9)


with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)   # 2x supersampling: smooth ink edges
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("file://" + os.path.join(HERE, "explainer.html"))
    pg.evaluate("([t,p]) => window.setTimeline(t,p)", [tl, post]); pg.evaluate("document.fonts.ready")
    pg.evaluate("Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})))")
    if "--mix-only" in sys.argv and os.path.exists(os.path.join(rd, "video.tmp.mp4")):
        events = pg.evaluate("window.EV"); b.close(); stills = None; SKIP = True
    else: SKIP = False
    if stills:
        for s in stills:
            pg.evaluate(f"window.render({float(s)})"); pg.screenshot(path=os.path.join(rd, f"still_{s}.jpg"), type="jpeg", quality=90)
        print("errors:", errs); b.close(); sys.exit(0)
    total = tl["total"]; n = int(total * FPS) + 1
    vid = os.path.join(rd, "video.tmp.mp4")
    if not SKIP:
      events = pg.evaluate("window.EV")
      # lossless PNG frames + a high-quality encode: Instagram re-compresses everything, so give it a clean, high-bitrate source
      ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-", "-vf", "scale=1080:1920:flags=lanczos",
                           "-c:v", "libx264", "-preset", "slow", "-tune", "animation", "-b:v", "12M", "-maxrate", "16M", "-bufsize", "32M", "-profile:v", "high", "-level", "4.2",
                           "-x264-params", "keyint=60:min-keyint=30:nal-hrd=vbr", "-pix_fmt", "yuv420p", vid], stdin=subprocess.PIPE)
      for fr in range(n):
          pg.evaluate(f"window.render({fr / FPS})"); ff.stdin.write(pg.screenshot(type="jpeg", quality=95))
      b.close(); ff.stdin.close(); ff.wait()
mixw = os.path.join(rd, "mix.wav"); mix(events, total, mixw)
out = os.path.join(rd, "reel.mp4")
r = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", vid, "-i", mixw, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11",
                    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", str(total), "-movflags", "+faststart", out])
os.remove(vid)
print(f"{n} frames -> {out}" if r.returncode == 0 else "ffmpeg mux failed", "errors:", errs)
