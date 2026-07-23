# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing / showcase website for **LinkNow Events Co.** (LinkNow Pte Ltd), a Singapore events-décor company (custom backdrops, floral services, setup-only labour). It is a **content marketing site, not a web app**: no logins, accounts, payments, database, or admin dashboard. Conversion happens via **WhatsApp** — the only enquiry channel (no form, no email, no contact page).

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

- **WhatsApp CTA:** `https://wa.me/6588090600` with a **generic** enquiry message (`"Hi LinkNow, I'd like to enquire about your services"`). There are **no per-package messages** — packages/pricing were removed from scope. **WhatsApp is the ONLY enquiry channel** (ticket 004): there is no enquiry form, no destination email, and no Contact page. Do not add a form, `mailto:`, or "Contact us"/"Request a quote" button anywhere.
- **Floral lives under Services** (ticket 004): there is no Flowers tab. The floral gallery is the reusable `app-floral-showcase` component (`src/app/components/floral-showcase/`, catalogue in `catalogue.ts`) rendered inside the Floral Services section of `/services`. `/flowers` redirects to `/services`.
- **Testimonials:** data-driven from `src/app/shared/testimonials.ts` (`TESTIMONIALS: {author, quote, rating:5}[]`) — **real 5-star Google reviews only**, kept empty with a placeholder state until the owner supplies them. Never fabricate reviews.
- **Instagram:** https://www.instagram.com/linknowsg/ · **TikTok:** https://www.tiktok.com/@linknowsg
- **Region:** Singapore only (reflect in copy + local SEO).
- **Production domain:** not yet owned — keep the canonical/base URL configurable (in `src/index.html` meta and any SEO/sitemap setup). Do not hard-code a production domain.

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
