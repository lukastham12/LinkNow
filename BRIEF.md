# Product Brief — LinkNow Events Co. Website

_Last updated: 2026-07-18 · Owner: Product (lukastham12@gmail.com) · Status: Approved for build_

---

## 1. Summary (the one-paragraph version)

A **mobile-first marketing & showcase website** for **LinkNow Pte Ltd** (brand: **LinkNow Events Co.**), a Singapore-based events décor company. The site's job is to make visitors feel the quality of our work through imagery, explain our services, build trust with portfolio + testimonials, and drive them to **enquire via WhatsApp** (the only enquiry channel — no form, no email, no contact page). There is **no online catalogue, no pricing, no logins, and no payments** — pricing is handled per enquiry. This is a marketing site, not a web app.

---

## 2. Company

- **Legal name:** LinkNow Pte Ltd
- **Brand name:** LinkNow Events Co.
- **Location / market:** Singapore only (reflect in copy and local SEO)
- **What we do:** Three headline service lines — **custom backdrops** for celebrations and formal occasions (birthdays, weddings, corporate events), **floral services**, and **corporate events** (styling and décor for company celebrations, launches and formal occasions, e.g. the Avocaderia in-store event). _(Setup-only labour — supplying just the manpower when the client already has their materials — is still offered on request but is no longer a headline service line; it was replaced by Corporate Events, ticket 006.)_

**Homepage 10-second test:** A visitor immediately understands we create beautiful, professional event décor; sees striking photos of our work; grasps our three service lines; and can reach us on **WhatsApp** in one tap.

---

## 3. Audience

Two segments:

1. **Retail / public** — individuals planning birthdays, weddings, and personal celebrations.
2. **Corporate / business** — companies engaging us for event décor or floral services.

**Behaviour & implications:**
- Discovery is mostly **TikTok → WhatsApp**, with some organic Google search.
- Audience is **tech-savvy and mobile-first** → the site **must be excellent on phones first**, desktop second.
- Social proof (portfolio, TikTok content, testimonials) matters more than long copy.

---

## 4. Scope — Marketing / Catalogue Site (NOT a web app)

**In scope:**
- Static, fast, image-led marketing site.
- **WhatsApp CTA** — persistent and obvious (floating button + repeated per section), opening a **generic enquiry message** (e.g. `"Hi LinkNow, I'd like to enquire about your services"`). **WhatsApp is the ONLY enquiry channel.**
- **Web analytics** (e.g. Google Analytics) to track visits and behaviour.

