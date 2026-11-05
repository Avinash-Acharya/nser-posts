# Nightly post maker (runbook for Claude)

Every night, make TOMORROW's post (carousel + reel) for Instagram @nser.in_officials,
push it to this repo, and mark it Ready in Notion. GitHub Actions posts it the next day:
carousel at 11:00 IST, reel at 19:00 IST, only once the Notion row is Approved
(or Ready, when the repo variable AUTO_APPROVE=true).

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

### Reel (`reel` + `reel_nodes` in post.json)
- 30–40 s of narration, beats of one short sentence each. Scenes, in order:
  `relate` (2 beats: hook with a number, then "if you…"), `friend` (1 beat),
  `trust` (4–5 beats; each has `node` index into `reel_nodes`; widgets: camera, counter,
  magnifier, clock, bars), `value` (1 beat with 3 `items`), `product` (2 beats: first = "Follow us for more on creator growth and
  monetisation.", card "More on **growth** and **monetisation**."; last = send + save, has `"cta": true`).
- Hook must score ≥ 70 with `python3 tools/hookscore.py --hook "..."`.
- Voice: `"voice": "hf_alpha:0.4+af_heart:0.6"` in post.json (Indian-accent blend: 40% Alpha, 60% Heart).

### Reel style: UI motion (since 5 Nov, Avinash's choice; reference: `posts/2026-11-05/post.json`)
- Engine: `engine/reel3.html` + `engine/render_reel3.py` (60 fps). One shape that never cuts: it morphs size, radius
  and colour from one UI state to the next, and its content swaps with a short blur. A cursor drives the changes
  with real clicks and drags. Warm-gray canvas, black and white, yellow only for highlights, Geist font, springs.
  The last state goes back to the first, so the reel loops.
- Each reel beat gets `ui_head` (the headline at the top, `**word**` = yellow marker) and `ui`: a list of states
  `{kind, at (s after the beat starts), cur: [[dt,x,y]...], press: [dt...]}`. Kinds: `button`, `stat`, `toggle`,
  `phone` (Phone Nib, use it in the friend beat), `feed`, `counter`, `chart` (bars to scale, tooltip on hover),
  `slider` (`drag: [dt0, dt1]`), `tabs` (`sw` switch times), `follow` (`on`), `share` (`taps`),
  `photo` (`src`, `w`, `h`, `bw`, `label`, `eyes: [[x,y,w,h]]` black bars over the eyes, as fractions of the box).
  Cursor x/y are page coords; the shape is centred at (540, 990).
- Keep each state's box under 680 px tall (or 620 for wide cards) so nothing reaches the captions at y 1365.
- Use images or faces where the story has them (a creator, a person on camera). Cover the eyes with `eyes` bars if
  you're unsure. Put them in `posts/<date>/photos/`. No grey placeholder blocks: if there's no real image, use a text UI.
- Getting images: first look in `inbox/<date>/`. If it's empty, try free-licence sites (Unsplash, Pexels, Pixabay,
  Wikimedia Commons) with curl or WebFetch. On 4 Nov the proxy blocked all of them (403). If they're still blocked,
  don't look for a way around it: make the reel without photos, and say in the nightly message "Couldn't download
  images: <site> blocked". From then on Avinash uploads photos to the inbox.

### Captions
- `carousel_caption`: first line ≤ 125 chars and concrete; story; one ask (send + save); then the line
  "Follow @nser.in_officials for more on creator growth and monetisation."; source; 3–5 hashtags.
- `reel_caption`: short, points to the carousel, same single ask, the same follow line, source, hashtags.
- `carousel_alt`: one-line alt text.
- Lint: `python3 tools/caption.py <file> --keywords "..."` must say READY.

## 3. Render
```bash
D=posts/<YYYY-MM-DD>   # tomorrow, IST
python3 engine/make_carousel.py $D                       # -> $D/carousel/01.jpg ...
~/kvenv/bin/python engine/tts.py $D ~/kmodel             # -> $D/reel/narration.wav + timeline.json
python3 engine/render_reel3.py $D --frames 0.03,<one per state> # look at every state first, fix overlaps
python3 engine/render_reel3.py $D                        # -> $D/reel/reel.mp4 (with soft UI clicks)
mv $D/reel/reel.mp4 $D/reel.mp4 && rm -rf $D/reel
```
Write `$D/caption.txt` and `$D/reel-caption.txt` from post.json. Look at every slide and the stills
before pushing: no text overlapping Nib, nothing in the bottom caption zone of the reel.

## 4. Publish for review
- `git add posts/<date> && git commit -m "Post for <date>: <topic>" && git push`
- Notion row: Status = Ready, Post date = tomorrow, Hook, Carousel caption, Reel caption,
  Files = `https://github.com/Avinash-Acharya/nser-posts/tree/main/posts/<date>`.
- Tell Avinash in one short message: tomorrow's topic, the hook, and that it's waiting for Approved.

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
  ("Meet **Name**.", `photo` = channel crop, `photo2` = stats crop); reel beat 0 `photo` = the tight crop; a last trust
  node {"year":"Today","text":"**15.2M** subscribers","photo":"photos/stats.png"} with its own beat.
- Check every fact against the screenshots. If a screenshot conflicts with your source (e.g. joined date), don't show
  the conflicting part. Add "her YouTube channel" to the caption sources.
- No screenshots in the inbox when it's time? Make a growth-topic post instead and move the case study to a later date.
