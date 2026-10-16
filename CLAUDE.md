# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing / showcase website for **LinkNow Pte Ltd**, a Singapore events-décor company (custom backdrops, floral services, setup-only labour). **"LinkNow Events Co." is retired as a trading name (owner directive, 13 Oct 2026) — do not reintroduce it anywhere on the site** (copy, alt text, meta tags, JSON-LD, comments); use **LinkNow** or **LinkNow Pte Ltd**. It is a **content marketing site, not a web app**: no logins, accounts, payments, or admin dashboard. Conversion happens via **WhatsApp or email** (owner decision, 12 Oct 2026 — added a second, more formal channel for corporate/admin/HR buyers who can't buy through a personal WhatsApp chat). The `/contact` form submits directly to Web3Forms (a third-party form-delivery API) — see Canonical values below.

The authoritative product spec is **`BRIEF.md`** — read it before building or changing pages. If code and `BRIEF.md` disagree, `BRIEF.md` wins (or flag the conflict).

## Commands

```bash
npm start          # dev server with live reload → http://localhost:4200
npm run build      # production build (SSR + prerender) → dist/linknow/
npm run watch      # rebuild on change (development config)
npm test           # unit tests via Karma + Jasmine (opens a Chrome runner)
npm run serve:ssr:linknow   # run the built SSR server from dist/

# Single test file / focused run:
ng test --include='src/app/app.spec.ts'
# Or scope in code with Jasmine fdescribe(...) / fit(...) (remove before commit).

# Headless test run (CI / no display):
ng test --watch=false
# Uses the ChromeHeadlessNoSandbox launcher from karma.conf.js. In containers
# where Chrome isn't on PATH, point CHROME_BIN at a Chrome/Chromium binary, e.g.:
#   CHROME_BIN=/path/to/chrome ng test --watch=false

# Scaffold new building blocks (keeps structure consistent):
ng generate component pages/services   # → src/app/pages/services/
ng generate component components/site-header
```

```bash
npm run lint        # ESLint (angular-eslint) over the project
```

Formatting is handled by **Prettier** (config in `package.json`: `printWidth: 100`, `singleQuote: true`, Angular parser for `.html`). Linting is **ESLint** via `angular-eslint` (`eslint.config.js`).

## Automated quality gates (hooks)

This project has **deterministic hooks** wired up in `.claude/settings.json` (see `.claude/hooks/README.md`) that run automatically:
- **Before any Bash command** — destructive commands are blocked/asked for approval.
- **After editing `.ts`/`.html`** — ESLint runs and blocks on errors.
- **After a dependency change** (`package.json` edit or `npm install`) — `npm audit` runs and blocks on High/Critical vulnerabilities.
- **Before an agent finishes** (Stop) — if `src/**` changed, lint + build + tests must pass.

Practical upshot for any agent: keep the code lint-clean, don't introduce vulnerable deps, and make sure `npm run build` and `npm test` pass before you consider a task done — the hooks enforce this regardless.

## Architecture

**Angular 20 (standalone components, no NgModules) with SSR + prerendering.**

