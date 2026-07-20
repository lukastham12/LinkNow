# 005 — Services e-comm card grid + Services nav dropdown + Floral page

**Status:** Ready for build
**Type:** Page redesign + navigation
**Relates to:** BRIEF.md §5; PM instruction (this turn). Builds on ticket 004.

## User story
As a visitor, I want the Services page to present the offerings the way modern e-commerce/agency sites do (a clean card grid), and I want to hover "Services" in the nav to see a dropdown that takes me straight to the Floral (flowers) page — so I can browse services quickly.

## Design direction (the "common factor")
Modern sites with multiple services show a **responsive grid of service cards**: each card = image + title + one-line description + a link, with a subtle hover lift. Use that pattern.

## Scope (in)
1. **Services overview page (`/services`)** — redesign to a card grid:
   - Short intro (keep it minimal), then a **grid of 3 service cards**: Custom Backdrops, Floral Services, Setup-Only Labour.
   - Each card: image, title, one-line blurb, and a clear affordance (e.g. "Explore →"), with a subtle hover lift (no heavy shadow — stay minimalist/light).
   - **Floral Services card** image = a representative flower photo (e.g. `/flowers/rose-china.jpg` or similar) and **links to `/flowers`**.
   - Custom Backdrops / Setup-Only Labour cards: use clearly-labelled placeholder images (real photos TODO) and link to a section anchor on the page (e.g. `#backdrops`, `#setup`) or a short detail block below the grid.
   - Below the grid, keep short descriptive blocks for each service (anchors for the above).
   - WhatsApp CTA only.

2. **Floral Showcase page (`/flowers`)** — restore as its own route:
   - Remove the `flowers -> services` redirect in `app.routes.ts`; make `/flowers` a real page (title "Floral Showcase") that renders the reusable `floral-showcase` component (the 42-item gallery, photo + name only, no prices).
   - It is reachable from the Services dropdown and the Floral Services card — it is NOT a top-level nav tab.
   - Gallery images are now uniform white squares; display them on a consistent square tile (object-fit cover/contain) so the grid is visually consistent.

3. **"Services" nav dropdown**
   - In `src/app/shared/contact.ts`, extend the nav model so "Services" has children: **Custom Backdrops** (`/services#backdrops`), **Floral Services** (`/flowers`), **Setup-Only Labour** (`/services#setup`).
   - Desktop: hovering (or focusing) "Services" reveals a dropdown of those children; the "Services" label itself still navigates to `/services`.
   - Mobile: tapping "Services" expands an inline submenu.
   - **Accessibility:** must also open on keyboard focus / Enter, close on Escape, use `aria-haspopup`, `aria-expanded`, and be fully keyboard navigable — not hover-only. Other nav items (Home, Portfolio, Testimonials, About) unchanged.

## Out of scope
- No prices/qty/cart anywhere; WhatsApp-only (no forms/email/contact). Don't build Portfolio/Testimonials/About pages.

## Acceptance criteria
- [ ] `/services` shows a responsive 3-card service grid (image + title + blurb + link, hover lift), minimalist/light, rose accents from CSS vars.
- [ ] Floral Services card links to `/flowers`; `/flowers` is a real page rendering the 42-item gallery (photo + name only, no prices).
- [ ] Hovering/focusing "Services" in the desktop nav opens a dropdown with Custom Backdrops, Floral Services (→/flowers), Setup-Only Labour; clicking "Services" still goes to `/services`.
- [ ] Dropdown is keyboard-accessible (focus opens, Escape closes, aria-haspopup/expanded) and works as a submenu on mobile.
- [ ] Flower gallery tiles are visually consistent (uniform square, white bg, no clipping, no black).
- [ ] Nav top level = Home, Services, Portfolio, Testimonials, About (Flowers is only under the Services dropdown, not a top tab).
- [ ] `npm run lint`, `npm run build`, `npm test` all pass; specs updated (dropdown + /flowers route + services grid; keep the no-price guardrail).

## Notes
- Keep minimalist & light rose theme; reuse CSS variables. Logo stays the contained `logo.jpg` mark (ticket 002).
- Update BRIEF.md §5 nav/sitemap note if needed (floral reachable under Services via dropdown, not a top tab).
