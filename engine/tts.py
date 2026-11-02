"""Narrate each reel beat with Kokoro (kokoro-onnx, runs on CPU, no internet needed once model is present).
Usage: <python with kokoro-onnx> tts.py <post_dir> <model_dir>
model_dir holds kokoro-v1.0.onnx and voices-v1.0.bin
Writes <post_dir>/reel/narration.wav and timeline.json (start/dur per beat).
"""
import json, os, re, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

post_dir, model_dir = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
post = json.load(open(os.path.join(post_dir, "post.json"), encoding="utf-8"))
out = os.path.join(post_dir, "reel"); os.makedirs(out, exist_ok=True)

GAP, LEAD, TAIL = 0.22, 0.15, 0.6
k = Kokoro(os.path.join(model_dir, "kokoro-v1.0.onnx"), os.path.join(model_dir, "voices-v1.0.bin"))
voice = post.get("voice", "af_heart")
lang = "en-gb" if voice.startswith("b") else "en-us"
speed = float(post.get("speed", 1.08))

chunks, beats, t, SR = [], [], 0.0, 24000
for b in post["reel"]:
    say = b["say"].replace("%", " percent").replace("₹", "rupees ")
    a, SR = k.create(say, voice=voice, speed=speed, lang=lang)
    a = np.asarray(a, dtype=np.float32)
    if not chunks:
        chunks.append(np.zeros(int(LEAD * SR), dtype=np.float32)); t = LEAD
    hl = [i for i, w in enumerate(b.get("card", "").split()) if re.search(r"\d", w)]
    beats.append({**b, "start": 0.0 if not beats else round(t, 3), "dur": 0, "hl": hl})
    chunks += [a, np.zeros(int(GAP * SR), dtype=np.float32)]
    t += len(a) / SR + GAP
chunks.append(np.zeros(int(TAIL * SR), dtype=np.float32))
total = t + TAIL
for i, b in enumerate(beats):  # each beat lasts until the next one starts
    b["dur"] = round((beats[i + 1]["start"] if i + 1 < len(beats) else total) - b["start"], 3)
sf.write(os.path.join(out, "narration.wav"), np.concatenate(chunks), SR)
json.dump({"beats": beats, "total": round(total, 3)}, open(os.path.join(out, "timeline.json"), "w"), indent=1)
print(f"narration {total:.1f}s, {len(beats)} beats")
