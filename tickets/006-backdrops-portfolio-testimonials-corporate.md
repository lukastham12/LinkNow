# 006 — Backdrops portfolio, formal testimonials, Corporate Events card

**Status:** Ready for build
**Type:** Page + content + copy
**Relates to:** PM instructions (this turn). Builds on tickets 004/005.

## A. Testimonials — make them formal, drop the names
On the homepage testimonials section (`src/app/pages/home/home.html`):
- Eyebrow `KIND WORDS` → `TESTIMONIALS`.
- Heading `What clients say` → `Client Testimonials`.
- **Remove the reviewer's name** from each card. Instead of `— {{ t.author }}`, show a subtle,
  professional attribution: `Verified Google review`. Keep the 5-star row and the quote.
- Keep `testimonials.ts` data as-is (the `author` field just stops being rendered).

## B. Custom Backdrops → real photos + portfolio page
Real backdrop photos are now in `public/backdrops/backdrop-01.jpg … backdrop-14.jpg` (14 images).
- **Best image for the homepage = `backdrop-07.jpg`** (pink/gold "Samantha" — on-brand).
- Create a **Backdrops Portfolio page** at route `/backdrops` (title "Custom Backdrops"),
  `src/app/pages/backdrops/`. Show a short intro + a responsive **gallery grid of all 14 photos**
  (consistent tiles, e.g. `aspect-ratio: 4/5; object-fit: cover`, lazy-loaded, descriptive alt like
  "Custom event backdrop by Linknow Events Co."). End with a WhatsApp CTA: **"Want a backdrop like
  these? Enquire on WhatsApp"** (generic `WHATSAPP_HREF`). No prices, no per-item messages.
  Put the image list in a small data file (e.g. `backdrops.ts`) the component maps over.
- Wire it up: the **Custom Backdrops** service card (on `/services`) links to `/backdrops` (like the
  Floral card links to `/flowers`); the **Services nav dropdown** "Custom Backdrops" child →
  `/backdrops` (replace the `#backdrops` fragment). Register `/backdrops` in `app.routes.ts`.

## C. Homepage — feature the best backdrop + real service images
On the homepage (`src/app/pages/home/`):
- The three service cards currently use placeholder panels. Give them real images:
  - **Custom Backdrops** → `/backdrops/backdrop-07.jpg` (the best).
  - **Floral Services** → a flower photo, e.g. `/flowers/hydrangea-china.jpg` (or another tasteful bloom).
  - **Corporate Events** (see §D) → `/backdrops/backdrop-09.jpg` (Avocaderia).
- The "Recent events" portfolio teaser: replace the 6 placeholder tiles with 6 real backdrop photos
  (pick a varied set, e.g. backdrop-02, 07, 10, 04, 12, 03) and point "View full portfolio" →
  `/backdrops`. Keep it a teaser (links to the full gallery).

## D. Rename "Setup-Only Labour" → "Corporate Events"
The PM's view: the company does weddings, formal occasions and corporate/company events (e.g. the
Avocaderia in-store event). Replace the third service line everywhere:
- Name: **"Corporate Events"** (was "Setup-Only Labour").
- Blurb: something like "Styling and décor for company celebrations, launches and formal
  occasions — polished setups your guests will remember."
- Image: `/backdrops/backdrop-09.jpg` (Avocaderia).
- Update: homepage services list (`home.ts`), the Services page card (`services.ts`), the Services
  dropdown child label in `contact.ts` (and its link — point to `/services#corporate`, and give
  that card `id="corporate"`), and **BRIEF.md §2/§5** (replace the setup-only labour service line
  with Corporate Events; note setup-only labour is no longer a headline service).

## Out of scope
- No prices/qty/cart; WhatsApp-only (no forms/email/contact). Don't build Portfolio/Testimonials/About pages.

## Acceptance criteria
- [ ] Testimonials: eyebrow "TESTIMONIALS", heading "Client Testimonials", no reviewer names,
      each card shows 5 stars + quote + "Verified Google review".
- [ ] `/backdrops` page renders all 14 photos in a consistent responsive grid + WhatsApp CTA; no prices.
- [ ] Custom Backdrops card (/services) and the Services dropdown "Custom Backdrops" both go to `/backdrops`.
- [ ] Homepage service cards show real images (backdrop-07 / a flower / backdrop-09); portfolio teaser
      shows real backdrops and links to `/backdrops`.
- [ ] Third service is "Corporate Events" (not "Setup-Only Labour") everywhere, with the Avocaderia image;
      BRIEF.md updated.
- [ ] Minimalist/light rose theme, CSS variables; `npm run lint`, `npm run build`, `npm test` all pass;
      specs updated (backdrops page, corporate rename, testimonials attribution).

## Notes
- Keep the contained `logo.jpg` mark and the pink hydrangea hero. Backdrop photos are real scene
  photos — do NOT background-remove them; display as-is in tiles.
