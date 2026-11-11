# Nightly post maker (runbook for Claude)

## SINCE 11 NOV 2026 (overrides everything below): TWO PAPER REELS A DAY, NO APPROVAL
Avinash wiped the Instagram grid and restarted. Every day = two Hindi-voiced reels in the PAPER style
(Paper Atlas cut-paper art, set in present-day India). No carousel, no other format. Times (India):
- **~6 PM (day before)**: the evening Claude run (you) writes BOTH reels for tomorrow and pushes them.
- **~7-8 PM**: Avinash runs `daily.bat` on his PC: VoxCPM makes the Hindi voice for every new reel and pushes it.
  GitHub (`render.yml`) renders each reel with `engine/paper/render.py` (~3 min each) and commits `reel.mp4`.
- **9 PM**: Avinash watches them in the repo (he may ask for changes). No Notion approval needed.
- **11:00 AM** posts `<date>-11am`, **7:00 PM** posts `<date>-7pm` (`post.yml` + backup dispatch tasks).

### Folders (one per reel)
`posts/<tomorrow>-11am/` and `posts/<tomorrow>-7pm/`, each with:
- `post.json`: `"style": "paper"`, `"topic"`, `"captions": false`, `"music": "bed"`, `"sources"`, and `"explainer"`:
  10-14 beats, each `{"hi": spoken Hindi (Devanagari, casual creator Hindi, English nouns kept: क्रिएटर, ब्रांड, रील;
  numbers as words; no danda), "say": the English meaning}`. Aim for 40-55 s total (~800-1000 Hindi characters).
  Shape (docs/REEL_FORMAT.md): hook question → "simply put" → surprise/number → a "you" story → the game changer →
  the craziest part → what to do (2-3 steps) → a punchy loop line → follow + send.
- `shots.js`: the shot list for THIS reel. Start from `engine/paper/src/shots.js` (the sample) and rewrite every
  shot for the new story. One shot per beat (two for beats over ~4 s), placed with `cs(i)` / `len(i)`; key moments at
  fractions of the beat (Hindi word order differs, so don't use word timing). Use the kit:
  `engine/paper/src/core/kit.js` (cut paper, parchment, ribbon, slip, seal, timeline, dashedRoute, compass, label)
  and `engine/paper/src/core/modern.js` (person, phoneBig, bubble, laptop, postCard, skyline, room, dayPage,
  nightPage, gift, note, coins, wallet, ringLight, magnifier, bigMark, indiaMap + geo/CITY). Add new paper props to
  modern.js when a noun needs one (keep the look: `cut()` with edge + soft shadow, palette P / M only).
  Rules: every spoken noun gets its picture; the camera always moves (zoom per shot); 1-3 words on screen per shot
  on slips/ribbons, numbers over words; crimson = the key thing, gold = numbers/dates; faceless people only,
  NEVER a real person's likeness, logo or photo (a case study about a real creator = a generic paper figure + facts
  on slips); nothing above y 1700 overlaps; keep text inside x 60-1020.
- `reel-caption.txt` (English): hook line that survives the "... more" cut, 2-4 short paragraphs, one ask (send/save),
  "Follow @nser.in_officials for more on creator growth and monetisation.", Source line(s), 3-4 hashtags.
  `python3 tools/caption.py posts/<folder>/reel-caption.txt` must say READY.

### Steps
1. Topic: take the next 2 unused topics from `docs/TOPICS.md` (top to bottom), mark them used with tomorrow's
   date + slot. When the list runs out, add new topics there first (educational, creator growth/monetisation,
   at least half India-focused; avoid repeating a covered angle within 30 days).
2. Research each topic: every fact from a source you actually opened; no invented numbers, quotes or people.
3. Write the two folders. QA each one: `CHROME=<chrome> python3 engine/paper/render.py posts/<folder> --estimate`
   must print CHECK OK and writes `review.jpg`: READ the contact sheet and fix anything empty, overlapping,
   off-screen or not matching its line. (Delete review.jpg before committing.)
4. Notion "Content Queue" (collection://4685a8c5-7254-45d2-bf71-90cb4807adbc): one row per reel. Title
   "<topic> (11am)" / "<topic> (7pm)" (the slot MUST be in the title; post_ig.py matches on it), Post date =
   tomorrow, Status = Ready, Format = Reel, reel caption, hook, Files = the folder link. These rows stop double posts.
5. `git fetch origin main && git rebase origin/main`, commit both folders, push.
6. One short SendUserMessage to Avinash: the two topics + hooks, "run daily.bat on your PC now (it voices both)",
   "reels will be in the folders ~10 min later; they post at 11 AM and 7 PM". If anything failed, say exactly what.

## OLDER NOTES (before 11 Nov; only for history)
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

## ALWAYS: follow docs/REEL_FORMAT.md for the reel (the saasflash-style format: hype hook montage, "simply put" reveal,
## "you" story, game changer, craziest part, loop ending; every spoken noun gets its picture). Read it before writing.

## Since 10 Nov 2026 (evening): STUDIO reel style (Avinash's choice, modelled on @saasflash, in nser colours)
Set `"style": "studio"` and `"captions": false` in post.json. Engine: `engine/studio.html` (render_explainer.py picks it).
Reference: `samples/studio-freebies/post.json`. Look: warm greige set, BLACK-AND-WHITE real photos/clips with a
yellow colour-pop (3D clay Nib, highlights), floating cards, phone + monitor mockups, whip-pan cuts, film grain.
- The voice is Hindi, so the SCREEN carries very few words: max 3–4 words per scene, prefer NUMBERS (₹, %, counts),
  icons and pictures. Never put the spoken sentence on screen. Labels/words stay English.
- About half the beats get real footage: `"media": {"q": "<plain scene description>", "kind": "video"|"photo"}`.
  GitHub fetches it (Pexels, else public-domain Openverse) before rendering. Queries describe scenes, objects,
  hands, places ("hand holding smartphone", "crowded market street"): NEVER a named or famous person.
  Avinash can drop his own file as posts/<date>/media/<beat number>.jpg|.mp4 to override.
- Scenes: see docs/REEL_FORMAT.md §4 (also `collage`, `reveal`, `react`, `flow`). Older list: `phone` (`contact`, `msgs`: [{from: me|them, text ≤3 words, time}], media blurred behind) ·
  `stat` (`pre`, `value`, `suf`, `unit` ≤5 words: a big rolling number on a card) · `word` (`small`, `big`, `bigSize`,
  or `glyph`: "?") · `chat` (`lines`: [{who: nib|user, text ≤2 words}], `nib`) · `monitor` (media on a desk screen,
  `text` = a number like "**83%**", `nib`) · `card` (`title` ≤3 words, `note` ≤2 words, `lines` usually empty) ·
  `photo` (full-bleed media, `card` ≤3 words, `nib`) · `post` (an invented social post: `name`, `handle`, `text`,
  `likes`) · `icons` (`items`: [{g: one symbol, w: one word}] for the method) · `cta` (Follow + `text`, e.g. "**Send** ➜").
  `nib`: {x, y, size, pose, mood} adds the 3D Nib. `**word**` = yellow.
- New scene needed? Add it to `SC` in engine/studio.html with the same pattern; keep subjects between y 450 and 1450.
- Everything else (Hindi `hi` lines, voice from Avinash's PC, render on GitHub, 7pm posting) stays as above.

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
