# 009 — "Our Clients" credibility section (homepage)

**Status:** Ready for build
**Type:** Feature
**Relates to:** BRIEF.md §5 (Home page), §7 (brand & tone — minimalist, light, premium, no busy
decoration). Owner-supplied business requirement (logo assets: People's Association, Avocadoria).

## User story
As a **visitor evaluating LinkNow** (retail or corporate), I want to see that established
organisations have worked with them, so that I trust the business before enquiring on WhatsApp.

## Context
The owner supplied two client logo assets and a detailed design spec for a premium, understated
"Our Clients" section — credibility-by-association, not a sales-y logo wall. Visual language must
match existing premium corporate / B2B references: logos normalised to a single charcoal tone,
no colour, no cards/shadows/borders, generous whitespace.

## Scope (in)
- New section on the homepage (`/`), between the Portfolio teaser and Testimonials (work →
  who trusts us → what they say → enquire).
- A `src/app/shared/clients.ts` data file exporting a `CLIENTS` list (`{ name, logo, alt }`),
  following the existing `testimonials.ts` / `contact.ts` convention — new clients = one more
  array entry, no markup changes.
- Two initial entries: **People's Association** and **Avocadoria**, using owner-supplied logos
  pre-processed to a single charcoal tone (`public/brand/clients/*.png`), background removed
  (transparent PNG), proportions untouched.
- Section structure: eyebrow ("Our Clients"), heading ("Trusted by organisations"), one-line
  supporting copy, logo row.
- Responsive logo row: flex-wrap, centred, equal **height** (not equal box) so differently
  shaped/sized logos read as one consistent system; generous gap; no per-logo card/border/shadow/
  colour background.
- Subtle hover: opacity step only (no scale/bounce), ~200ms transition.
- Meaningful `alt` text per logo (`"<Name> logo"`).

## Out of scope
- No claims of endorsement/partnership beyond "worked with" — no testimonial text attributed to
  these clients (that stays in `testimonials.ts`, real Google reviews only).
- No new dependencies, no carousel/slider, no autoplay.
- No contact form / pricing — unrelated to this section, stays out per BRIEF.md §4.
- Not adding a dedicated "Clients" page/route — homepage section only, per the spec.

## Acceptance criteria
- [ ] "Our Clients" section renders on `/` with eyebrow, heading, supporting line, logo row.
- [ ] People's Association logo displayed via the provided asset, recoloured to a single charcoal
      tone (`#22201c`, the site's existing `--color-text`), geometry/proportions unchanged, white
      background removed (transparent PNG).
- [ ] Avocadoria logo displayed, desaturated/darkened to a charcoal-grey tonal treatment (no flat
      colourise — the mascot icon has internal shading that a flat fill would blob into noise),
      background removed.
- [ ] All logos share consistent height and therefore consistent perceived visual weight,
      regardless of native image dimensions.
- [ ] No per-logo card, border, drop-shadow, or coloured background. No gradient/glassmorphism on
      the section itself.
- [ ] Layout: desktop shows the full row on one line with generous gaps (2 logos today; the CSS
      itself supports 4–5/row once more clients are added); tablet/mobile wrap down to narrower
      rows (2-up on mobile) without the logos becoming illegibly small.
- [ ] Hover (non-touch) subtly raises opacity over ~200ms; no scaling/bouncing/flashy motion.
- [ ] Every logo `<img>` has descriptive `alt` text; no information conveyed by colour alone.
- [ ] Adding a third client requires only one new object in `CLIENTS` — no template changes.
- [ ] Visually consistent with the rest of the site: reuses `--color-text` / `--color-text-muted` /
      `--track-wide` / existing `.eyebrow` / `.section` conventions from `home.scss` — no new
      visual language introduced.
- [ ] `npm run lint`, `npm run build`, `npm test` all pass.

## Design / brand notes
- Charcoal target colour: reuse `--color-text` (`#22201c`) — already defined as "warm near-black
  charcoal" in `src/styles.scss`; do not invent a new grey.
- Section background: plain (page bg or the existing `.section--tint` treatment) — no new tint.
- Typography/spacing: reuse `.eyebrow`, `.section`, `.section__title` patterns already in
  `home.scss` rather than introducing new type scale.

## Data
```
CLIENTS = [
  { name: "People's Association", logo: "/brand/clients/peoples-association.png", alt: "People's Association logo" },
  { name: "Avocadoria", logo: "/brand/clients/avocadoria.png", alt: "Avocadoria logo" },
]
```

## Definition of done
All acceptance criteria met; lint/build/tests green; section visible on `/` and matches the
reference direction (premium, minimal, monochrome, no sales-wall feel); reviewer notes addressed.