- **Rendering:** Server-side rendering is enabled via `@angular/ssr`. `src/app/app.routes.server.ts` sets `RenderMode.Prerender` for all routes (`path: '**'`), so every page is **prerendered to static HTML at build time**. This is deliberate — it protects mobile load speed and SEO (the brief's top priorities). Keep content pages prerendered; do not switch a page to client-only rendering without a reason.
- **Entry points:** `src/main.ts` (browser) and `src/main.server.ts` (server) bootstrap the same root `App` component. `src/server.ts` is the Express server used for SSR in production.
- **App config:** `src/app/app.config.ts` (browser providers — router, hydration with event replay) and `src/app/app.config.server.ts` (server providers) are merged. Register app-wide providers here.
- **Routing:** `src/app/app.routes.ts` is the single source of truth for page URLs. Each page from `BRIEF.md` §5 (Home, Services, Portfolio, Testimonials, About, Contact) is one route. The root `App` component (`src/app/app.ts` / `app.html`) is the shell that hosts `<router-outlet />` — shared header/nav and footer belong here so every page inherits them.
- **Static assets:** anything in `public/` is served at the site root (e.g. `public/brand/logo.png` → `/brand/logo.png`). Brand images live in `public/brand/`.
- **Styling:** global theme in `src/styles.scss` via CSS custom properties (`--color-bg`, `--color-gold`, `--color-gold-dim`, `--color-text`). Component styles are scoped `.scss` files. Use the CSS variables rather than hard-coding brand colours. Per-component style budget is 4kB (warn) / 8kB (error); initial bundle budget is 500kB (warn) / 1MB (error) — keep components lean.

## Canonical values (do not hard-code duplicates — reuse these)

- **WhatsApp CTA:** `https://wa.me/6588090600`. Every generic message (`WHATSAPP_MESSAGE`/`WHATSAPP_EVENT_MESSAGE`/`pageWhatsappLink()`, all in `shared/contact.ts`) appends a fill-in-the-blank template — `Event: / Date: / Venue: / Theme: / Budget: ` — after the opening line (UX review, 16 Oct 2026: a bare "I'd like to enquire" meant Novi had to chase those details over 5-6 follow-up messages, giving a shopping visitor time to book a competitor first). Most pages use `pageWhatsappLink(pageLabel)` so the message also names the page the visitor came from; a few shared/generic spots (footer, floating WhatsApp button, homepage hero) keep the flatter `WHATSAPP_HREF`/`WHATSAPP_EVENT_HREF`. There are still **no per-package messages** — packages/pricing stay out of scope. `/corporate` (the "For Businesses" page) and its case-study pages are the one exception: they use `businessWhatsappLink(pageLabel)` instead, with a different template — `Company: / Location/outlet: / Dates: / What we need: ` — and opening line "…I'd like a quote" rather than "…enquire about an event" (owner request, 23 Oct 2026, when the page was reworded to speak to businesses rather than "events").
- **Email CTA / `/contact` form:** `novestelatham@linknow-singapore.com`, via `WEB3FORMS_ENDPOINT`/`WEB3FORMS_ACCESS_KEY` (`shared/contact.ts`). The `/contact` page's form (Name\*, Phone/WhatsApp\*, Email, Event Type\*, Event Date, Venue, Budget, Message) POSTs directly to the Web3Forms API (`https://api.web3forms.com/submit`) via `HttpClient` — it does **not** open the visitor's mail app. Email is optional (owner request, 23 Oct 2026, added after Phone). Event Type options are `Birthday`, `100 Days / Naming Ceremony` (added 23 Oct 2026, right after Birthday), `Wedding & ROM`, `Baby shower / gender reveal`, `Business / corporate` (renamed from "Corporate event" 23 Oct 2026, matching the For Businesses page rename), `Other`. Submit-time validation: Name/Phone/Event Type are required (inline error, red border, scroll+focus the first invalid field, `aria-invalid`/`aria-describedby`); Phone is checked against a Singapore number pattern (`SG_PHONE_PATTERN` in `contact.ts` — optional `+65`, then 8 digits starting 3/6/8/9, spaces allowed). When Event Type is "Business / corporate", a hint appears under the field nudging the visitor to mention in their message if they'd like LinkNow's business profile, portfolio and rate card sent over — business buyers usually ask for those anyway. `WEB3FORMS_ACCESS_KEY` is a Web3Forms *public* access key (by design safe in client code — it only allows submitting to the verified email, carries no other privilege), not a secret; don't move it to an env var. `provideHttpClient(withFetch())` is registered in `app.config.ts` for this. The homepage hero's "Contact Us" button and the footer's "Email us" button both route to `/contact#form-heading` (fragment scrolls straight to the form). The intro line on `/contact` also shows `EMAIL_ADDRESS` as a plain `mailto:` fallback — for visitors who'd rather write their own email than use the form. `/corporate` also carries a secondary `mailto:` "Email us" button below its main WhatsApp CTA (owner request, 23 Oct 2026) — these are now the only two `mailto:` links on the site (previously `/contact` was the only one; don't scatter more beyond these two without a reason). A separate "need a faster reply?" section on `/contact` points urgent enquiries to WhatsApp instead.
- **Contact page:** `/contact` (top-level nav item) — the message form, an urgency-driven WhatsApp section, and the business details line (UEN + "Singapore"). Do not add a real street address, opening hours, or "studio by appointment" wording — the owner has said not to publish any of these (13 Oct 2026: "studio by appointment" was explicitly removed as not making sense on a contact page).
- **UEN:** `202608341G` (`shared/contact.ts` → `UEN`), shown in the site footer, `/contact`, and the JSON-LD `Organization.taxID` (`shared/seo.ts`) — footer/legal-page placement only, matching how Singapore businesses actually display it (small print next to the registered name, never a hero/headline element). Do not add it to the homepage hero or any other page's headline area; do not hard-code it elsewhere either.
- **Floral lives under Services:** there is no Flowers *tab* in the top nav. `/flowers` is the Wedding & ROM Styling page (`pages/flowers/`) — floral styling as the lead specialty, plus backdrops/balloon accents/table styling as plain capability cards (same visual pattern as the homepage's "Other Services We Provide") — reachable via the Services dropdown ("Weddings & ROM") and the matching card on `/services`, not a top-level nav tab. (There is no `floral-showcase` component or flower catalogue any more — that was the page's old architecture before the Wedding & ROM redesign; don't recreate it from stale docs/comments.)
- **Testimonials:** data-driven from `src/app/shared/testimonials.ts` (`TESTIMONIALS: {quote, rating:5}[]` — reviewer names removed for privacy) — **real 5-star Google reviews only**, currently populated with owner-supplied reviews shown as "Verified Google review" (never with a name). If the list is empty the page shows a placeholder state. Never fabricate reviews. Shown via the shared `app-reviews-carousel` component on both the homepage and `/backdrops` (UX review, 16 Oct 2026 — reviews previously only lived on the homepage, not where a visitor is actually deciding); add it to other decision-stage pages the same way rather than duplicating the markup.
- **FAQ:** a shared `FAQS` array in `src/app/shared/faq.ts` (not duplicated per page) is shown identically on `/backdrops` (below the gallery) and on the homepage (above "Planning something?", added 23 Oct 2026). Covers lead time, venue types, what's included, deposit/cancellation and rain backup. Answers stay deliberately general — no deposit percentage or cancellation window is named, since neither is confirmed business policy; each routes the visitor to WhatsApp instead. Lead time ("How far ahead do we need to book?") is intentionally the most open of the answers: there is no preferred window at all, book anytime including last-minute (owner request, 23 Oct 2026 — an earlier version nudged toward "2–3 weeks ahead is ideal", which the owner corrected). Don't reintroduce a suggested lead time without the owner asking for it.
- **For Businesses page** (`pages/corporate/corporate.ts`/`.html`, route `/corporate` — URL kept unchanged): renamed from "Corporate Events" to "For Businesses" site-wide on 23 Oct 2026, to speak to businesses/stores/brands rather than "events" — this covers the Services dropdown item and nav label (`shared/contact.ts` → `NAV_LINKS`), the home/`/services` card title (`shared/featured-services.ts`), the page's eyebrow/H1/subtitle, its WhatsApp/email buttons ("Get a quote for your business"), the "What we do for businesses" section title, and the closing line ("Tell us what you need — we'll send a proposal and mockup.") — on both `/corporate` and its case-study pages. Case-study titles and the `eventTypes` occasion card descriptions were deliberately left as-is. "Weddings" was removed from `eventTypes` 23 Oct 2026 — wedding styling belongs on `/flowers`, and the "(New wedding photography coming soon.)" note was stale. "Shopping mall activations & festive displays" was added the same day. The Avocadoria case study (`shared/corporate-case-studies.ts`) now notes it was a shopping-mall storefront.
- **Small uppercase section labels** (`.eyebrow`, `--font-size-label` in `styles.scss`): 13px as of 23 Oct 2026 (raised from 12px on 16 Oct, from ~10.9px before that) — each page's `.eyebrow` rule references the token, don't hard-code a size locally.
- **Instagram:** https://www.instagram.com/linknowsg/ · **TikTok:** https://www.tiktok.com/@linknowsg
- **Region:** Singapore only (reflect in copy + local SEO).
- **Production domain:** not yet owned — keep the canonical/base URL configurable (in `src/index.html` meta and any SEO/sitemap setup). Do not hard-code a production domain.
- **Homepage hero:** exactly 2 action buttons — "Enquire on WhatsApp" (solid) and "See what we do" (ghost, anchors to `#occasions`). A third "Contact Us" button was tried and removed (owner request, 13 Oct 2026 — 3 buttons looked crowded on mobile and desktop); don't re-add it. The eyebrow above the H1 is a plain descriptive kicker ("Event & Corporate Decor · Singapore") like every other page's eyebrow — **do not put the company name or UEN in the hero**: that was tried twice (13 Oct 2026) and didn't work at any size/weight, because it competes with the H1 as a second headline. Real-world/Singapore convention (and the only placement that reads right) is footer + `/contact` only, in small print next to the registered name — see the UEN bullet below.
- **Homepage hero image:** rotates between kids'-party/birthday photos only (`HERO_IMAGES` in `pages/home/home.ts`), picked client-side via `afterNextRender` after hydration so SSR/prerender always ships the first photo for a stable first paint, on every screen size. Previously also rotated in a corporate photo and a fine-dining/floral photo (12–16 Oct 2026, to signal that range to corporate/wedding buyers) — removed 23 Oct 2026 (owner request): the rotation is kids'-party/birthday only now, picked with a plain uniform `pickHeroImage()` (no weighting — the earlier weighting existed only to balance those other occasions, which no longer apply). Add new entries to `HERO_IMAGES` rather than hard-coding a second hero image elsewhere, and keep every entry a kids'-party/birthday photo.
- **Backdrops gallery:** `/backdrops` photos carry a `category` and `caption` (`pages/backdrops/backdrops.data.ts`) drawn only from what's legible in the photo's own signage — never invent a client name, venue or date for a caption. Categories are `Birthday`, `Grown-Up Celebrations`, `100 Days & Naming`, `Baby Shower & Gender Reveal`, `Other`. `Grown-Up Celebrations` (added 23 Oct 2026) holds 21st/28th/30th/55th-birthday and other adult-party photos, split out of `Birthday` so that row stays kids/teens. `backdrop-16` is intentionally excluded from `PHOTOS`/`ORDER` — a duplicate upload of the same "Our Little Hunny" gender-reveal photo as `backdrop-25`. Shown as one horizontally-scrolling carousel section per category (`BACKDROP_GROUPS`), not a single grid behind filter-pill buttons (owner request, 13 Oct 2026 — pills over one grid didn't read well on mobile or desktop). Each carousel has prev/next arrows on tablet/desktop (hidden on mobile, where touch swipe works): an arrow is removed from layout entirely (`display: none`) rather than shown faded when disabled at the start/end of a row (owner request, 23 Oct 2026 — a faded arrow over the photo read as broken, not "no more photos this way"). Below the gallery, the page also shows the shared FAQ — see the FAQ bullet above.

## Brand & tone rules (from BRIEF.md §7)

- **Look:** **minimalist & LIGHT.** Warm off-white canvas, charcoal text, **soft rose/pink** as a *sparing* accent (owner override, ticket 002 — replaces the earlier gold accent). Restrained, airy, premium — colour comes from the logo and photography, not the UI. The black-and-gold logo does NOT make the site dark. **No dark full-page backgrounds, no neon glows, no drop-shadows, no busy decoration** (owner directive, Phase 3). Palette lives in `src/styles.scss` (bg `#faf6f3`, rose accent `#a63f57`, softer rose `#c98a99`, blush tint `#ffdfe3`, text `#22201c`). Use `--color-blush` only as a section tint/accent surface — never as a text or button-fill colour.
- **Logo on light UI (owner override, ticket 002):** use the **full original** `public/brand/logo.jpg` (gold mark on black background), presented as a small, cleanly-contained rounded mark (so the black block reads as a tidy logo, not a dark band). This **overrides** the earlier rule that used `logo-transparent.png` on light UI / reserved `logo.jpg` for dark surfaces. `logo-transparent.png` remains in the repo but is not currently wired in.
- **Type:** cursive **script** feel for the brand name; refined **spaced capitals** for supporting/section labels.
- **Voice:** warm, high-end, celebratory; concise. Speaks to both retail (birthdays, weddings, personal celebrations) and corporate clients.
- **Design priority:** **mobile-first** and **image-led** — the décor photography carries the design. Optimise images, lazy-load, provide alt text.
- **Accessibility:** maintain sufficient contrast for gold-on-black; alt text on all décor images.
- **Logo files:** `public/brand/logo.jpg` (original, gold mark on black — **now used on the light UI** as a small contained rounded mark, ticket 002 owner override) and `public/brand/logo-transparent.png` (transparent background — kept in repo, not currently wired in). Used in header/nav and footer.

## Agent team & delivery pipeline

Specialist agents live in `.claude/agents/`. The intended flow for building a page/feature:

1. **product-manager** — confirms the business requirement against `BRIEF.md` (GO / NO-GO / needs-clarification). Read-only.
2. **business-analyst** — turns a GO into a ticket in `tickets/NNN-slug.md` with testable acceptance criteria.
3. **builder** — implements the ticket in small slices; verifies build + lint + tests.
4. **reviewer** — critiques the result against the ticket + `CLAUDE.md` (read-only; must find problems, not rubber-stamp).
5. **security-auditor** — checks vulnerabilities/secrets/data handling, esp. anything with user input (read-only).

Builder is the only agent that writes application code. PM/BA/reviewer/security are read-only w.r.t. code (BA writes tickets only). Deterministic hooks (below/`.claude/hooks/`) back all of this up regardless of which agent is working.

## Working agreement for all agents

- **Keep changes small and reviewable.** Prefer focused, single-purpose commits over large sweeping ones. Build page by page (see `BRIEF.md` §5), not all at once.
- **Do not expand scope.** No logins, payments, database, booking calendar, admin dashboard, or package catalogue/pricing — these are explicitly out of scope in `BRIEF.md` §4. Flag, don't silently add.
- **Honour the TODOs** in `BRIEF.md` §12 (logo file, domain, GA4 ID, real photos/copy) rather than inventing values.
- **About page names Novi Tham** (`pages/about/about.ts`/`.html`) as the person running LinkNow — sourced from her name already appearing, verbatim, in real reviews in `shared/testimonials.ts` (surfacing existing public info, not inventing a bio). No founding year, event counts, awards, or photo: none of that is verified, so none of it is claimed, and a real photo of Novi should replace the text-only mention once the owner supplies one — don't add one yourself.
