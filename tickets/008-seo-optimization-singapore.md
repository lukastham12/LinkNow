# 008 — SEO optimization of existing pages (Singapore context)

**Status:** Ready for build
**Type:** Feature
**Relates to:** BRIEF.md §10 (SEO — local Singapore SEO, meta tags, semantic HTML, per-page
titles/descriptions), §11 (SSR/prerender protects mobile speed + SEO), §2/§8 (canonical
values), §9/§12 (domain not owned — keep configurable). PM verdict: GO with scope fence.

## User story
As a **retail visitor or corporate client** searching Google for event décor in Singapore, I
want LinkNow's pages to surface with accurate, relevant titles, descriptions and rich results, so
that I can find and trust the business and tap through to enquire on WhatsApp.

As the **site owner**, I want on-page SEO done correctly on the pages we already have (not a blog
farm or fake data), so that we improve organic discoverability without misrepresenting the business.

## Context
SEO is a stated top priority in BRIEF.md and is the reason SSR/prerendering was chosen. The routes
already set a `title`, but there is **no per-page meta description, no canonical, no Open Graph /
Twitter tags, no structured data, no robots.txt and no sitemap.xml**. The default description in
`src/index.html` is **stale** — it still references "setup labour", which was replaced by Corporate
Events (ticket 006/007). This ticket adds correct, truthful, Singapore-local SEO metadata to the
**5 existing prerendered routes only** and the supporting crawl files. It depends on nothing else and
should ship as small slices (base URL + service → per-page tags → JSON-LD → robots/sitemap → checks).

## Scope (in)
- The **5 existing routes only**: Home `/`, Services `/services`, Floral `/flowers`, Custom Backdrops
  `/backdrops`, Corporate Events `/corporate`.
- A single configurable **base/site URL** constant reused everywhere (canonical, OG url, sitemap, JSON-LD).
- An Angular **Title/Meta-based SEO service** (or equivalent) driven by route data, running during
  SSR/prerender so tags land in the static HTML.
- Per-page: unique `<title>`, unique meta `description`, `<link rel="canonical">`, Open Graph tags,
  Twitter card tags.
- Fix the stale `index.html` default description; add site-wide defaults (`theme-color`, default OG image).
- **JSON-LD structured data** (Organization/LocalBusiness) limited to canonical, truthful data.
- `public/robots.txt` and `public/sitemap.xml` (5 routes, configurable base).
- Semantic-HTML / accessibility pass on the 5 pages: one `<h1>` each, logical headings, image alt text.

## Out of scope
- **No new pages.** About is not built yet — it gets its SEO when built (do NOT block on it, do NOT add
  it to the sitemap or nav).
- **No blog / articles / content farm.**
- **No pricing or price-bearing structured data** — no `Offer`, `priceRange`, or similar (packages/pricing
  are out of scope, BRIEF.md §4).
- **No `aggregateRating` / review structured data** — testimonials are real-only and currently empty; do
  not fabricate ratings.
- **No fabricated business data** — no street address, postal code, opening hours, geo-coordinates, or
  email in metadata or JSON-LD.
- **No contact page / form / mailto / quote affordance** — WhatsApp stays the ONLY conversion channel.
- **No hard-coded production domain** (none owned) and **no invented GA4 Measurement ID**.
- Do not switch any route off prerendering.

## Acceptance criteria
- [ ] A **single** base/site URL is defined in **one** shared constant (e.g. a `seo` config/constant),
      clearly marked as a **placeholder/TODO** to swap when the domain is bought. It is referenced by
      canonical URLs, OG urls, the sitemap and JSON-LD. No page hard-codes its own domain string.
