# nser reel format (learned from @saasflash's "Clawdbot" reel, 8 Nov 2026)

Copy the FORMAT, not their theme. Our theme stays: warm greige set, flat 2D ink drawings, Nib (flat, hand-drawn),
yellow accent, real photos/clips in black and white. Engine: `engine/studio.html` (`"style": "studio"`).

## 1. What the format is
A 55–70 s spoken explainer about ONE trending thing, where **every noun in the voice-over becomes a picture on screen
at the moment it is said** (literal visual puns: "just Claude with hands" → an object grows hands; "hits an error" →
a warning sign; "while you sleep" → a person asleep while the laptop works). One continuous set and camera: scenes
flow by camera moves (push in, pull back, pan along a line, whip pan, object flip), almost never plain cuts.
The screen carries almost no sentences: two-word kinetic phrases, chat bubbles, real UI/screenshots, numbers.

## 2. Script blueprint (≈150 words for 60 s; one short line per beat, 12–18 beats)
1. **Hype hook (0–3 s)**: "Everyone's talking about X…" over a MONTAGE of real posts/headlines with the keyword
   highlighted (`collage`). Proof that it's hot.
2. **Simplify (3–9 s)**: "Simply put, it's just ___." One object that changes to show it (`reveal`: object flips into
   another object + 2 kinetic words).
3. **Confusion beat**: "But Y already exists. So what's the difference?" → giant "?" with Nib reacting (`react`).
4. **The difference in one line** (`word` / `reveal`).
5. **"You" story (the longest part, 10–15 s)**: put the viewer in a concrete moment ("You're at a wedding. A brand
   DMs you…"), told as a CHAIN of quick actions, each with its picture: phone chat (`phone`), screen (`monitor`),
   error/warning, result. Recurring locations (the phone in hand, the desk monitor) come back later as callbacks.
6. **"Now the biggest game changer…"**: one feature + one concrete example (`flow`: dashed line from node to node,
   e.g. idea → message → finished document).
7. **"But the craziest part…"**: a real anecdote as a dialogue between Nib and a viewer avatar (`chat`), with a twist
   line ("no… but I can do this") and a reaction ("wait… what").
8. **Why it matters**: before vs now, with real evidence (screenshots / B&W footage in `collage` or `photo`) and one
   number (`stat`).
9. **Joke/fear beat**: a light, self-aware joke ("not gonna take my job… right?").
10. **Punchline ending (2–3 words)** that returns to an earlier location so the reel LOOPS ("…while you sleep.").
11. Then our close: `cta` (Follow + Send). Keep it under 3 s.
Escalation phrases to use: "Simply put…", "So what's the difference?", "Now the biggest game changer…",
"But the craziest part…", "The reason this matters…". Tone: casual, confident, a bit cheeky. No lecture voice.

## 3. Visual rules
- Each beat: decide the PICTURE first (what noun is being said), then the scene. If you can't name the picture, rewrite the line.
- Scene changes every 2–4 s, but motion never stops (slow push on every scene, whip pans between).
- Max 3–4 words on screen per scene; keyword highlighted in yellow. Numbers beat words.
- Real material = evidence: posts, headlines, UI screenshots, B&W photos/clips (`media` queries or Avinash's
  screenshots). Never real people's faces from the web; describe scenes ("hands holding phone", "crowd at a party").
- Nib acts: reacts, turns, holds props, talks in bubbles. The viewer is a plain grey avatar.
- Props (flat 2D): gift, coins, cash, wallet, chart, heart, tick, cross, megaphone, tag, clock. Add more to `PROP` when
  a noun needs one.

## 3b. Motion (the part that makes it not a slideshow)
Nothing is ever still: the camera always pushes and drifts, Nib bobs, blinks, waves and lands with squash, props
float, words fly in one by one and scatter out. Cuts rotate whip / zoom / rise with motion blur (`"cut"` to force one).
Give scenes things that HAPPEN on screen: `monitor` `lines` (an app window types itself) + `alert` (warning pops and
shakes), phone typing dots, `collage` 3 snap close-ups + keyword highlight sweep + `media` photo popping in,
`reveal` wiggle → flip → sunburst, `stat` count-up → burst. Every beat should have at least 2 moving things.

## 4. Scenes (engine/studio.html) and when to use them
| Story moment | Scene | Key fields |
|---|---|---|
| Hype hook, evidence | `collage` | `cards`: [{name, handle, text, kw}] (invented generic accounts) or `media` |
| "Simply put, it's just…" | `reveal` | `a`, `b`: {k: prop} / {nib: true} / {g: "₹"}; `words`: {small, big}; `flipAt` |
| Confusion | `react` | `glyph`: "?" or "!" |
| Chat / DM moment | `phone` | `contact`, `msgs` [{from: me/them, text, time}], `media` (blurred B&W behind) |
| On a computer / app | `monitor` | `media`, `text` (a number), `nib` |
| Feature chain | `flow` | `nodes`: [{k, label} / {text} / {doc: [lines], label}] |
| Anecdote dialogue | `chat` | `lines` [{who: nib/user, text ≤3 words}], `nib` |
| A number | `stat` | `pre`, `value`, `suf`, `unit`, `media` |
| Big words | `word` | `small`, `big`, `glyph` |
| Real photo moment | `photo` | `media`, `card`, `nib` |
| Method | `icons` | `items` [{g, w}] |
| Close | `cta` | `text` |
Any beat can add `props: [{k, x, y, s, r, at}]` (keep them clear of text, y 450–1450).

## 5. Hindi voice (decided 10 Nov)
Each beat has `"hi"` (spoken, casual Hindi like real creators talk, English nouns kept: क्रिएटर, ब्रांड, रील;
numbers as words; no ।) and `"say"` (English meaning). Screen text stays English. `"captions": false`.

## 6. Before pushing
- Read the script top to bottom: does every line have its picture? Is there a "you" story, a twist, a loop ending?
- Render stills of every beat; nothing overlaps, no beat is an empty background.
- Facts sourced in `sources` and the caption; invented posts in `collage` must be generic, never a real account.
