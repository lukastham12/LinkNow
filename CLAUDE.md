# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing / showcase website for **Linknow Events Co.** (LinkNow Pte Ltd), a Singapore events-décor company (custom backdrops, floral services, setup-only labour). It is a **content marketing site, not a web app**: no logins, accounts, payments, database, or admin dashboard. Conversion happens via **WhatsApp** and an **email-based enquiry form**.

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

There is **no configured linter** yet (no ESLint). Formatting is handled by **Prettier** (config lives in `package.json`: `printWidth: 100`, `singleQuote: true`, Angular parser for `.html`). If a lint step is added later, document it here.

## Architecture

**Angular 20 (standalone components, no NgModules) with SSR + prerendering.**

- **Rendering:** Server-side rendering is enabled via `@angular/ssr`. `src/app/app.routes.server.ts` sets `RenderMode.Prerender` for all routes (`path: '**'`), so every page is **prerendered to static HTML at build time**. This is deliberate — it protects mobile load speed and SEO (the brief's top priorities). Keep content pages prerendered; do not switch a page to client-only rendering without a reason.
- **Entry points:** `src/main.ts` (browser) and `src/main.server.ts` (server) bootstrap the same root `App` component. `src/server.ts` is the Express server used for SSR in production.
- **App config:** `src/app/app.config.ts` (browser providers — router, hydration with event replay) and `src/app/app.config.server.ts` (server providers) are merged. Register app-wide providers here.
- **Routing:** `src/app/app.routes.ts` is the single source of truth for page URLs. Each page from `BRIEF.md` §5 (Home, Services, Portfolio, Testimonials, About, Contact) is one route. The root `App` component (`src/app/app.ts` / `app.html`) is the shell that hosts `<router-outlet />` — shared header/nav and footer belong here so every page inherits them.
- **Static assets:** anything in `public/` is served at the site root (e.g. `public/brand/logo.png` → `/brand/logo.png`). Brand images live in `public/brand/`.
- **Styling:** global theme in `src/styles.scss` via CSS custom properties (`--color-bg`, `--color-gold`, `--color-gold-dim`, `--color-text`). Component styles are scoped `.scss` files. Use the CSS variables rather than hard-coding brand colours. Per-component style budget is 4kB (warn) / 8kB (error); initial bundle budget is 500kB (warn) / 1MB (error) — keep components lean.

## Canonical values (do not hard-code duplicates — reuse these)

- **WhatsApp CTA:** `https://wa.me/6588090600` with a **generic** enquiry message (`"Hi LinkNow, I'd like to enquire about your services"`). There are **no per-package messages** — packages/pricing were removed from scope.
- **Enquiry form destination email:** `novestelatham@gmail.com` (form posts to email via a static handler; no backend).
- **Instagram:** https://www.instagram.com/linknowsg/ · **TikTok:** https://www.tiktok.com/@linknowsg
- **Region:** Singapore only (reflect in copy + local SEO).
- **Production domain:** not yet owned — keep the canonical/base URL configurable (in `src/index.html` meta and any SEO/sitemap setup). Do not hard-code a production domain.

## Brand & tone rules (from BRIEF.md §7)

- **Look:** **minimalist** black + muted gold. Restrained, elegant, premium — colour comes from the logo and photography, not from the UI. **No heavy neon glows, drop-shadows, or busy decoration** (owner directive, Phase 3). Pure-black background where the logo sits so it blends with no visible box. Palette lives in `src/styles.scss` (gold `#d9b25a`, not a bright neon).
- **Type:** cursive **script** feel for the brand name; refined **spaced capitals** for supporting/section labels.
- **Voice:** warm, high-end, celebratory; concise. Speaks to both retail (birthdays, weddings, personal celebrations) and corporate clients.
- **Design priority:** **mobile-first** and **image-led** — the décor photography carries the design. Optimise images, lazy-load, provide alt text.
- **Accessibility:** maintain sufficient contrast for gold-on-black; alt text on all décor images.
- **Logo:** `public/brand/logo.jpg` (gold-neon mark on black). Served at `/brand/logo.jpg`. Used in header/nav and footer — wire it up in Phase 6.

## Working agreement for all agents

- **Keep changes small and reviewable.** Prefer focused, single-purpose commits over large sweeping ones. Build page by page (see `BRIEF.md` §5), not all at once.
- **Do not expand scope.** No logins, payments, database, booking calendar, admin dashboard, or package catalogue/pricing — these are explicitly out of scope in `BRIEF.md` §4. Flag, don't silently add.
- **Honour the TODOs** in `BRIEF.md` §12 (logo file, domain, GA4 ID, real photos/copy) rather than inventing values.