- [ ] Each of the **5 routes** produces, **in the prerendered `dist/` HTML** (not client-only):
      a unique `<title>` (Singapore context), a unique `<meta name="description">`, a
      `<link rel="canonical">` pointing at the correct route on the base URL, Open Graph tags
      (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`) and Twitter card
      tags (`twitter:card` + title/description/image).
- [ ] The metadata mechanism runs during **SSR/prerender** (an Angular Title/Meta-based SEO service driven
      by route data), verifiable by inspecting each prerendered HTML file in `dist/`.
- [ ] `src/index.html` default description no longer says "setup labour"; it reflects current services
      (custom backdrops, floral services, corporate events) in a **Singapore** context.
- [ ] Site-wide defaults added: `theme-color` matching the brand (e.g. off-white `#faf6f3` or rose
      `#a63f57`), a default OG image, `lang="en"` (already present) and `viewport` (already present) retained.
- [ ] **JSON-LD** for an **Organization/LocalBusiness** is present in the prerendered HTML, containing ONLY:
      `name` ("Linknow Events Co." / legal "LinkNow Pte Ltd"), `logo`/brand, `description`, `url`
      (configurable base), `areaServed` = **Singapore**, `telephone`/contactPoint = the canonical WhatsApp
      number **+65 8809 0600**, and `sameAs` = the Instagram + TikTok URLs. It contains **NO** address,
      opening hours, geo, price/Offer, or aggregateRating. Optional `WebSite` and/or `BreadcrumbList`
      JSON-LD may be added only if truthful and adding value.
- [ ] `public/robots.txt` exists, allows crawling, and references the sitemap URL built from the
      configurable base.
- [ ] `public/sitemap.xml` (or a generated equivalent kept in sync) lists exactly the **5 existing routes**
      using the configurable base URL. **About does not appear.**
- [ ] Semantic/accessibility check across the 5 pages: **exactly one `<h1>` per page**, logical heading
      order (no skipped levels), and **alt text on every décor image**. Any current violation is fixed;
      note in the PR which pages were adjusted.
- [ ] Titles/descriptions carry **Singapore-local relevance** (e.g. "custom event backdrops in Singapore",
      "event & party décor in Singapore").
- [ ] **Non-regression:** prerendering stays on for all routes (`app.routes.server.ts` unchanged in intent);
      `npm run lint`, `npm run build`, `npm test` all pass; per-page `<meta>` and JSON-LD are verifiable in
      the `dist/` prerendered HTML.

## Design / brand notes
- Metadata copy follows the brand voice: warm, high-end, celebratory, concise; minimalist & light brand.
- `theme-color` should come from the palette in `src/styles.scss` (bg `#faf6f3`, rose `#a63f57`) — reuse the
  CSS variable values, do not invent a new colour.
- Use the canonical logo (`public/brand/logo.jpg`) as the brand/logo reference in JSON-LD and, if suitable,
  as the default OG image (or a purpose-made OG image asset with descriptive filename).

## Data / placeholders
- **Base/site URL:** single clearly-labelled placeholder constant (e.g. `https://REPLACE-WITH-DOMAIN.example`
  or similar) with a `TODO` per BRIEF.md §9/§12 — owner swaps when the domain is bought. **Never** hard-code
  a production domain per file.
- **WhatsApp (canonical, only channel):** `+65 8809 0600` → `https://wa.me/6588090600`. Reuse the existing
  shared constant; do not duplicate.
- **Instagram:** https://www.instagram.com/linknowsg/ · **TikTok:** https://www.tiktok.com/@linknowsg
- **Region:** Singapore only.
- **Do NOT invent:** street address, postal code, opening hours, geo-coordinates, destination email, review
  ratings, or a GA4 Measurement ID — all remain out until the owner supplies them (BRIEF.md §12).

## Open decisions (recorded — proceed with the safe default, note the swap point)
- **Base URL:** ship with a single clearly-labelled placeholder constant; owner swaps on domain purchase.
- **LocalBusiness scope:** ship **without** address/hours/geo (name, region = Singapore, WhatsApp, socials
  only). Revisit to add address/hours only if the owner later provides verified values.

## Definition of done
- All acceptance criteria met; `npm run lint`, `npm run build`, `npm test` all green; per-page metadata and
  JSON-LD confirmed in the prerendered `dist/` HTML; changes shipped in small, reviewable slices; reviewer
  notes addressed.
