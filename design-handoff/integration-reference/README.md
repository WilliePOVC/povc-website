# Integration Reference

## Notion "Connect" / Press integration
`sync-press-from-notion.mjs` is lifted from the Fund One Investor Presentation
(`povc-investor-deck`). It is the canonical reference for the Press page Notion feed.

- **Notion DB ID:** `36ce9175-4432-81b1-88fd-e9d46f533b94`
- **Auth:** `NOTION_API_KEY` env var, `Notion-Version: 2022-06-28`
- **Filter:** `Publish = "Yes"` (select), sort by `Date Published` descending
- **Field mapping (Notion property -> field):**
  - `Headline` (title) -> headline / `title`
  - `URL` (url) -> `url`
  - `Publication Display Name` (rich_text) -> `pub`
  - `Company Display Name` (rich_text) -> `company`
  - `Date Published` (date) -> `date`

Reuse this exact client + schema mapping for the Press page so the website and
investor deck stay in sync from one source of truth. Keep the token server-side.

## Headshots
Real GP/team/VP headshots pulled from `povc-investor-deck/assets`:
- `assets/headshots/willie-litvack.png` (was gp1_802x804.png)
- `assets/headshots/sean-tolkin.jpg` (was gp2_733x1100.jpg)
- `assets/headshots/{madeline,nikhil,mukul,gagan,gianna,tucker}.png` (full team)
- `assets/vp-headshots/{michael-diaz,arthur-leopold,tyler-watson,josh-neckes,hamet-watt,madeleine-macks}.png`
