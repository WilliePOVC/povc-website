# Press On Ventures — Website Redesign ("Nightfall")

Redesign of the Press On Ventures website (current live site: [www.presson.vc](https://www.presson.vc)).
Premium, quiet-luxury, predominantly dark ("ink") aesthetic with a warm beige accent and a light
editorial body. Primary audience: **Limited Partners / investors**; founders secondary.

## Repo Structure

```
.
├── design-handoff/        # Design reference prototype (HTML/CSS/vanilla JS) + full spec
│   ├── README.md          # ⭐ The binding handoff spec — read this first
│   ├── home.html          # Home (hero → mission → market view → contact)
│   ├── portfolio.html     # Filterable grid of all 12 companies
│   ├── company.html       # Per-company data-driven detail template
│   ├── team.html          # GPs, full team, venture-partner network
│   ├── press.html         # "Featured in" + coverage list (→ Notion in prod)
│   ├── blog.html          # Featured post + post grid (→ Medium RSS in prod)
│   ├── styles/            # tokens.css, base.css, nightfall.css + data/JS
│   ├── assets/            # Brand marks / logos (power mark + lockups)
│   └── screenshots/       # Annotated reference captures
└── (production app)       # ← The real build goes here (framework TBD: Next.js / Astro)
```

## What This Is

The `design-handoff/` files are **design references** — prototypes that show the intended look,
layout, copy, and interaction behavior. **They are not production code to ship directly.** The task
is to recreate these designs in a modern framework (React-based with server-side data fetching /
ISR — Next.js or Astro recommended).

## Two Dynamic Data Requirements (the main reason for SSR/ISR)

1. **Press page → Notion** — pull coverage items from the firm's Notion "Connect" table. Reuse the
   same Notion integration architecture as the **Fund One Investor Presentation** repo
   ([`povc-investor-deck`](https://github.com/WilliePOVC/povc-investor-deck)) so they stay in sync
   from one source of truth.
2. **Blog page → Medium** — auto-sync posts from `https://medium.com/feed/@pressonvc` (RSS → JSON),
   server-side, with revalidation.

> Keep secrets (Notion token) server-side only. Never expose to the client.

## Design System

Tokens live in `design-handoff/styles/tokens.css` (reuse — don't re-derive values). The full binding
visual reference is the **POVC Design System** project
([`povc-design-system`](https://github.com/WilliePOVC/povc-design-system)).

## Copy Note

All visible copy is written **without em dashes** (deliberate client preference). Preserve this.

---

_See [`design-handoff/README.md`](design-handoff/README.md) for the complete implementation spec:
page-by-page breakdown, chrome (nav/footer), interactions, responsive behavior, design tokens, and
asset notes._
