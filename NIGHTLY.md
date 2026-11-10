# Nightly post maker (runbook for Claude)

## Since 10 Nov 2026: ONE Hindi reel a day, no carousel
Every night, write TOMORROW's reel SCRIPT only (post.json + reel-caption.txt) and push it. Do NOT render and do NOT
make a carousel. The day after:
1. Avinash runs `daily.bat` on his PC: it makes the Hindi voice (VoxCPM2, locked storyteller voice, needs his GPU)
   for every beat and pushes posts/<date>/voice/ (wav files + manifest.json).
2. That push starts `.github/workflows/render.yml`, which renders reel.mp4 on GitHub.
3. GitHub Actions posts the reel at 19:00 IST, only once the Notion row is Approved
   (or Ready, when the repo variable AUTO_APPROVE=true).
Rules for the Hindi reel (Avinash, 10 Nov):
- Each explainer beat gets `"hi"`: the Hindi line that is SPOKEN. Devanagari, numbers written as words
  ("पचास हज़ार", not "50,000"), NO danda (।), no line breaks, one short sentence. `"say"` stays the English meaning.
- Everything written stays ENGLISH: labels, scenes, Instagram caption.
- No subtitles in the video: set `"captions": false` in post.json.
- Don't set "voice" or "speed"; the voice comes from Avinash's PC.
- The sections below about the carousel, Kokoro and rendering are kept for reference only; skip them.

Reference post (copy its structure and quality): `posts/2026-11-03/post.json`.
Brand rules live in the claude.ai project doc "claude/Marketing KB". Read it first.

## 0. Setup (fresh machine)
```bash
cd <repo>
python3.12 -m venv ~/kvenv && ~/kvenv/bin/pip install -q kokoro-onnx soundfile
mkdir -p ~/kmodel && cd ~/kmodel
curl -sSLO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -sSLO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
```
pip install -q --break-system-packages soundfile scipy   # for the reel's sound mix
Playwright + Chromium + ffmpeg are pre-installed in Claude's cloud workspace.

## 1. Pick the topic
- Notion database "Content Queue" (Startup → NSER), data source `collection://4685a8c5-7254-45d2-bf71-90cb4807adbc`.
- If a row already has Post date = tomorrow (IST) and status Ready/Approved/Posted: stop, nothing to do.
- Otherwise take the oldest row with Status = Idea. If none: pick a growth topic for Indian creators
  yourself (not festivals), add it as a row with Source = Trend.
- Mix: at least half the posts India-focused (Indian creators, regional languages, small cities,
  Indian brands). Case studies of real creators work best.

## 2. Research and write
- Every fact needs a source you actually opened (Wikipedia page, interview, official site). Put the
  source in the caption ("Source: ..."). No invented numbers, quotes, people or testimonials.
  Images and faces are OK (Avinash, 5 Nov): cover the eyes if unsure. No video thumbnails or video frames.
- Follow the 5 sales steps in BOTH carousel and reel, in order:
  1) Relate (their situation, in their shoes)  2) Be a friend ("we've been there")
  3) Build trust (sourced facts, story)  4) Sell the value (the method they can use)
  5) Then the product (pre-launch: FOLLOW @nser.in_officials for more on creator growth and monetisation).
  Never promise a posting schedule ("every day", "daily") anywhere.
- English only. Plain, warm, short sentences. Simple words.

