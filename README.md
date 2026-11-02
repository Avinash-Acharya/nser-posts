# nser-posts

Daily Instagram posts for **@nser.in_officials**.

- `posts/YYYY-MM-DD/` — one day's post: `carousel/*.jpg` + `caption.txt` (11:00 IST), `reel.mp4` + `reel-caption.txt` (19:00 IST).
- `.github/workflows/post.yml` — publishes through Instagram's official API, only when the Notion "Content Queue" row for that date is **Approved**.
- `engine/` — renders the carousel slides and the motion-graphics reel (Phone Nib mascot, Kokoro voice).
- `tools/` — hook, timing and caption checkers (from instagram-agent-skill, MIT).
- `NIGHTLY.md` — how the nightly post is made.

**Test the setup:** Actions → *Post to Instagram* → *Run workflow* → kind = `check`. It posts nothing.
**Turn on full auto (after 2 weeks):** Settings → Secrets and variables → Actions → Variables → `AUTO_APPROVE` = `true`.

Secrets (Settings → Secrets and variables → Actions): `IG_USER_ID`, `IG_TOKEN`, `NOTION_TOKEN`, `NOTION_DB`.
