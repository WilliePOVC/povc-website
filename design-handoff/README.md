# Handoff: Press On Ventures — Website Redesign ("Nightfall")

## Overview
This is a complete redesign of the Press On Ventures website (current live site: www.presson.vc).
Press On Ventures is an early-stage consumer venture firm. The site's primary audience is
**Limited Partners (LPs) / investors**, with founders secondary. The design direction is
**"Nightfall"**: premium, quiet-luxury, predominantly dark (ink) with a warm beige accent and a
light editorial body, high-craft scroll motion, and the brand "power" mark used as a tasteful accent.

The site is a **multi-page** experience:

| Page | File | Purpose |
|------|------|---------|
| Home | `home.html` | Hero → Mission → Market View (thesis) → Contact CTA |
| Portfolio | `portfolio.html` | Filterable grid of all 12 companies |
| Company detail | `company.html?c=<slug>` | One data-driven template per portfolio company |
| Team | `team.html` | GPs, full team, venture-partner network |
| Press | `press.html` | "Featured in" band + filterable coverage list |
| Blog | `blog.html` | Featured latest post + filterable post grid |

> **IMPORTANT — content source for two pages.** The Press and Blog pages in this bundle are
> populated from **hardcoded JavaScript arrays** purely so the prototype renders. In production
> they must be **dynamically sourced** — see **[§ Dynamic Data Integrations](#dynamic-data-integrations)**.
> This is the single most important implementation note in this document.

---

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/vanilla JS** — prototypes that
show the intended look, layout, copy, and interaction behavior. **They are not production code to ship
directly.**

Your task is to **recreate these designs in Press On's target codebase** using its established
framework and patterns (React/Next.js, Vue/Nuxt, Astro, etc.). If no codebase exists yet, choose the
most appropriate modern framework. Given the two dynamic-data requirements below, a **React-based
framework with server-side data fetching / ISR (e.g. Next.js or Astro)** is a strong fit.

The HTML uses a few prototype-only conventions you should replace with idiomatic framework code:
- Content is injected by string-concatenation into `innerHTML` from arrays in `styles/*-data.js`.
  → Replace with real components + props, and real data sources.
- Scroll reveals use a hand-rolled `IntersectionObserver`-style checker (`POVC_initReveal`).
  → Replace with your preferred animation lib (Framer Motion, etc.) or keep a small IO hook.
- The shared nav/footer is rendered by `NF_renderChrome()` in `styles/nightfall.js`.
  → Replace with a real layout component wrapping all pages.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all
intended as shown. Recreate pixel-faithfully using the design tokens in
**[§ Design Tokens](#design-tokens)**. All tokens already exist as CSS custom properties in
`styles/tokens.css` — reuse that file (or port it into your styling system) rather than re-deriving values.

---

## Dynamic Data Integrations
**These two are explicit client requirements and the main reason to choose a framework with
server-side data fetching.**

### 1. Press page → Notion ("Connect" table)
- The Press page must pull its coverage items from the firm's **Notion database** (the **"Connect"
  table**), **not** from a static list.
- Build this with the **same architecture the agent used for the Fund One Investor Presentation**,
  which already reads from this Notion table. Reuse that integration (Notion API client, auth token
  handling, the table's schema mapping, caching strategy) so Press and the investor deck stay in sync
  from one source of truth.
- **Action for the developer:** locate the Fund One Investor Presentation repo/codebase and lift its
  Notion-fetch layer. Map the Connect table's properties to the fields the Press page renders (see the
  shape in `styles/nightfall-data.js` → `POVC_PRESS_ITEMS`): `pub` (publication), `date`, `title`
  (headline), `company` (portfolio company the coverage is about), `url` (article link). The page also
  derives its company filter buttons and the "Featured in" publication band from this same data, so
  those become automatic once the feed is wired.
- Recommended: fetch at build time with periodic revalidation (ISR / scheduled rebuild) so new Notion
  rows appear without a manual deploy. Keep the current sort (newest first) and the per-company filter.

### 2. Blog page → Medium (auto-sync)
- The Blog page must **automatically pull posts from the firm's Medium publication** whenever something
  new is published — no manual data entry.
- Medium exposes a per-user RSS feed at **`https://medium.com/feed/@pressonvc`** (the account is
  `https://medium.com/@pressonvc`). Fetch and parse this server-side (RSS/Atom XML → JSON). Each item
  yields: title, author (`dc:creator`), publish date (`pubDate`), link (`url`), and an HTML
  `content:encoded` body you can use to derive an **excerpt** and the **hero/thumbnail image** (first
  `<img>` in the content, or the `<figure>`).
- Map each post to the shape in `styles/nightfall-data.js` → `POVC_BLOG`: `title`, `author`, `date`,
  `cat` (category), `url`, `excerpt`, plus optional `img` (Medium cover image) and `logo` (portfolio
  company logo, used for "Why We're Backing…" posts).
- **Categories:** the current site organizes posts as **Portfolio · Trends & Analysis · Best Practices ·
  Tools** (see `POVC_BLOG_CATS`). Medium tags don't map cleanly to these, so provide a mapping step —
  either (a) match on Medium tags/keywords, (b) keep a small server-side override map keyed by post slug,
  or (c) default to "Trends & Analysis" and let an editor reclassify. Posts whose title starts with
  "Why We're Backing" or "Introducing" should be category **Portfolio** and show the relevant company
  **logo** tile instead of the Medium image (the prototype already does this — see the featured-post
  logic in `blog.html`).
- Recommended: fetch at build with revalidation (e.g. hourly) so new Medium posts appear automatically.
  The newest post becomes the **featured** card; the rest fill the grid; category filter buttons are
  derived from the data.

> For both integrations, keep secrets (Notion token) server-side only. Never expose them to the client.

---

## Global Chrome (nav + footer)
Defined once in `styles/nightfall.js` (`NF_renderChrome`) and `styles/nightfall.css`. Recreate as a
single **layout component** wrapping every page.

**Top nav** (fixed, 72px tall; 64px when scrolled):
- Left: brand lockup — the **white** power mark (20px) + wordmark "PRESS ON"
  (`--font-heading`, weight 800, `letter-spacing: .16em`, uppercase, `.8rem`).
- Right: nav links **Portfolio · Team · Press · Blog** (`.82rem`, color `--fg-on-dark-2`,
  hover `#fff`; active link gets a 1px beige underline 7px below), then a pill
  **"Investor Login"** CTA → links to **`https://www.fundpanel.io/Login`**
  (1px border `--border-on-dark-2`, radius `--radius-full`, padding 9px 18px; hover fills white with dark text).
- On scroll past 40px the bar gains `background: rgba(33,33,33,.78)`, `backdrop-filter: blur(20px)`,
  and a bottom border `--border-on-dark-1`.
- Mobile (<880px): the non-CTA links hide (the prototype has no hamburger — **add a mobile menu** in production).

**Footer** (border-top `--border-on-dark-1`, padding 60px/50px):
- Left: brand lockup (white power mark 21px + "PRESS ON VENTURES") and tagline
  *"Investing in resilient founders building transformative consumer businesses."*
- Right: two columns — **Explore** (Portfolio, Team, Press, Blog) and **Connect**
  (`getintouch@presson.vc`, X/Twitter → `https://x.com/pressonvc`,
  LinkedIn → `https://www.linkedin.com/company/pressonvc/`, Investor Login → `https://www.fundpanel.io/Login`).
- Bottom row: `© 2026 Press On Ventures` + legal disclaimer
  *"For informational purposes only. Not an offer to sell or a solicitation to buy securities. Past performance is not indicative of future results."*

**Contact email used site-wide:** `getintouch@presson.vc`.

---

## Screens / Views

### 1. Home (`home.html`)
A tight narrative arc, intentionally lean (no portfolio/team/press duplication — those have their own pages).

**a) Hero** — full-viewport (`min-height:100vh`), dark radial-gradient background
(`radial-gradient(120% 90% at 78% 18%, #343434, #292929 46%, #1f1f1f)`). A large, faint, slowly
floating power mark (`--povc-beige` at ~8.5% opacity) sits off the right edge. Subtle CSS grain overlay.
- Eyebrow: "Early-Stage Consumer Venture Capital" (beige, with a leading rule).
- H1: **"Backing the founders who press on."** (`--font-heading` 800, `clamp(2.7rem, 7vw, 6rem)`,
  `line-height:1.02`, `letter-spacing:-.035em`, white; the words "press on." in `--povc-beige`).
