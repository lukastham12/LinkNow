import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LEGAL_NAME, absoluteUrl } from '../../shared/site';
import { WHATSAPP_NUMBER, whatsappLink } from '../../shared/contact';
import { SEO_LANDING_PAGES, SeoLandingPage } from '../../shared/seo-landing-pages';
import { TESTIMONIALS } from '../../shared/testimonials';

interface HowItWorksStep {
  title: string;
  text: string;
}

// Exact copy reused from /backdrops' HOW_IT_WORKS (backdrops.ts) — per the
// owner's spec for these pages ("How it works (4 steps) — Reuse exact copy
// from /backdrops").
const HOW_IT_WORKS: readonly HowItWorksStep[] = [
  {
    title: 'Send us your theme',
    text: "Message us on WhatsApp with your date, venue and the theme or vibe you're going for.",
  },
  {
    title: 'We send a mock-up',
    text: "You'll see a visual of the design before anything is built, so there are no surprises.",
  },
  {
    title: 'You confirm',
    text: 'Approve the mock-up and we lock in your date.',
  },
  {
    title: 'We set up and clear',
    text: 'Delivery, setup before your event and teardown after — all handled for you.',
  },
];

// Two real, verbatim reviews from shared/testimonials.ts (not fabricated —
// per the owner's spec, "hardcode 2 relevant review quotes from the
// existing /backdrops page testimonials"). Picked as the two most
// occasion-neutral quotes so they read naturally across all 3 pages.
const REVIEW_QUOTES = [
  'Good service! Fantastic quality and very understanding to our deco needs! Will liaise with ' +
    'them again for future events! Please find them and experience great service!',
  'Novi is a really kind lady and her setup is absolutely beautiful. Love working with her. ' +
    'Everyone loves the deco!',
];

const SCRIPT_ID = 'ld-json-seo-landing';

/**
 * Shared component for the SEO landing pages (added 24 Oct 2026, owner
 * request) — one static route per target keyword, currently
 * '/birthday-decoration-singapore' and '/party-decoration-singapore',
 * each prerendered, targeting organic Google and AI-search (Perplexity,
 * Gemini, ChatGPT) traffic. Mirrors the addon-detail/corporate-case-study
 * pattern already used elsewhere: the slug is carried on route `data`
 * (app.routes.ts), looked up in SEO_LANDING_PAGES (shared/seo-landing-
 * pages.ts) rather than duplicating near-identical page components.
 * ('/event-decoration-singapore' used to be a 3rd entry here too — it was
 * replaced 25 Oct 2026 with its own bespoke component, pages/event-
 * decoration-singapore/, which needed a richer structure than this generic
 * pattern covers. See shared/seo-landing-pages.ts for the full note.)
 *
 * Trust-line note: the spec originally asked for a fabricated "★ 4.8 on
 * Google" rating. No real rating exists in this codebase, so — confirmed
 * with the owner — this reuses the same unfabricated wording /backdrops
 * already settled on ("Real 5-star reviews...") instead of inventing a
 * number. See shared/seo-landing-pages.ts for the full reasoning.
 *
 * Per-page JSON-LD: the site-wide Organization/WebSite schema (shared/seo.ts,
 * injected once globally in app.ts) deliberately excludes priceRange/
 * aggregateRating. This component adds a SEPARATE, page-scoped LocalBusiness
 * block (own <script id="ld-json-seo-landing">) carrying only the fields the
 * owner's spec asked for — priceRange reuses the same owner-approved S$349
 * figure already live on /backdrops, and no aggregateRating/address is
 * added (none verified — same reasoning as the trust line and as the
 * site-wide schema's own "no address, no geo" rule).
 */
@Component({
  selector: 'app-seo-landing',
  templateUrl: './seo-landing.html',
  styleUrl: './seo-landing.scss',
})
export class SeoLandingPageComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  protected readonly page: SeoLandingPage = (() => {
    const slug = inject(ActivatedRoute).snapshot.data['slug'] as string;
    const found = SEO_LANDING_PAGES.find((p) => p.slug === slug);
    if (!found) {
      throw new Error(`No SEO landing page found for slug "${slug}"`);
    }
    return found;
  })();

  protected readonly howItWorks = HOW_IT_WORKS;

  protected readonly reviews = TESTIMONIALS.filter((t) => REVIEW_QUOTES.includes(t.quote));

  protected readonly whatsappHref = whatsappLink(
    `Hi LinkNow! I'm planning a ${this.page.occasionWhatsapp}.\nDate: \nVenue: \nTheme: `,
  );

  ngOnInit(): void {
    this.injectStructuredData();
  }

  ngOnDestroy(): void {
    this.document.getElementById(SCRIPT_ID)?.remove();
  }

  private injectStructuredData(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: LEGAL_NAME,
      description: this.page.keyword,
      url: absoluteUrl(`/${this.page.slug}`),
      telephone: `+${WHATSAPP_NUMBER}`,
      areaServed: 'Singapore',
      priceRange: 'S$349+',
    };

    let script = this.document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = SCRIPT_ID;
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
