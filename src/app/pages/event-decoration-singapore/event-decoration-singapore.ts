import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_NAME, absoluteUrl } from '../../shared/site';
import { EMAIL_ADDRESS, WHATSAPP_NUMBER, whatsappLink } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { Faq } from '../../shared/faq';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';

interface HowItWorksStep {
  title: string;
  text: string;
}

interface ReviewCard {
  quote: string;
}

// Exact copy reused from /backdrops' HOW_IT_WORKS (backdrops.ts) — per the
// owner's spec for this page ("How it works — Reuse exact 4-step copy from
// /backdrops").
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
// per the owner's spec, hardcode 2 relevant quotes): one personal-event
// review and one corporate/community review, so the split section below is
// backed by a real quote on each side.
const PERSONAL_REVIEW_QUOTE =
  'Excellent experience with Novi Tham as our party host! She kept the kids super entertained, ' +
  'and the party energy was fantastic. Thank you so much for making my son’s birthday special! ' +
  'Highly recommended.';

const BUSINESS_REVIEW_QUOTE =
  'I engaged Novi and her team for balloon sculpting services, event decorations, and the ' +
  'grand opening setup. Despite a last-minute request for her team to come earlier for the ' +
  'setup, Novi was very accommodating and flexible. There were a few hiccups leading up to the ' +
  'event, but she was quick to respond, react, and rectify the issues immediately. As this was ' +
  'an open house event, we needed the balloon sculptor to be roving rather than stationed at ' +
  'one location. Her team was able to accommodate our request and engage with the children ' +
  'throughout the event, creating balloons for them along the way. I would definitely engage ' +
  'Novi and her team again for future events. They were responsive, accommodating, and ' +
  'professional throughout. Highly recommended!';

// FAQ answers (owner spec, 24-25 Oct 2026). Two of the spec's four questions
// asked for specific, unconfirmed business policy as fact (30-day credit
// terms with no deposit; per-event-day/progress billing for multi-day
// setups) — confirmed with the owner these are NOT confirmed LinkNow policy,
// so both are rewritten to stay general and route the visitor to WhatsApp/
// email instead, matching the site's existing shared FAQ convention
// (shared/faq.ts). The lead-time answer also reuses the shared FAQS' own
// "book anytime, no preferred window" wording verbatim rather than the
// spec's "recommend at least 1 month's notice" — that specific recommendation
// directly contradicts the owner's own 23 Oct 2026 correction ("there is no
// preferred window at all... don't reintroduce a suggested lead time without
// the owner asking for it"), so the existing, more recent policy wins here.
const EVENT_FAQS: readonly Faq[] = [
  {
    question: 'What venues do you cover?',
    answer:
      'We set up at HDB void decks, condo function rooms, hotel ballrooms, retail spaces and ' +
      'private venues across Singapore.',
  },
  {
    question: 'Do you work with businesses and provide tax invoices?',
    answer:
      "Yes — we work with corporates, schools and community organisations, and can provide an " +
      "invoice for your event. Billing and payment terms depend on the scope of the job, so " +
      "message us on WhatsApp or email and we'll walk you through it before you commit to " +
      'anything.',
  },
  {
    question: "What's your minimum lead time?",
    answer:
      "You can book anytime — there's no hard lead time or preferred window. We facilitate " +
      "last-minute requests too, so message us on WhatsApp with your date and we'll take it " +
      'from there.',
  },
  {
    question: 'Do you handle multi-day setups?',
    answer:
      "Yes, we handle multi-day setups. Pricing depends on the scale and duration of the job, " +
      "so message us on WhatsApp or email with your dates and what you need, and we'll work out " +
      'the details with you.',
  },
];

const SCRIPT_ID = 'ld-json-event-decoration-singapore';

/**
 * `/event-decoration-singapore` (owner spec, 24-25 Oct 2026) — a dedicated,
 * richer rebuild of the page superseding the simpler entry of the same slug
 * that previously rendered via the shared SeoLandingPageComponent (see
 * shared/seo-landing-pages.ts, now with this slug removed). Bespoke
 * component rather than the generic pattern: this page has a two-path
 * personal/business split, its own 4-question FAQ and dual WhatsApp/email
 * CTAs, none of which the generic SEO landing shape covers.
 *
 * Trust-line note: the owner's spec asked for a fabricated "★ 4.8 on
 * Google" rating — no real Google rating exists in this codebase, so this
 * reuses the same unfabricated wording already settled on /backdrops and
 * the other SEO landing pages ("Real X-star reviews...") instead of
 * inventing a number.
 *
 * Per-page JSON-LD: a separate LocalBusiness block (own
 * <script id="ld-json-event-decoration-singapore">), distinct from the
 * site-wide Organization/WebSite schema injected once in app.ts.
 */
@Component({
  selector: 'app-event-decoration-singapore',
  imports: [RouterLink, FaqAccordion],
  templateUrl: './event-decoration-singapore.html',
  styleUrl: './event-decoration-singapore.scss',
})
export class EventDecorationSingaporePage implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  protected readonly howItWorks = HOW_IT_WORKS;
  protected readonly faqs = EVENT_FAQS;
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly mailtoHref = `mailto:${EMAIL_ADDRESS}`;

  protected readonly personalReview: ReviewCard = {
    quote: TESTIMONIALS.find((t) => t.quote === PERSONAL_REVIEW_QUOTE)?.quote ?? '',
  };
  protected readonly businessReview: ReviewCard = {
    quote: TESTIMONIALS.find((t) => t.quote === BUSINESS_REVIEW_QUOTE)?.quote ?? '',
  };

  protected readonly whatsappHref = whatsappLink(
    "Hi LinkNow! I'm planning an event.\nDate: \nVenue: \nTheme: ",
  );

  protected readonly photos: readonly { src: string; alt: string }[] = [
    {
      src: '/backdrops/backdrop-23.jpg',
      alt: 'Event decoration Singapore — retail pop-up booth styling',
    },
    {
      src: '/backdrops/backdrop-08.jpg',
      alt: 'Event decoration Singapore — in-store storefront event styling',
    },
    {
      src: '/backdrops/backdrop-09.jpg',
      alt: 'Event decoration Singapore — in-store event decor',
    },
    {
      src: '/backdrops/backdrop-19.jpg',
      alt: 'Event decoration Singapore — naming ceremony backdrop',
    },
    {
      src: '/backdrops/backdrop-01.jpg',
      alt: 'Event decoration Singapore — naming ceremony backdrop',
    },
    {
      src: '/backdrops/backdrop-21.jpg',
      alt: 'Event decoration Singapore — 55th birthday celebration backdrop',
    },
  ];

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
      description: 'Event decoration company in Singapore',
      url: absoluteUrl('/event-decoration-singapore'),
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