- Sub: 300-weight, `--fg-on-dark-2`, max ~50ch.
- Animated scroll cue ("Scroll to explore" with a pulsing vertical line) bottom-left.

**b) Mission band** — light section (`--bg-3`). Eyebrow "Our Mission"; one large statement in
`--font-heading` 600, `clamp(1.6rem,3.6vw,3rem)`: *"Investing in resilient founders building
transformative consumer businesses."* (last clause in `--fg-3`).

**c) Market View (the thesis)** — `id="thesis"`, light section (`--bg-2`). **This is the centerpiece.**
- Eyebrow "Market View"; title **"The next wave of AI is consumer."**
- Lede: *"As the generative-AI cycle matures, the easy enterprise trade is largely priced in. We
  believe the next leg of AI value creation will be in consumer."*
- **Two category columns** (`.mv-cats`, equal 1fr/1fr, 1px divider, hairline border, radius `--radius-2xl`):
  - **01 — AI-ENABLED PRODUCT EXPERIENCES** — "AI is the experience, not a feature." Description, then
    three example rows linking to company pages: **Feno**, **10Beauty**, **Magic Story** (each row:
    bold name + 2-line note + up-right arrow; hairline dividers; rows align across both columns via
    reserved min-heights).
  - **02 — AI-LEVERAGED OPERATORS** — "AI as an unfair advantage." Examples: **Jacob Bar**, **Gato**, **(third)**.
  - The two columns are deliberately height-matched (title reserves 2 lines, description reserves 3 lines,
    each example row reserves equal height) so dividers line up. Preserve this.
