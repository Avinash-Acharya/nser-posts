"""Make narration with Google Cloud Text-to-Speech (Chirp 3 HD voices). Runs on GitHub Actions,
which can reach Google; the key stays in the GOOGLE_TTS_KEY secret.

Usage:
  python poster/voice_google.py post <YYYY-MM-DD>     # one WAV per reel line -> posts/<date>/voice/
  python poster/voice_google.py samples               # a few voices reading one line -> samples/voices/

post.json fields used: "explainer" (or "reel") beats with "say"; "tts": {"lang": "hi-IN"|"en-IN",
"voice": "Kore", "rate": 1.0}. tts.py then uses these WAVs instead of Kokoro.
"""
import base64, hashlib, json, os, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://texttospeech.googleapis.com/v1/text:synthesize?key="


def synth(text, lang, voice, rate=1.0):
    body = {"input": {"text": text},
            "voice": {"languageCode": lang, "name": f"{lang}-Chirp3-HD-{voice}"},
            "audioConfig": {"audioEncoding": "LINEAR16", "sampleRateHertz": 24000}}
    if rate and rate != 1.0: body["audioConfig"]["speakingRate"] = rate
    for attempt in (1, 2):
        req = urllib.request.Request(URL + os.environ["GOOGLE_TTS_KEY"], data=json.dumps(body).encode(),
                                     headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return base64.b64decode(json.loads(r.read())["audioContent"])
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:400]
            if attempt == 1 and "speakingRate" in msg: body["audioConfig"].pop("speakingRate", None); continue
            sys.exit(f"Google TTS error {e.code}: {msg}")


def key(text, lang, voice, rate):
    return hashlib.sha1(f"{lang}|{voice}|{rate}|{text}".encode()).hexdigest()[:12]


def do_post(day, fname="post.json"):
    pd = os.path.join(ROOT, day) if "/" in day else os.path.join(ROOT, "posts", day)   # a date, or a folder like samples/x
    post = json.load(open(os.path.join(pd, fname), encoding="utf-8"))
    cfg = post.get("tts", {}); lang, voice, rate = cfg.get("lang", "en-IN"), cfg.get("voice", "Kore"), cfg.get("rate", 1.0)
    beats = post.get("explainer") or post.get("reel") or []
    out = os.path.join(pd, "voice" if fname == "post.json" else "voice-" + fname[5:-5]); os.makedirs(out, exist_ok=True)
    manifest = []
    for i, b in enumerate(beats):
        text = b.get("speak") or b["say"]; k = key(text, lang, voice, rate); fn = f"{i:02d}-{k}.wav"
        if not os.path.exists(os.path.join(out, fn)):
            open(os.path.join(out, fn), "wb").write(synth(text, lang, voice, rate)); print("  voiced", i, text[:60])
        manifest.append({"i": i, "file": fn, "key": k})
    for f in os.listdir(out):   # drop stale lines
        if f.endswith(".wav") and f not in {m["file"] for m in manifest}: os.remove(os.path.join(out, f))
    json.dump({"lang": lang, "voice": voice, "rate": rate, "lines": manifest}, open(os.path.join(out, "manifest.json"), "w"), indent=1)
    print(f"{len(manifest)} lines -> {out}")


def do_samples():
    out = os.path.join(ROOT, "samples", "voices"); os.makedirs(out, exist_ok=True)
    lines = {"hi-IN": "ज़्यादातर क्रिएटर्स कुछ महीनों में हार मान लेते हैं। मिस्टर बीस्ट ने अपने पहले हिट से पहले पाँच साल तक वीडियो बनाए। तो उन्होंने अलग क्या किया?",
             "en-IN": "Most creators quit after a few months of posting to nobody. MrBeast posted for five years before his first hit. So what did he do differently?"}
    voices = ["Kore", "Aoede", "Leda", "Zephyr", "Charon", "Puck", "Fenrir", "Orus"]
    for lang, text in lines.items():
        for v in voices:
            wav = os.path.join(out, f"{lang}-{v}.wav"); open(wav, "wb").write(synth(text, lang, v))
            mp3 = wav[:-4] + ".mp3"
            if subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-b:a", "128k", mp3]).returncode == 0: os.remove(wav)
            print("  sample", lang, v)


if __name__ == "__main__":
    if not os.environ.get("GOOGLE_TTS_KEY"): sys.exit("missing secret GOOGLE_TTS_KEY")
    if sys.argv[1] == "post": do_post(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "post.json")
    else: do_samples()
