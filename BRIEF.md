# Product Brief — LinkNow Events Co. Website

_Last updated: 2026-07-18 · Owner: Product (lukastham12@gmail.com) · Status: Approved for build_

---

## 1. Summary (the one-paragraph version)

A **mobile-first marketing & showcase website** for **LinkNow Pte Ltd** (brand: **Linknow Events Co.**), a Singapore-based events décor company. The site's job is to make visitors feel the quality of our work through imagery, explain our services, build trust with portfolio + testimonials, and drive them to **enquire via WhatsApp or a quote form**. There is **no online catalogue, no pricing, no logins, and no payments** — pricing is handled per enquiry. This is a marketing site, not a web app.

---

## 2. Company

- **Legal name:** LinkNow Pte Ltd
- **Brand name:** Linknow Events Co.
- **Location / market:** Singapore only (reflect in copy and local SEO)
- **What we do:** Design and build **custom backdrops** for celebrations and formal occasions (birthdays, weddings, corporate events) and provide **floral services**. We also offer **setup-only labour** — if the client already has their materials, we supply the manpower and skill to execute their vision.

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
- **WhatsApp CTA** — persistent and obvious (floating button + repeated per section), opening a **generic enquiry message** (e.g. `"Hi LinkNow, I'd like to enquire about your services"`).
- **Enquiry / request-a-quote form** — submissions go **straight to email** (no database, no login).
- **Web analytics** (e.g. Google Analytics) to track visits and behaviour.

**Explicitly OUT of scope (do not build):**
- ❌ No customer logins or accounts.
- ❌ No online payments or deposits.
- ❌ No booking calendar / availability system.
- ❌ No admin dashboard (content edits happen in code/files; we'll document how).
- ❌ **No package catalogue, no package cards, no "from $X" pricing, no per-package pre-filled WhatsApp messages.** Pricing is per-enquiry only. _(This reverses an earlier idea — do not reintroduce it.)_

---

## 5. Sitemap / Pages

| Page | Purpose | Key content |
|------|---------|-------------|
| **Home** | First impression + funnel to enquiry | Hero (logo, tagline, WhatsApp CTA), services overview, portfolio teaser, testimonials teaser, enquiry CTA |
| **Services** | Explain the full offering | Custom backdrops · Floral services · Setup-only labour (materials supplied by client) |
| **Portfolio** | Proof of work | Gallery of décor photos; embed/link TikTok content; past clients |
| **Testimonials** | Social proof | Customer reviews |
| **About** | Who we are | Company story, team, what makes us different |
| **Contact / Enquiry** | Convert | Enquiry form, WhatsApp, Instagram/TikTok, contact details |

---

## 6. Key Functionality Detail

### WhatsApp CTA
- **Number:** `+65 8809 0600`
- Persistent floating button on every page (bottom-right, thumb-reachable).
- Repeated CTA buttons within page sections.
- Opens WhatsApp with a **generic pre-filled** message: `"Hi LinkNow, I'd like to enquire about your services"`.
- Link format: `https://wa.me/6588090600?text=<url-encoded-message>`.

### Enquiry / Request-a-Quote Form
- **Submissions go to email:** `novestelatham@gmail.com`
- **No database, no login.** Use a static-site-friendly form handler (e.g. Netlify Forms, Formspree, or Web3Forms) so submissions arrive as email.
- **Fields:**
  - Name
  - Contact (phone / email)
  - Event type (birthday / wedding / corporate / other)
  - Event date
  - Service of interest (backdrops / floral / setup-only labour)
  - Message
- Include basic spam protection (honeypot and/or handler-provided captcha).

### Analytics
- Integrate **Google Analytics** (GA4). Leave the Measurement ID as a clearly-marked `TODO` env/config value.

---

## 7. Brand & Vibe

- **Feeling (keywords):** Luxe · celebratory · premium · glamorous · elegant. High-end event styling — **not corporate, not minimalist**.
- **Identity:** **Gold neon on a black / near-black background.**
  - **Brand name:** cursive **script** feel (matches the logo's "Linknow").
  - **Supporting text:** refined, **spaced capitals** (e.g. `EVENTS CO.`, section labels with letter-spacing).
- **Design approach:** **Image-led** — the décor photography carries the design; typography and gold accents frame it. Generous dark space, glowing gold highlights.
- **Logo:** `1784383427678_image.png` — gold neon interlocking-links mark above a gold script "Linknow" and spaced-caps "EVENTS CO." on black.
  - **Placement:** header/nav and footer.
  - **⚠️ TODO:** logo file not yet in the repo. Place it at `public/logo.png` (or `src/assets/logo.png`) when added.
- **Suggested palette (starting point, refine in build):**
  - Background: `#0A0A0A` / near-black
  - Gold: `~#F5C542` / `#E8B923` with a lighter glow highlight
  - Text on dark: off-white `#F5F0E6`

---

## 8. Contact & Social (canonical values)

- **WhatsApp:** `+65 8809 0600` → `https://wa.me/6588090600`
- **Enquiry email (form destination):** `novestelatham@gmail.com`
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
- **Form handling:** static-friendly handler (Formspree / Web3Forms) posting to email; chosen with the deploy target in Phase 8. No backend/database.
- **Hosting:** Netlify or Vercel free tier, connected to git for auto-publish (Phase 8).

---

## 12. Open TODOs (tracked for later phases)

- [ ] Add logo file `1784383427678_image.png` to the repo.
- [ ] Obtain and configure domain.
- [ ] Add Google Analytics GA4 Measurement ID.
- [ ] Supply real portfolio photos.
- [ ] Supply About-page copy and testimonials.
- [ ] Confirm form handler choice at deploy time.
