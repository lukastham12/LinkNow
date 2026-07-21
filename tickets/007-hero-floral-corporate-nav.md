# 007 — Appealing hero + floral image, Corporate Events page, trim nav

**Status:** Ready for build
**Type:** Content + page + nav
**Relates to:** PM instructions (this turn). Builds on tickets 005/006.

## A. Homepage hero image
- Replace the pink-hydrangea cut-out (`/brand/hero-flower.png`) in the hero with a **real backdrop
  photo: `/backdrops/backdrop-07.jpg`** (the pink/gold "Samantha" build — appealing + on-brand).
- Style it as a proper hero image: fills the right column, `object-fit: cover`, rounded corners,
  a sensible height (e.g. ~460–520px desktop, good on mobile). Not a small floating element.
  Remove the now-unused `.hero__flower` rules; `hero-flower.png` may be left in the repo.

## B. Floral Services image (homepage + services page)
- The single hydrangea is unappealing. Use the lush wrapped bouquet **`/flowers/floral-feature.jpg`**
  for the **Floral Services** card on the homepage (`home.ts`) AND on `/services` (`services.ts`).
  It sits on white — show it whole (`object-fit: contain` / the existing cut-out treatment), not cropped.
- To avoid the hero and the Custom Backdrops card being the same photo, set the homepage **Custom
  Backdrops** service-card image to `/backdrops/backdrop-02.jpg` (Daxton's).

## C. Corporate Events — its own page (+ move the Avocaderia photos here)
- Create a **Corporate Events page** at `/corporate` (`src/app/pages/corporate/`, title "Corporate Events").
  Content:
  - Intro: décor for companies and formal occasions.
  - Copy mentioning the range: **weddings** (we don't have photos yet — describe, don't fake),
    **corporate backdrops**, product launches, grand openings, dinner & dance (D&D), roadshows, and
    festive/seasonal décor. Keep it warm and concise.
  - Show the **two Avocaderia photos**: `/backdrops/backdrop-08.jpg` and `/backdrops/backdrop-09.jpg`
    (with alt like "In-store corporate event styled for Avocaderia").
  - End with a WhatsApp CTA: **"Planning a corporate event? Enquire on WhatsApp."** (generic WHATSAPP_HREF).
- Wire it: the **Corporate Events** service card (homepage + `/services`) links to `/corporate`; the
  **Services dropdown** "Corporate Events" child → `/corporate` (was `/services#corporate`). Register `/corporate`.
- **Remove the two Avocaderia photos (backdrop-08, backdrop-09) from the `/backdrops` gallery**
  (`backdrops.data.ts` → 12 items now). Update the backdrops spec's count.

## D. Trim the nav
- Remove **Portfolio** and **Testimonials** from `NAV_LINKS` (top nav → Home · Services · About).
- **Keep the homepage portfolio teaser**, but relabel its heading to **"Recent work"** and point its
  link ("View full portfolio" → change wording to e.g. "See our services") to **`/services`** (not `/backdrops`).
- **Keep the homepage testimonials section** ("Client Testimonials") as-is — it's just no longer a nav item.
- Update `BRIEF.md` §5: Portfolio & Testimonials are not top-level nav pages; Testimonials is a homepage
  section; add the Corporate Events page; note the Recent-work teaser links to /services.

## Out of scope
- No prices/qty/cart; WhatsApp-only (no forms/email/contact). Don't build a separate Portfolio or About page.

## Acceptance criteria
- [ ] Hero shows `/backdrops/backdrop-07.jpg` as a proper cover image (rounded, fills the column); no hydrangea PNG.
- [ ] Floral card (home + services) uses `/flowers/floral-feature.jpg`, shown whole (not cropped).
- [ ] `/corporate` page exists (single h1) with the two Avocaderia photos, the weddings/backdrops/other-events
      copy, and a WhatsApp CTA; no prices.
- [ ] Corporate Events card + Services dropdown child both link to `/corporate`.
- [ ] `/backdrops` gallery no longer includes backdrop-08 or backdrop-09 (12 items).
- [ ] Top nav = Home, Services, About (no Portfolio, no Testimonials); homepage "Recent work" teaser kept and
      links to `/services`; testimonials section kept.
- [ ] `npm run lint`, `npm run build`, `npm test` all pass; specs updated (home teaser→/services, service-card
      images, corporate page, backdrops count 12).

## Notes
- Keep minimalist & light rose theme (CSS variables). Real scene photos use cover; the bouquet cut-out uses contain.
