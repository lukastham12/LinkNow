# 004 — Services page (Floral under Services), WhatsApp-only, image fit, testimonials

**Status:** Ready for build
**Type:** Page + refactor
**Relates to:** BRIEF.md §5/§6; PM directives (this turn). Supersedes the standalone Flowers tab from ticket 003.

## User story
As the owner, I want floral to sit under Services (not its own tab), photos that never clip, a single WhatsApp enquiry path (no forms/email/contact page), and testimonials limited to real 5-star Google reviews — so the site is simpler and on-message.

## Scope (in)
1. **Floral under Services**
   - Build a **Services page** at route `/services` (`src/app/pages/services/`) with three offerings from BRIEF.md §2: **Custom Backdrops**, **Floral Services**, **Setup-Only Labour** (client supplies materials).
   - The **Floral Services** section contains the existing flower showcase gallery (the 42 items from `src/app/pages/flowers/catalogue.ts`, grouped by the 5 categories, photo + name only). Extract the gallery into a reusable component (e.g. `src/app/components/floral-showcase/`) and use it inside the Floral Services section. Delete the standalone `src/app/pages/flowers/` page component (keep `catalogue.ts`, move it next to the reusable component if cleaner).
   - **Remove "Flowers" from `NAV_LINKS`** (`src/app/shared/contact.ts`). Register `/services`; redirect the old `/flowers` path to `/services` so any existing link still resolves.
   - Keep the hard no-price guardrail on the gallery (photo + name only; no price/qty/cart/per-item message).

2. **Images must not clip**
   - Flower photos currently crop (e.g. **Bird of Paradise** under Other Mains). Change the gallery image styling so the **whole flower is always visible** (`object-fit: contain` on a consistent aspect-ratio box with a `--color-surface` background, or equivalent). No subject cropping on any item.

3. **WhatsApp-only enquiry (remove all Contact/email/quote)**
   - Remove the **Contact** entry from `NAV_LINKS`. No `/contact` page/route.
   - Remove the enquiry **email** from the footer and any "email us" affordance.
   - Remove every **"Request a quote"** and **"Contact us"** button (home hero, home enquiry strip, gallery/services CTAs). Replace with the single generic **WhatsApp** CTA only.
   - Keep: floating WhatsApp button, WhatsApp CTAs (generic message via `WHATSAPP_HREF`), and social links (Instagram/TikTok) in the footer.
   - Update **BRIEF.md** (§4/§6) and **CLAUDE.md** to record: enquiry form/email removed from scope — **WhatsApp is the only enquiry channel**. Remove/deprecate `ENQUIRY_EMAIL` usage (leave the constant only if nothing references it, otherwise delete).

4. **Testimonials = 5-star Google reviews only**
   - Create a data-driven testimonials source `src/app/pages/.../testimonials.ts` (e.g. `TESTIMONIALS: {author, quote, rating}[]`), documented that **only 5-star Google reviews** belong here.
   - Until the owner provides real reviews, use an **empty/clearly-marked placeholder** state (a "reviews coming soon" note is fine) — do NOT invent fake reviews. Home testimonials teaser reads from this same source. Every entry that IS shown must render 5 stars.

## Out of scope
- No contact form, no email capture, no booking. No prices anywhere. Don't build Portfolio/About pages.

## Acceptance criteria
- [ ] `/services` page exists with the three offerings; Floral Services shows the 42-item gallery (photo + name only, no prices).
- [ ] Reusable floral-showcase component; standalone `/flowers` page removed; `/flowers` redirects to `/services`.
- [ ] Nav = Home, Services, Portfolio, Testimonials, About (no Flowers, no Contact).
- [ ] No flower photo is cropped/clipped (verify Bird of Paradise shows fully).
- [ ] No "Contact us", "Request a quote", email, or form anywhere; only WhatsApp CTAs + floating button remain.
- [ ] Footer has no email; keeps WhatsApp + socials.
- [ ] Testimonials are data-driven, 5-star only, placeholder (no fabricated reviews) until real ones supplied.
- [ ] BRIEF.md + CLAUDE.md updated (WhatsApp-only; floral under services).
- [ ] `npm run lint`, `npm run build`, `npm test` all pass; specs updated to match.

## Notes
- Owner will paste real 5-star Google reviews later (could not be auto-extracted from Google).
- Keep minimalist & light + rose accent theme; reuse CSS variables.
