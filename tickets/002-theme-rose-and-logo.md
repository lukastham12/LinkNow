# 002 — Off-white + soft-pink theme and full original logo

**Status:** Ready for build
**Type:** Feature (theme tokens + shared components + docs)
**Relates to:** BRIEF.md §7 (brand/palette/logo); PM verdict: GO (owner-confirmed theme + logo change)

## User story
As the site owner, I want the site's accent to shift from gold to a soft-pink/rose family
and the full original logo used in the header/footer, so that the brand reads softer and
more floral while staying minimalist, light, and accessible.

## Context
The site currently ships a gold accent (`--color-gold*`) and expects the transparent logo
on light UI (ticket 001). The owner has confirmed a new direction: a rose/pink accent on the
same off-white canvas, and use of the **full original** `logo.jpg` (gold mark on its black
background) presented as a small contained mark. This is a **deliberate owner override** of
the BRIEF.md §7 logo rule and the CLAUDE.md logo guidance — both docs must be updated so the
codebase and spec stay in agreement (BRIEF.md is authoritative). This ticket is theme-wide and
must land before, or alongside, ticket 003 so the new page inherits the rose accent.

## Scope (in)
- In `src/styles.scss`, define the new palette as CSS custom properties on `:root`:
  - `--color-bg: #faf6f3` (warm off-white)
  - `--color-surface: #ffffff`
  - `--color-blush: #ffdfe3` (soft-pink section tint — accent surfaces ONLY, never text/button fill)
  - `--color-rose: #a63f57` (accent for buttons/links/hairlines; AA on off-white bg and with white text)
  - `--color-rose-soft: #c98a99`
  - `--color-text: #22201c`
  - `--color-text-muted: #7c766b`
  - `--color-hairline: rgba(166, 63, 87, 0.35)`
  - `--color-border: rgba(34, 32, 28, 0.14)`
  - Keep a `--color-gold` variable **only if** the logo presentation still needs it; otherwise
    remove the gold tokens so nothing references them.
- Update every component currently using `--color-gold*` to the rose accent:
  - `src/app/pages/home/home.scss` (hero, buttons, eyebrows)
  - `src/app/components/site-header/site-header.scss` (active/hover nav link)
  - `src/app/components/site-footer/site-footer.scss` (CTA + links)
  - The **solid primary button** uses `--color-rose` with **white** text; outline/text
    buttons use `--color-rose` for border/text. No glowing pills, no heavy shadows.
- **Logo:** replace the header (and footer) logo source with the full original
  `public/brand/logo.jpg` (gold mark on black background). Present it **cleanly contained**
  — e.g. a small logo with modest rounded corners — so the black block reads as a tidy mark,
  not a dark band across the UI. Keep the page background off-white and light.
- **Docs:** update BRIEF.md §7 (logo direction + palette) and CLAUDE.md (Brand & tone rules /
  Canonical values) to reflect the rose accent and the `logo.jpg`-on-light decision, noting it
  is an owner override of the earlier transparent-logo rule.

## Out of scope
- No new pages, sections, or copy changes (the Flowers page is ticket 003).
- No dark full-page backgrounds, no neon glow, no drop-shadows, no busy decoration.
- Do not introduce package/pricing UI or any other out-of-scope items (BRIEF.md §4).
- No layout restructuring of header/footer beyond swapping the logo source + accent colours.

## Acceptance criteria
- [ ] `src/styles.scss` defines exactly the palette tokens listed above as CSS custom properties.
- [ ] No component references a removed `--color-gold*` token; every former gold accent now
      uses a rose token (`grep -r "--color-gold" src/app` returns nothing, or only an
      intentionally-kept `--color-gold` used solely for the logo, documented in a comment).
- [ ] Components use the CSS variables — **no hard-coded hex** for the rose/blush accents.
- [ ] The solid primary button is `--color-rose` with white text; links/active-nav/hairlines
      use the rose accent.
- [ ] `--color-blush (#ffdfe3)` is used only as a section tint / accent surface, never as a
      fill behind body text or as a button/text colour (too light for AA).
- [ ] Header and footer display the full original `public/brand/logo.jpg`, contained cleanly
      (small, rounded) — no dark band spanning the header/footer width.
- [ ] No dark full-page backgrounds; the page canvas stays `--color-bg` off-white.
- [ ] Contrast AA: charcoal text on off-white, and white text on `--color-rose`, both ≥ 4.5:1;
      rose links/borders legible on the off-white bg.
- [ ] Mobile-first: header/footer hold from 390px to desktop; no horizontal overflow.
- [ ] BRIEF.md §7 and CLAUDE.md updated to state the rose palette and the `logo.jpg`-on-light
      owner decision (override of the transparent-logo rule).
- [ ] `npm run lint`, `npm run build`, and `npm test` all pass.

## Design / brand notes
- Still minimalist & light: off-white canvas, charcoal text, rose used **sparingly** as the
  accent. Colour comes from the logo/photography, not the UI.
- Spaced-caps for section labels; thin hairline dividers now in rose (`--color-hairline`).
- Logo: the black background of `logo.jpg` is acceptable **only** as a small contained mark;
  it must not turn any region of the UI into a dark surface.

## Data / placeholders
- Palette values above are owner-confirmed — use them exactly.
- Logo file: `public/brand/logo.jpg` (owner-confirmed for light UI, overriding §7).
- Canonical contact values unchanged (from `src/app/shared/contact.ts`):
  WhatsApp `https://wa.me/6588090600` + generic message; email `novestelatham@gmail.com`;
  IG https://www.instagram.com/linknowsg/ · TikTok https://www.tiktok.com/@linknowsg.

## Definition of done
- Acceptance criteria met; `npm run lint`, `npm run build`, `npm test` all green; changes
  small and reviewable; docs updated; reviewer notes addressed.
