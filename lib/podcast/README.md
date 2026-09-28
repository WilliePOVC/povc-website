# First Press podcast hub (`/podcast`)

Episodes come from the **First Press** YouTube channel automatically. Publishing a public video is the only step.

## How updates reach the site
presson.vc is a static export on GitHub Pages, so episodes are pulled at **build time**:
- Every hour, the deploy workflow checks the channel feed and rebuilds only if something changed. New episodes are live within about an hour.
- To go live right away: GitHub → Actions → **Deploy to GitHub Pages** → **Run workflow**.
- Source: YouTube Data API if the `YOUTUBE_API_KEY` secret is set (gives durations and Premieres). Otherwise it uses the public RSS feed of long-form uploads (latest 15, Shorts excluded, no durations).

## Upload convention (for whoever posts episodes)
**Title:** `<Episode title> | First Press Ep. 03`. `Ep. 3 | <title> | First Press` also works. The show name and episode number are stripped from the title on the site.

**Description:**
```
One or two paragraphs of summary. These become the episode summary on the site.

Guest: Jane Doe — Co-founder & CEO, Acme
Topic: Founders            (one of: Founders | Operators | Investors | Thesis)
Portfolio: jacob-bar       (slug from presson.vc/portfolio/<slug>)

00:00 Cold open
02:14 Why protein bars
11:40 The near-death moment
```
- The summary is the first two paragraphs before any `Guest:`, `Topic:`, `Portfolio:` or timestamp line. URLs are removed.
- Timestamps become clickable chapters. It takes at least two, and YouTube uses the same lines for its own chapters.
- Topic chips appear on the hub once at least two different topics exist.

## Fixing metadata without touching YouTube
Edit `overrides.ts`, which is keyed by videoId. Ep. 01 and 02 use it today because their descriptions predate this convention.

## Tests
`npm run test:podcast` (requires Node ≥ 22.18).
