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

## Making the Instagram token (redo every ~3 months, the robot warns 2 weeks before)
1. Graph API Explorer → app "nser poster" → **User Token** → permissions `instagram_basic, instagram_content_publish, pages_show_list, pages_read_engagement, business_management` → Generate Access Token.
2. Paste that USER token into Access Token Debugger → Debug → **Extend Access Token** → copy the new token.
3. Back in Explorer, paste the extended token, run `me/accounts` → copy the page's `access_token` → debugger should say Expires **Never**.
4. GitHub → Settings → Secrets → Actions → update `IG_TOKEN`.