### Carousel (`carousel` in post.json)
- 8 to 10 slides, every slide a DIFFERENT layout kind. Kinds available in engine/carousel.html:
  `thumb` (slide 1 only: like a YouTube thumbnail, one idea, big Nib. It must carry the RELATE step and be
  instantly clear: `title` = the viewer's own problem as a short question, ≤10 characters, e.g. "No views?";
  `title2` = the story's answer, ≤32 characters, e.g. "MrBeast had **5 years** of it."),
  `statement`, `timeline`, `bignum`, `quote`, `split`, `chart` (bars drawn to scale),
  `checklist`, `ask`, `share` (last slide: send + save CTA + `product` line).
- `**word**` = yellow marker highlight. No slide numbers, no progress bars. Mascot is Phone Nib (default).
- Last slide is always `share`: ask people to SEND it to a friend and SAVE it, with
  `product` = "Follow for more on creator growth & monetisation".

### Reel: illustrated EXPLAINER (since 6 Nov, Avinash's choice; reference: `samples/explainer-mrbeast/post.json`)
Like the big Indian explainer pages: every spoken line gets its own drawn scene that SHOWS the idea (a visual metaphor),
not words on screen. Engine: `engine/explainer.html` + `engine/render_explainer.py` (narration + timed sound effects +
a soft music bed under the voice, -14 LUFS). Replaces the UI-motion (reel3) and reel2 styles for new posts.
- 60–90 s, 12–16 beats, ONE short sentence each, written in `"explainer": [...]` in post.json. English only.
- Story = hook → build-up → payoff. Hook formula (Martin Wang's "story question"), the first 3–4 beats:
  1) RELATE + CONTRAST: what most people do or believe ("Most creators quit after a few months of posting to nobody.")
  2) CONDENSED PROOF: the story's real number vs that ("MrBeast posted for five years before his first real hit.")
  3) EXCLUSIVE PROMISE: "Here's the one thing he did differently." (the case study's method, never "what I do")
  4) OPEN LOOP: a question the post answers at the end ("Would you have lasted five years?")
  Every number must be real and sourced: no invented timeframes or exaggerations. The payoff beat must answer the
  open loop. Then the method (a `steps` beat), then `follow`, then `send` as the last two beats.
- Keep the 5 sales steps inside this: relate (hook), be a friend (a "we've been there" line is fine), trust (the
  sourced story), value (the method), product (follow).
- Each beat: `{"scene": ..., "label": "2–3 words, **word** = yellow marker", "say": "...", "pause": 0.3 (optional
  silence after the line, use on the turn and the punchline)}` + the scene's own fields. Scenes available:
  `walkaway` (row of creators, most walk off, one stays: `stay` index) · `calendar` (`from`, `to` years flip, an
  upload arrow per year) · `counter` (`value`, `unit`: a number rolls up over a rising line) · `question` (Nib thinking
  + big "?": the open loop) · `desk` (a kid at a laptop, `views` tiny counter) · `jar` (`fill` 0–1: a jar that barely
  fills, "not life-changing") · `door` (exit door + footprints: people stopping) · `magnify` (magnifier circling the
  winners in a grid of invented thumbnails: studying) · `notebook` (`notes`: study notes around a thumbnail) · `clock`
  (`hours`, `value`: time spent + a count) · `rocket` (flat line that shoots up + confetti: breakthrough) · `split`
  (`left`, `right`: wrong way vs right way) · `steps` (`items`: 3 numbered cards, the method) · `follow` (Nib presses
  Follow) · `send` (paper plane to a sad creator who cheers up) · `photo` (`src`, `w`, `top`: a real screenshot from
  posts/<date>/photos/, see the screenshot rules below).
- If a line needs a picture no scene has, ADD a scene to `SC` in engine/explainer.html (same pattern: `draw(b, lt)`
  returns `{svg, html}` drawn in Nib's ink style, pure function of time; `ev(b)` returns sound cues
  `[[t, 'pop'|'whoosh'|'click'|'tick'|'ding'|'step'|'thump'|'clink'|'scribble'|'whoosh_up'|'creak', gain]]`).
  Keep every subject between y 560 and y 1400 (label above, captions at y 1470). Check its stills before rendering.
- Never draw real logos (YouTube, Instagram) or real people; invented thumbnails and generic people only.
- Voice: `"voice": "hf_alpha:0.4+af_heart:0.6"` in post.json (Kokoro, Indian-accent blend). Music bed stays on.
  Don't set `"speed"` in post.json: tts.py's default (1.22x, tight pauses) is Avinash's pace for short attention spans.

