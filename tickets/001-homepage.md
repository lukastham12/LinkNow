# 001 — Homepage

**Status:** Ready for build
**Type:** Page (+ shared Header, Footer, floating WhatsApp components it depends on)
**Relates to:** BRIEF.md §5 (sitemap), §6 (WhatsApp + enquiry), §7 (brand); PM verdict: GO

## User story
As a mobile visitor arriving from TikTok (retail or corporate), I want to instantly
understand what Linknow Events Co. does and see the quality of their work, so that I
can reach them on WhatsApp to enquire — in one tap.

## Context
The homepage is the top of the funnel and page 1 of the site. It also introduces the
shared **site header/nav**, **footer**, and the **floating WhatsApp button** that every
other page will reuse — so build those as reusable components. Real photography is not
yet available; use clearly-labelled placeholder image panels and swap real photos in later.

## Scope (in)
- Reusable **SiteHeader**: logo (transparent, on light) + nav links (Home, Services,
  Portfolio, Testimonials, About, Contact); collapses to a mobile menu.
- Reusable **SiteFooter**: logo, contact (WhatsApp + enquiry email), Instagram/TikTok
  links, "Singapore", copyright.
- Reusable **floating WhatsApp button** (persistent, bottom-right, thumb-reachable).
- Homepage sections, in order:
  1. **Hero** — headline, one-line subtext, WhatsApp + "Enquire" CTAs, placeholder hero image.
  2. **Services** — three items: Custom Backdrops · Floral Services · Setup-Only Labour
     (client supplies materials), each a short line + placeholder image.
  3. **Portfolio teaser** — small grid of placeholder images, link to /portfolio.
  4. **Testimonials** — 2–3 placeholder client quotes.
  5. **Enquiry strip** — "Planning something?" with WhatsApp + Contact CTAs.
- Wire route `''` → HomeComponent; keep SSR/prerender working.

## Out of scope
- No packages, tiers, or pricing anywhere. No logins/accounts/payments/booking.
- Do NOT build the Services/Portfolio/Testimonials/About/Contact **pages** yet (later
  tickets) — only the homepage sections and the nav links pointing to them.

## Acceptance criteria
- [ ] Header shows the transparent logo and all six nav links; mobile menu works at phone widths.
- [ ] Hero communicates "custom event décor in Singapore" and has a WhatsApp CTA above the fold.
- [ ] The three services are visible with correct names (incl. "setup-only labour — client supplies materials").
- [ ] Portfolio teaser links to `/portfolio`; testimonials show placeholder quotes clearly marked.
- [ ] Floating WhatsApp button is present on the page and thumb-reachable on mobile.
- [ ] All WhatsApp links use the canonical `https://wa.me/6588090600` with the generic
      message ("Hi LinkNow, I'd like to enquire about your services"); enquiry email is
      `novestelatham@gmail.com`; socials point to the correct IG/TikTok URLs.
- [ ] Brand = minimalist & light: off-white canvas, charcoal text, sparing gold, no
      neon/glow/dark-page/heavy shadows. Colours come from CSS variables in `src/styles.scss`.
- [ ] Mobile-first: no horizontal overflow at 390px; layout holds from phone to desktop.
- [ ] Accessibility: meaningful `alt` text on images, sensible heading order, nav is
      keyboard-reachable, sufficient contrast.
- [ ] All placeholder imagery/copy is clearly labelled as placeholder (TODO to swap).
- [ ] `npm run lint`, `npm run build`, and `npm test` all pass.

## Design / brand notes
- Minimalist & light. Use `src/styles.scss` variables (`--color-bg #f6f3ee`,
  `--color-gold #a67c2e`, `--color-text #22201c`, hairlines). Spaced-caps for section
  labels. Thin-outline/text buttons — no filled glowing pills.
- Use `public/brand/logo-transparent.png` in header (light background).

## Data / placeholders
- WhatsApp: `https://wa.me/6588090600` + generic message. Email: `novestelatham@gmail.com`.
- Instagram: https://www.instagram.com/linknowsg/ · TikTok: https://www.tiktok.com/@linknowsg
- Photos: clearly-labelled placeholder panels (TODO: real décor photos — BRIEF.md §12).
- Testimonial/About copy: placeholder (TODO: real copy).

## Definition of done
- Acceptance criteria met; lint + build + tests green; changes small and reviewable;
  reviewer notes addressed.
