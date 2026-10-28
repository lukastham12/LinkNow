import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_NAME, absoluteUrl } from '../../shared/site';
import { EMAIL_ADDRESS, WHATSAPP_NUMBER, pageWhatsappLink } from '../../shared/contact';
import { Faq } from '../../shared/faq';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';

interface WorkPhoto {
  src: string;
  alt: string;
}

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
 * `/event-decoration-singapore` (owner spec, 24-26 Oct 2026) — a dedicated,
 * bespoke page. Bespoke component rather than the generic SEO-landing
 * pattern: this page has a two-path personal/business split, its own
 * 4-question FAQ and dual WhatsApp/email CTAs, none of which the generic
 * pattern covers.
 *
 * Page order, 26 Oct 2026 restructure (owner spec): hero -> Our Work (split
 * into a Party Decorations gallery and a For Businesses gallery, each
 * deep-linking to /backdrops and /corporate) -> Two Ways We Help (personal/
 * business split) -> FAQ -> global footer. The why-us strip, testimonials,
 * "How It Works" and the closing dual-CTA outro were all removed per the
 * same spec — the page now ends at the FAQ.
 *
 * "Our Work" photo picks reuse already-vetted curation rather than inventing
 * a new "best of" selection: the 3 birthday/celebration photos are the same
 * ones the owner singled out as the most visually striking for HERO_IMAGES
 * on the homepage (pages/home/home.ts, 20 Oct 2026 note) minus backdrop-24
 * (still shows a child's full name on the backdrop itself — see CLAUDE.md's
 * name-blurring note); the 3 business photos are the headline images of the
 * /corporate case studies already featured on the homepage's corporate
 * teaser (People's Association, Avocadoria) plus Sparkle & Co.'s own case
 * study photo.
 *
 * Trust-line note: the owner's spec asked for a fabricated "★ 4.8 on
 * Google" rating — no real Google rating exists in this codebase. The
 * 26 Oct 2026 round replaced the earlier unfabricated "Real 5-star
 * reviews..." wording with a plain, number-free "Starting from S$349" at
 * the owner's explicit request (that line no longer needs to carry a
 * reviews claim once the Testimonials section below it was removed).
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

  protected readonly faqs = EVENT_FAQS;
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly mailtoHref = `mailto:${EMAIL_ADDRESS}`;

  // Switched from a hand-rolled Date/Venue/Theme-only message to the
  // site-wide pageWhatsappLink() convention (26 Oct 2026, pre-merge review
  // finding): the hand-rolled version silently dropped Event and Budget,
  // reopening the exact follow-up-chasing gap the 16 Oct 2026 UX fix
  // (ENQUIRY_TEMPLATE) was built to close.
  protected readonly whatsappHref = pageWhatsappLink('Event Decoration Singapore');

  protected readonly birthdayPhotos: readonly WorkPhoto[] = [
    {
      src: '/backdrops/hero-minecraft.jpg',
      alt: 'A Minecraft-themed 8th birthday backdrop with balloon garlands, styled by LinkNow',
    },
    {
      src: '/backdrops/backdrop-12.jpg',
      alt: 'A gold and black birthday backdrop with neon signage and foil number balloons, styled by LinkNow',
    },
    {
      src: '/backdrops/backdrop-17.jpg',
      alt: 'A teddy-bear-themed 1st birthday backdrop with a styled dessert table, styled by LinkNow',
    },
  ];

  protected readonly businessPhotos: readonly WorkPhoto[] = [
    {
      src: '/corporate/peoples-association-01.jpg',
      alt: "Balloon pillar entrance and ribbon-cutting setup for a People's Association Open House",
    },
    {
      src: '/backdrops/backdrop-23.jpg',
      alt: 'Sparkle & Co. retail pop-up backdrop styled by LinkNow at The Twilight: Flea & Feast',
    },
    {
      src: '/backdrops/backdrop-08.jpg',
      alt: 'In-store Easter event styled for Avocadoria — storefront view',
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