- (Two summary boxes that previously sat below were **removed** — section now ends on the two columns.)

**d) Contact CTA** — `id="contact"`, light section (`--bg-3`), centered. Power mark (54px, dark),
H2 *"Building something transformative? Let's talk."*, and a large email link
**`getintouch@presson.vc`** (underlined, `--font-heading` 600).

### 2. Portfolio (`portfolio.html`)
- Page hero (eyebrow "The Portfolio", H1 "Twelve teams, one conviction: press on.", lede).
- Controls row: filter pills **All · Health & Well-Being · Travel & Experiential** (each with a live
  count), plus a "Showing N of 12 companies" counter. Active pill = beige fill, dark text.
- Grid: 3 columns (2 at <900px, 1 at <580px), 1px gaps on a hairline border, each cell `--bg-inverse`.
  Card hover lightens to `#2f2f2f`, reveals the description (`max-height` transition) and a beige
  "View company →" footer; an up-right arrow in the top-right nudges. Whole card links to
  `company.html?c=<slug>`.

### 3. Company detail (`company.html?c=<slug>`)
One template, data-driven from the `?c=` query param via `POVC_getCompany(slug)`.
- Breadcrumb "← Portfolio"; category dot + label; large company name (`clamp(2.6rem,6.5vw,5rem)`);
  one-line tag.
- Hero image placeholder: 16:7 beige gradient panel with the company's 2-letter monogram
  ("Company imagery placeholder"). **In production, swap for a real company image/logo.**
- Body: 2-col (1fr / 340px sticky sidebar).
  - Main: "Overview" (the `desc`) + "Why we partnered" (the `why` narrative).
  - Sidebar (`--surface`-style card): Category; Stage at entry; Founder(s) with external links
    (LinkedIn etc.); a beige "Visit website →" button.
- If the company has press items, a "In the press" section lists them (per-company, pulled from the
  same press dataset → in production, from Notion).
- Prev / Next company navigation at the bottom (wraps around the 12).

### 4. Team (`team.html`)
- Page hero (eyebrow "The Team", H1 "Founders backing founders.", lede).
- **General Partners**: 2-col grid. Each GP card: 4:3.4 beige gradient **headshot placeholder** with
  initials, name, role (beige), bio, "Background" chips, "Education" chips, LinkedIn link.
  GPs: **Willie Litvack** (Founder & GP) and **Sean Tolkin** (Founder & GP). **Swap placeholders for
  real headshots in production** (client will provide; current live site has them).
- **Full team**: 3-col grid (2 / 1 responsive), each cell a circular monogram avatar + name + role +
  prior affiliations. Members live in `POVC_TEAM_FULL`.
- **Venture Partner Network**: a 4-up stat band (`POVC_VP_STATS`: 40+ Venture Partners; NY · Miami ·
  SF · LA; Tech · Finance · Health · F&B; Hundreds of Founders & CEOs) and a 3-col grid of example
  partners (`POVC_VPS`: name, focus, short bio). Long stat values get a `.sm` class to size down.

### 5. Press (`press.html`) — **Notion-backed in production**
- Page hero (eyebrow "Press & Recognition", H1 "Our portfolio, in the headlines.", lede).
- "Featured in" band: centered publication names (derived from the data).
- Controls: filter pills = **All coverage** + one per company that has coverage (derived).
- List: each row = publication + date (left), headline (middle), company tag (beige pill), up-right
  arrow; hover indents and tints. Each row links to the external article.
- **All of this currently reads `POVC_PRESS_ITEMS`; replace with the Notion "Connect" table feed.**

