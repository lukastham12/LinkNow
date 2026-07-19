# 003 — Floral Showcase page

**Status:** Ready for build
**Type:** Page (+ nav + route wiring)
**Relates to:** BRIEF.md §4 (no catalogue/pricing), §5 (sitemap), §6 (WhatsApp), §7 (brand);
PM verdict: GO (owner-confirmed showcase page). Depends on ticket 002 (rose theme) and the
shared header/footer/floating-WhatsApp from ticket 001.

## User story
As a retail or corporate visitor, I want to browse the range of flowers Linknow works with,
so that I get a feel for what's possible and can enquire for a quote — without any prices or
ordering flow.

## Context
The owner wants a **showcase gallery** (not a purchasable catalogue) of the flowers we work
with, presented image-led and grouped by type. The data already exists at
`src/app/pages/flowers/catalogue.ts`, which exports `FLOWER_CATALOGUE: FlowerCategory[]`
(5 categories — Roses, Carnations, Orchids, Other Mains, Fillers; 42 items; each
`{ name, image }` with photos under `public/flowers/`). This page must never resemble a
shop: no prices, no quantities, no bundle sizes, no cart/selection/quote-builder. Conversion
is the standard generic WhatsApp CTA plus a link to /contact.

## Scope (in)
- New standalone component at `src/app/pages/flowers/` (e.g. `flowers.ts` / `.html` / `.scss`),
  page title **"Floral Showcase"**.
- Import `FLOWER_CATALOGUE` from `./catalogue` and render:
  - A short intro paragraph framing it as a **showcase gallery** of flowers we work with
    (enquire for a quote); no pricing language.
  - The catalogue **grouped by category** (category heading as a spaced-caps section label),
    each item rendered as **photo + name ONLY**, in a responsive grid.
- A generic WhatsApp CTA ("enquire for a quote") using the canonical link, plus a link to
  `/contact`.
- Add route `{ path: 'flowers', component: Flowers, title: 'Floral Showcase — Linknow Events Co.' }`
  to `src/app/app.routes.ts`, **before** the `**` wildcard; keep SSR/prerender working.
- Add a nav entry `{ label: 'Flowers', path: '/flowers' }` to `NAV_LINKS` in
  `src/app/shared/contact.ts`, positioned **immediately after "Services"** (header + footer
  inherit it automatically).

## Out of scope
- ❌ No price, quantity, bundle/pack size, or "from $X" anywhere — HARD RULE (BRIEF.md §4).
- ❌ No cart, item selection, checkboxes, or quote-builder; no per-item pre-filled WhatsApp
  message (only the single generic canonical message).
- No new photography sourcing (use the existing `public/flowers/` images referenced by the data).
- No changes to the catalogue data file's schema.

## Acceptance criteria
- [ ] Route `/flowers` renders the Floral Showcase page and is prerendered by the SSR build.
- [ ] "Flowers" appears in the header nav and footer, positioned right after "Services".
- [ ] Page shows a short showcase intro (gallery framing, no pricing language) and all 5
      categories with all 42 items, grouped under their category headings.
- [ ] **No-price guardrail:** the page contains no price, currency symbol, quantity, or
      bundle/pack size, and no cart/selection/quote-builder UI. Each item shows photo + name only.
- [ ] Images are **lazy-loaded** (`loading="lazy"`) and each `alt` equals the flower `name`.
- [ ] The WhatsApp CTA uses the canonical `https://wa.me/6588090600` with the generic message
      ("Hi LinkNow, I'd like to enquire about your services") via the shared `contact.ts`
      constant — no per-item/custom message. A link to `/contact` is present.
- [ ] Mobile-first responsive grid: no horizontal overflow at 390px; grid reflows to desktop.
- [ ] Brand = minimalist & light with the rose accent from ticket 002 (CSS variables, no
      hard-coded hex); no dark full-page background, no glow/heavy shadows.
- [ ] Accessibility: single `<h1>` ("Floral Showcase"), category headings in sensible order,
      meaningful alt text, sufficient contrast.
- [ ] `npm run lint`, `npm run build`, and `npm test` all pass.

## Design / brand notes
- Image-led: let the flower photography carry the page; keep UI quiet (off-white canvas,
  charcoal text, rose used sparingly). Use `--color-blush` at most as a light section tint.
- Category labels as refined spaced-caps (`--track-wide`/`--track-mid`); thin rose hairline
  dividers. Reuse the shared header, footer, and floating WhatsApp button.

## Data / placeholders
- Data: `src/app/pages/flowers/catalogue.ts` (`FLOWER_CATALOGUE`) — do not duplicate or edit.
- Images: existing files under `public/flowers/` (served at `/flowers/...`). If any image is
  missing, leave the reference and add a TODO — do not invent replacements.
- Canonical values from `src/app/shared/contact.ts`: WhatsApp `https://wa.me/6588090600` +
  generic message; `/contact` link. Do not hard-code duplicates.

## Definition of done
- Acceptance criteria met (esp. the no-price guardrail); `npm run lint`, `npm run build`,
  `npm test` all green; changes small and reviewable; reviewer notes addressed.
