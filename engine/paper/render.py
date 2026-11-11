"""Render an nser reel in the PAPER style (cut paper, present-day India) from a post folder.

  python3 engine/paper/render.py posts/<slot>              full reel -> posts/<slot>/reel.mp4 (needs voice/ from the PC)
  python3 engine/paper/render.py posts/<slot> --estimate   no voice yet: timing estimated from the Hindi text, writes
                                                           posts/<slot>/review.jpg (contact sheet, a frame every 0.6 s)
  add --sheet to a full render to also write review.jpg

The post folder needs post.json ("explainer" beats with "hi" + "say", "style": "paper") and shots.js (the shot list,
written for this reel; start from engine/paper/src/shots.js). Timing: engine/tts.py turns the PC voice into
reel/narration.wav + reel/timeline.json; each beat becomes one "line" the shots are placed on (L(i), Le(i)).
Needs Node 22+, ffmpeg, Chrome/Chromium (CHROME=/path overrides), python numpy scipy soundfile.
"""
import json, os, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
pd = os.path.abspath(sys.argv[1]); EST = "--estimate" in sys.argv; SHEET = "--sheet" in sys.argv or EST
post = json.load(open(os.path.join(pd, "post.json"), encoding="utf-8"))
beats = post["explainer"]
if not os.path.exists(os.path.join(pd, "shots.js")): sys.exit(f"{pd}/shots.js missing: write the shot list first")

# 1. timing
if EST:
    CPS, GAP, t, L = 18.3, 0.1, 0.12, []          # Hindi chars per second measured on the VoxCPM storyteller voice
    for i, b in enumerate(beats):
        d = max(1.2, len(b["hi"]) / CPS); L.append({"i": i, "text": b["say"], "start": round(t, 3), "end": round(t + d, 3)}); t += d + GAP
    total = round(t + 0.5, 3)
else:
    subprocess.run([sys.executable, os.path.join(ROOT, "engine", "tts.py"), pd, "none"], check=True)
    tl = json.load(open(os.path.join(pd, "reel", "timeline.json")))
    L = [{"i": i, "text": b["say"], "start": round(0.12 if i == 0 else x["start"], 3), "end": round((0.12 if i == 0 else x["start"]) + x["speech"], 3)}
         for i, (b, x) in enumerate(zip(beats, tl["beats"]))]
    total = tl["total"]
words = []
for l in L:
    ws = l["text"].split(); d = (l["end"] - l["start"]) / max(1, len(ws))
    words += [{"w": w, "line": l["i"], "s": round(l["start"] + k * d, 3), "e": round(l["start"] + (k + 1) * d - .02, 3)} for k, w in enumerate(ws)]

# 2. a throwaway project: engine + this reel's shots + timing + voice
tmp = tempfile.mkdtemp(prefix="paper-")
for f in ("index.html", "src", "tools", "fonts"):
    (shutil.copytree if os.path.isdir(os.path.join(HERE, f)) else shutil.copy)(os.path.join(HERE, f), os.path.join(tmp, f))
shutil.copy(os.path.join(pd, "shots.js"), os.path.join(tmp, "src", "shots.js"))
os.makedirs(os.path.join(tmp, "data"))
json.dump({"title": post.get("topic", ""), "music": post.get("music", "bed"), "captions": False,
           "lines": [{"text": b["say"], "caps": ""} for b in beats]}, open(os.path.join(tmp, "script.json"), "w"), ensure_ascii=False)
json.dump({"duration": total, "lines": L}, open(os.path.join(tmp, "data", "lines.json"), "w"))
json.dump(words, open(os.path.join(tmp, "data", "words.json"), "w"))
nar = os.path.join(pd, "reel", "narration.wav")
if not EST and os.path.exists(nar): shutil.copy(nar, os.path.join(tmp, "data", "narration.wav"))

def node(*a): r = subprocess.run(["node", "tools/capture.mjs", *a], cwd=tmp, capture_output=True, text=True); print(r.stdout[-1500:], r.stderr[-1500:]); return r
r = node("check")
if "CHECK OK" not in r.stdout: sys.exit("shots.js failed the check (see above)")
if SHEET: node("sheet", os.path.join(pd, "review.jpg"), "0.6", "10")
if not EST:
    node("cues"); subprocess.run([sys.executable, "tools/mix.py", "."], cwd=tmp, check=True)
    raw = os.path.join(tmp, "raw.mp4"); node("video", raw)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11",
                    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", os.path.join(pd, "reel.mp4")], check=True)
    print("->", os.path.join(pd, "reel.mp4"))
shutil.rmtree(tmp, ignore_errors=True)