### 6. Blog (`blog.html`) — **Medium-backed in production**
- Page hero (eyebrow "Blog", H1 "Field notes from the next wave of consumer.", lede).
- **Featured (latest) post**: 2-col card. Left = flag "Latest · <category>", big title, excerpt,
  author · date, "Read on Medium →". Right = beige panel showing either the Medium cover image or,
  for "Why We're Backing…" posts, the **company logo** centered as a branded tile (with graceful
  fallback to the power mark).
- Category filter pills: **All · Portfolio · Trends & Analysis · Best Practices · Tools**.
  "All" hides the featured post's duplicate in the grid; a category view shows all matching posts.
- Grid: 3-col (2 / 1 responsive) text-forward cards (category, title, 3-line excerpt, author · date,
  arrow). Each links to the Medium article. "Read more on Medium" CTA at the bottom →
  `https://medium.com/@pressonvc`.
- **All of this currently reads `POVC_BLOG`; replace with the Medium RSS feed (auto-sync).**

---

## Interactions & Behavior
- **Scroll reveals**: elements with `.reveal` fade up 28px over ~1s `--ease-out`; staggered via
  `.reveal-d1…d5` delays. Gated on `prefers-reduced-motion`. (Prototype uses `POVC_initReveal`; use any
  equivalent in production. Make sure content is visible if JS/animation fails — base state should not
  trap content at opacity 0 for print/SEO.)
- **Sticky nav** state toggles `.scrolled` past 40px scroll.
- **Filters** (Portfolio, Press, Blog): client-side show/hide by category; active pill restyles;
  counters update. Keep instant (no network) once data is loaded.
- **Portfolio cards / blog cards / press rows**: hover transitions (background lighten, description
  reveal, arrow nudge) ~.4s `--ease-out`.
- **Company detail**: reads `?c=` param; renders "not found" state with a link back to Portfolio if the
  slug is missing/invalid; prev/next wraps around.
- **Marquees** (if retained from earlier versions): pure CSS `@keyframes scroll-x`, pause on hover.
- **Power mark "ignition"** moment exists in the bolder alternate (`direction-3.html`) — not used in
  Nightfall, ignore unless referenced.

## State Management
The prototype is essentially stateless (static data + DOM toggles). In production you need:
- **Server data fetching** for Press (Notion) and Blog (Medium) — see Dynamic Data Integrations.
  Prefer build-time fetch + revalidation (ISR/scheduled) over client-side calls (keeps the Notion token
  private and the pages fast/SEO-friendly).
- **Client UI state** only for: active filter category (Portfolio/Press/Blog) and nav scrolled state.
- **Routing**: Company detail should become a real route (e.g. `/portfolio/[slug]`) instead of a query
  param, with one page generated per company (static generation from the company list).

## Responsive behavior
- Containers: `max-width:1280px`, side padding `clamp(24px,5vw,80px)` (varies slightly per page).
- Grid breakpoints noted per page (mostly 3→2→1 columns at ~900px / ~580px; two-col layouts collapse at
  ~820–880px).
- **Add a mobile nav menu** — the prototype simply hides links under 880px.

---

## Design Tokens
All tokens are defined as CSS custom properties in **`styles/tokens.css`** — reuse that file. Key values:

**Color**
- `--bg-1` page light bg, `--bg-2`/`--bg-3` warm light surfaces (beige-tinted), `--bg-inverse` ink (`#1f1f1f`-ish).
- `--fg-1`…`--fg-4` text on light (dark → muted). `--fg-on-dark-1`…`-4` text on dark (white → muted).
- `--fg-eyebrow` eyebrow color on light. `--povc-beige` (`#E0D8D1`) the signature warm accent.
- `--povc-dark` (`#292929`), `--povc-grey` (`#F2F2F2`), `--povc-white`.
- Borders: `--border-1/2/3` (on light), `--border-on-dark-1/2` (on dark, hairlines).
- `--surface-light`, `--surface-dark`, `--surface-dark-hover`, `--surface-alt`.

**Typography** — `--font-heading` (Inter / display sans, used 700–800 for headings & wordmark) and
`--font-body` (Poppins / humanist sans, 300–500 for body). Scales: `--text-xs`…`--text-6xl`,
`--text-hero`; plus semantic `--h1/2/3/4-*`, `--p-*`, `--eyebrow-*`, `--stat-*`, `--logo-*` groups.
Eyebrows: uppercase, letter-spacing ~.2em, `--text-xs`, weight 500.