### Captions
- `carousel_caption`: first line ≤ 125 chars and concrete; story; one ask (send + save); then the line
  "Follow @nser.in_officials for more on creator growth and monetisation."; source; 3–5 hashtags.
- `reel_caption` (English, the only caption now): short, NO mention of a carousel, same single ask, the same follow line, source, hashtags.
- `carousel_alt`: one-line alt text.
- Lint: `python3 tools/caption.py <file> --keywords "..."` must say READY.

## 3. Render (OLD, skip since 10 Nov: GitHub renders after Avinash pushes the voice)
```bash
D=posts/<YYYY-MM-DD>   # tomorrow, IST
python3 engine/make_carousel.py $D                       # -> $D/carousel/01.jpg ...
~/kvenv/bin/python engine/tts.py $D ~/kmodel             # -> $D/reel/narration.wav + timeline.json
python3 engine/render_explainer.py $D --frames <one time per beat, ~75% into it>   # look at EVERY scene first
python3 engine/render_explainer.py $D                    # -> $D/reel/reel.mp4 (~4 min for 70 s)
mv $D/reel/reel.mp4 $D/reel.mp4 && rm -rf $D/reel
```
Write `$D/caption.txt` and `$D/reel-caption.txt` from post.json. Look at every slide and the stills
before pushing: no text overlapping Nib, nothing in the bottom caption zone of the reel.

## 4. Publish for review
- Push only `posts/<date>/post.json` and `posts/<date>/reel-caption.txt`:
  `git add posts/<date> && git commit -m "Script for <date>: <topic>" && git push`
- Notion row: Status = Ready, Post date = tomorrow, Hook, Reel caption,
  Files = `https://github.com/Avinash-Acharya/nser-posts/tree/main/posts/<date>`.
- Tell Avinash in one short message: tomorrow's topic, the hook, to run daily.bat on his PC tomorrow,
  and to set the Notion row to Approved once the reel appears in the folder.

## Real screenshots in case studies (added 3 Nov)
Pure motion graphics feel detached; case studies need real proof of who the creator is.
- Faces are OK now (Avinash, 5 Nov; cover the eyes if unsure). Never use video thumbnails or video frames. Screenshots of a creator's public
  channel/profile page are OK; crop out the banner and any video thumbnails.
- Screenshots come from Avinash, so plan case studies ONE DAY AHEAD. Each night, if the day after tomorrow should be a
  case study, add that row to Notion (Post date = day after tomorrow, Status = Idea) with Notes listing the exact links
  to screenshot: the YouTube channel page (top part: name, @handle, subscribers) and its "...more" panel (joined date,
  subscribers, videos, views). In the nightly message, ask him to drag-and-drop them at
  https://github.com/Avinash-Acharya/nser-posts/upload/main/inbox/<that date>
- When making a post, look in inbox/<date>/. Crop with PIL into posts/<date>/photos/ (pad each crop ~26px in its own
  background colour), then `git rm -r inbox/<date>`. Look at every crop: no face anywhere.
- Where they go (engine already supports it, see posts/2026-11-04/post.json):
  cover `photo` = tight crop of name + handle + subscribers; a `proof` slide right after the relate statement
  ("Meet **Name**.", `photo` = channel crop, `photo2` = stats crop); in the explainer reel, a `photo` beat right
  after the hook with the tight crop (`"scene":"photo","src":"photos/channel-name.png"`), and a `photo` beat with the
  stats crop where the story reaches "today".
- Check every fact against the screenshots. If a screenshot conflicts with your source (e.g. joined date), don't show
  the conflicting part. Add "her YouTube channel" to the caption sources.
- No screenshots in the inbox when it's time? Make a growth-topic post instead and move the case study to a later date.