**Explicitly OUT of scope (do not build):**
- ❌ No customer logins or accounts.
- ❌ No online payments or deposits.
- ❌ No booking calendar / availability system.
- ❌ No admin dashboard (content edits happen in code/files; we'll document how).
- ❌ **No enquiry / request-a-quote form, no destination email, no contact page.** Enquiries happen through WhatsApp only (floating button + in-page CTAs). _(Owner directive, ticket 004 — reverses the earlier form-to-email idea; do not reintroduce a form, email, or "Contact us"/"Request a quote" affordance.)_
- ❌ **No package catalogue, no package cards, no "from $X" pricing, no per-package pre-filled WhatsApp messages.** Pricing is per-enquiry only. _(This reverses an earlier idea — do not reintroduce it.)_

---

## 5. Sitemap / Pages

| Page | Purpose | Key content |
|------|---------|-------------|
| **Home** | First impression + funnel to enquiry | Hero (backdrop photo, tagline, WhatsApp CTA), services overview, **"Recent work"** teaser (links to `/services`), testimonials section, WhatsApp CTA |
| **Services** | Explain the full offering | Card grid: Custom backdrops · **Floral services** · **Corporate events**. The Custom Backdrops card links to the **Backdrops Portfolio** page (`/backdrops`); the Floral card links to the **Floral Showcase** page (`/flowers`, the gallery); the Corporate Events card links to the **Corporate Events** page (`/corporate`). |
| **Backdrops Portfolio** (`/backdrops`) | Show the range of custom backdrops | Responsive gallery of real backdrop builds (photo tiles only, no prices) + WhatsApp CTA. **Not a top-level nav tab** — reachable via the Services dropdown and the Custom Backdrops card. |
| **Floral Showcase** (`/flowers`) | The floral gallery | 42-item flower gallery (photo + name only, no prices). **Not a top-level nav tab** — reachable via the Services dropdown and the Floral Services card. |
| **Corporate Events** (`/corporate`) | Décor for companies & formal occasions | Intro + copy on the range (weddings — described, no photos yet — corporate backdrops, product launches, grand openings, D&D, roadshows, festive/seasonal décor), the two Avocaderia in-store photos, and a WhatsApp CTA (no prices). **Not a top-level nav tab** — reachable via the Services dropdown and the Corporate Events card. |
| **About** | Who we are | Company story, team, what makes us different |

_Note: **Portfolio and Testimonials are not top-level nav pages.** The top nav is **Home · Services · About**. Testimonials is a **homepage section** ("Client Testimonials", real 5-star Google reviews only — data-driven, placeholder until supplied), and the homepage keeps a **"Recent work"** teaser that links to `/services`. There is **no Contact/Enquiry page** and no top-level Flowers tab. Floral and Corporate Events live under Services — their pages (`/flowers`, `/corporate`) are reachable via the **Services nav dropdown** and the respective service cards, not top tabs. Enquiries are WhatsApp-only (floating button + in-page CTAs)._

---

## 6. Key Functionality Detail

### WhatsApp CTA
- **Number:** `+65 8809 0600`
- Persistent floating button on every page (bottom-right, thumb-reachable).
- Repeated CTA buttons within page sections.
- Opens WhatsApp with a **generic pre-filled** message: `"Hi LinkNow, I'd like to enquire about your services"`.
- Link format: `https://wa.me/6588090600?text=<url-encoded-message>`.
- **This is the only enquiry channel.** There is no enquiry/quote form and no destination email.

### Enquiry / Request-a-Quote Form — REMOVED (ticket 004)
- The email-based enquiry form is **out of scope**. Do not build a form, collect an email address, or add a "Contact us"/"Request a quote" affordance. All enquiries route through WhatsApp.

### Analytics
- Integrate **Google Analytics** (GA4). Leave the Measurement ID as a clearly-marked `TODO` env/config value.

---

## 7. Brand & Vibe

> **Direction (updated in Phase 3): MINIMALIST & LIGHT.** The owner wants a
> restrained, elegant site on a **light / off-white** canvas — **not** a dark,
> loud, or glowing one. The logo being black-and-gold does NOT mean the site is:
> like most premium e-comm brands, the site is light and airy, with gold used
> only as a sparing accent. Premium comes from restraint and whitespace, with the
> décor photography providing the colour. **No dark full-page backgrounds, no
> neon glows, no drop-shadows, no busy decoration.**

- **Feeling (keywords):** minimalist · light · airy · elegant · refined · premium. Understated, editorial luxury.
- **Identity:** warm off-white canvas + charcoal text + **soft rose/pink as a sparing accent**. Colour comes from the **logo and the photography**; the UI stays quiet.
  - **Brand name:** the logo's cursive script (shown via the logo image, not re-created in CSS).
  - **Supporting text:** refined **spaced capitals**, generous letter-spacing, modest sizes.
- **Design approach:** **Image-led + minimalist** — generous whitespace, thin hairline rose dividers, thin-outline or text buttons (no filled/glowing pills). The one solid button is a flat rose fill with white text. Let photography carry the visual weight.
- **Accent update (Owner override, ticket 002):** the accent shifted from **gold to a soft rose/pink** family so the brand reads softer and more floral while staying minimalist, light and accessible. The site canvas stays off-white; rose is used sparingly.
- **Logo (Owner override, ticket 002):** gold interlocking-links mark above a gold script "LinkNow" and spaced-caps "EVENTS CO."
  - **File in use:** the **full original** `public/brand/logo.jpg` (gold mark on its black background) is used on the light UI (header/nav + footer), presented as a **small, cleanly-contained rounded mark** so the black block reads as a tidy logo, not a dark band across the UI. **This deliberately overrides the earlier rule that reserved `logo.jpg` for dark surfaces and used `logo-transparent.png` on the light UI.**
  - **Alternate file:** `public/brand/logo-transparent.png` (transparent background) remains in the repo but is not currently wired into the UI.
  - **Placement:** header/nav and footer.
- **Palette (implemented in `src/styles.scss` — owner-confirmed, ticket 002):**
  - Background: `#faf6f3` (warm off-white); surface `#ffffff`
  - Rose accent: `#a63f57` (AA on off-white bg and with white text); softer `#c98a99`
  - Blush section tint: `#ffdfe3` (accent surfaces ONLY — never body-text fill or button/text colour)
  - Text: `#22201c` (warm charcoal); muted text `#7c766b`
  - Rose hairline: `rgba(166, 63, 87, 0.35)`; neutral border `rgba(34, 32, 28, 0.14)`

---

## 8. Contact & Social (canonical values)

- **WhatsApp:** `+65 8809 0600` → `https://wa.me/6588090600` (**only enquiry channel**)
- ~~Enquiry email (form destination): `novestelatham@gmail.com`~~ — removed with the form (ticket 004); the site has no email affordance.
- **Instagram:** https://www.instagram.com/linknowsg/
- **TikTok:** https://www.tiktok.com/@linknowsg
- **Region served:** Singapore only

---

## 9. Domain & Launch

- **Domain:** ⚠️ **TODO — not yet owned.** Product will sort separately. Do not hard-code a production domain; keep it configurable.
- **Launch timeline:** None fixed.

---

## 10. Non-Functional Requirements

- **Mobile-first, responsive**, excellent on phones.
- **Fast** — image-heavy, so optimise images (lazy-load, modern formats).
- **Accessible** — sufficient contrast for gold-on-black; alt text on all décor images.
- **SEO** — local Singapore SEO; meta tags; semantic HTML; sensible titles/descriptions per page.
- **Maintainable** — content (services text, testimonials, portfolio images) should be easy to edit in files without touching complex code.

---

## 11. Tech Direction (decided in Phase 2)

- **Framework:** **Angular 20** (chosen by the product owner in Phase 2). Pinned to v20 for Node 22 compatibility.
  - **SSR / prerendering is enabled** (`@angular/ssr`) to mitigate Angular's default weaknesses for this use case — it delivers ready-made HTML per page, which protects mobile load speed and Google/SEO (the brief's top priorities). Keep prerendering on for content pages.
  - _Note: This reverses the earlier Astro recommendation. Astro would have been lighter for a pure marketing site, but Angular was selected. Build it well — lean on SSR/prerendering, keep bundles small, and don't add app complexity the brief doesn't call for._
- **Styling:** SCSS with CSS custom properties for the dark/gold theme (see `src/styles.scss`).
- **Routing:** Angular Router (`src/app/app.routes.ts`) — one route per page from §5.
- **Form handling:** n/a — no enquiry form (removed in ticket 004). Enquiries are WhatsApp-only. No backend/database.
- **Hosting:** Netlify or Vercel free tier, connected to git for auto-publish (Phase 8).

---

## 12. Open TODOs (tracked for later phases)

- [x] Add logo file to the repo → `public/brand/logo.jpg`.
- [ ] Obtain and configure domain.
- [ ] Add Google Analytics GA4 Measurement ID.
- [ ] Supply real portfolio photos.
- [ ] Supply About-page copy.
- [ ] Supply real **5-star Google reviews** for the Testimonials source (`src/app/shared/testimonials.ts`) — currently an intentional placeholder/empty state (no fabricated reviews).