**Spacing** — `--space-1`…`--space-20` scale.
**Radius** — `--radius-xs`…`--radius-3xl`, `--radius-full`.
**Shadow** — `--shadow-sm`…`--shadow-2xl`, `--shadow-nav`.
**Easing** — `--ease-out`, `--ease-in-out`.

> The full design system (the binding visual reference) lives in the linked **Press On Ventures Design
> System** project. `tokens.css` here is copied from it. Don't invent values outside this system.

## Assets
In `assets/`:
- `icon-white.svg` / `icon-black.svg` / `icon-color.svg` — the **power mark** (octagon + power glyph).
  **Use `icon-white.svg` on dark backgrounds** (this is what the nav/footer use). The prototype inlines
  the same path as a JS string (`POVC_POWER_SVG`) so it can inherit `currentColor` — in production just
  import the SVG as a component and control color via `fill`/`color`.
- `logo-white.svg` / `logo-black.svg` — the full horizontal lockup (mark + "PRESS ON / VENTURES"). The
  brand's signature treatment uses the power mark as the "O" in "ON"; the nav uses the simpler
  icon+wordmark for legibility at small sizes.
- **Company logos** are hosted by the firm at `https://fundone.presson.vc/assets/company-logos/<file>`
  (e.g. `10beauty.png`, `cofertility.png`, `gato.svg`). The prototype hotlinks these; in production,
  self-host them.
- **Headshots / company hero images are placeholders** (monogram tiles). Replace with real assets; the
  client will provide GP/team headshots, and the live site already has GP photos.

## Screenshots
Annotated reference captures live in `screenshots/` (reveal animations forced to their visible
end-state so nothing is mid-fade). Use them to match visual intent:

| File | Shows |
|------|-------|
| `01-home-hero.jpg` | Home — dark hero, "Backing the founders who press on." |
| `02-home-mission.jpg` | Home — light Mission band |
| `03-home-marketview.jpg` | Home — Market View intro (eyebrow, title, lede) |
| `04-home-marketview-cats.jpg` | Home — the two thesis category columns (aligned) |
| `05-home-contact.jpg` | Home — Contact CTA |
| `06-portfolio-hero.jpg` | Portfolio — page hero |
| `07-portfolio-grid.jpg` | Portfolio — filterable card grid |
| `08-company-hero.jpg` | Company detail — hero (name, category, image placeholder) |
| `09-company-body.jpg` | Company detail — overview + "why we partnered" + sidebar |
| `10-company-press-nav.jpg` | Company detail — per-company press + prev/next |
| `11-team-gps.jpg` | Team — General Partners |
| `12-team-full.jpg` | Team — full team grid |
| `13-team-vp.jpg` | Team — venture-partner stat band + partners |
| `14-press-hero.jpg` | Press — hero + "featured in" band |
| `15-press-list.jpg` | Press — filterable coverage list (→ Notion in prod) |
| `16-blog-featured.jpg` | Blog — featured latest post (logo tile for Portfolio posts) |
| `17-blog-grid.jpg` | Blog — category filters + post grid (→ Medium in prod) |

> Screenshots are desktop width. Headshots and company imagery appear as monogram placeholders by
> design — replace with real assets in production.

## Files (in this bundle)
- `home.html`, `portfolio.html`, `company.html`, `team.html`, `press.html`, `blog.html` — the six pages.
- `styles/tokens.css` — design tokens (reuse).
- `styles/base.css` — reset + reveal utility + container/eyebrow helpers (imports tokens).
- `styles/nightfall.css` — shared nav/footer/section/button styling for inner pages (imports base).
- `styles/nightfall.js` — `NF_renderChrome()` shared nav + footer renderer; arrow SVGs.
- `styles/povc-data.js` — portfolio companies, pillars, team (GPs), press names, power-mark SVG,
  `POVC_initReveal`/`POVC_initNav` helpers.
- `styles/nightfall-data.js` — enriched data: per-company `website`/`stage`/`founders`/`why`,
  `POVC_TEAM_FULL`, `POVC_VPS`, `POVC_VP_STATS`, `POVC_PRESS_ITEMS` (→ Notion), `POVC_BLOG` +
  `POVC_BLOG_CATS` (→ Medium).
- `assets/*` — brand marks/logos.

> `home.html` has its own inline `<style>` and inline data wiring (it predates the shared chrome
> extraction); the five other pages share `nightfall.css` + `nightfall.js`. When componentizing, unify
> them under one layout + token system.

## Copy note
All visible copy across the site has been written **without em dashes** (a deliberate client
preference). Please preserve this when editing or generating any new copy.
