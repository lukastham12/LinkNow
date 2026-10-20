import { Component } from '@angular/core';
import { businessWhatsappLink, EMAIL_ADDRESS } from '../../shared/contact';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';
import { CaseCard } from '../../components/case-card/case-card';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';

interface EventType {
  name: string;
  blurb: string;
}

interface Faq {
  question: string;
  answer: string;
}

// For Businesses FAQ (owner request, 23 Oct 2026) — shown only on this page,
// separate from the shared retail-facing FAQ in shared/faq.ts (different
// concerns: access hours, branding, venue approvals, invoicing).
const FAQS: readonly Faq[] = [
  {
    question: 'Can you install outside opening hours?',
    answer:
      "Yes — we set up before opening or after closing. Tell us your mall's access hours and " +
      "we'll plan around them.",
  },
  {
    question: 'Can you include our branding?',
    answer: 'Yes — logos, brand colours and printed signage can be built into the design.',
  },
  {
    question: 'Who handles mall or venue approvals?',
    answer:
      'Most malls require the tenant or organiser to apply; we’ll provide the layout, materials ' +
      'list and setup timings you need.',
  },
  {
    question: 'Do you issue invoices?',
    answer: 'Yes, every business job comes with a formal invoice.',
  },
];

/**
 * For Businesses page (route '/corporate' — URL kept unchanged, owner
 * request, 23 Oct 2026, when the page was reworded from "Corporate Events"
 * to speak to businesses/stores/brands rather than "events").
 *
 * Informational page describing the decor we create for businesses, stores
 * and brands — corporate backdrops, booths/pop-ups/roadshows, product
 * launches, grand openings, dinner & dance, festive/seasonal decor, mall
 * activations, and anything bespoke beyond that list ("Weddings" was
 * removed from this list 23 Oct 2026 — wedding styling belongs on
 * /flowers, not here, and the "new photography coming soon" note was
 * stale). Leads with a 5-client use-case grid (People's Association, AWWA,
 * Bucket House Preschool, Avocadoria, Sparkle & Co. — added 23 Oct 2026),
 * each card linking through to its own case-study page (/corporate/:slug).
 * WhatsApp is the primary enquiry path (via businessWhatsappLink(), a
 * different template from the rest of the site — Company/Location/Dates/
 * What we need rather than Event/Venue/Theme/Budget); a secondary "Email
 * us" mailto link sits below the main CTA for corporate/admin buyers who'd
 * rather email — still no form or /contact link on this page. A "For
 * Businesses" FAQ (see FAQS above) sits above the closing CTA, shown only
 * on this page.
 */
@Component({
  selector: 'app-corporate',
  imports: [CaseCard, FaqAccordion],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate {
  protected readonly whatsappHref = businessWhatsappLink('For Businesses');
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly caseStudies = CORPORATE_CASE_STUDIES;
  protected readonly faqs = FAQS;

  protected readonly eventTypes: EventType[] = [
    {
      name: 'Corporate backdrops',
      blurb: 'Branded stage and photo backdrops that carry your identity through the room.',
    },
    {
      name: 'Product launches',
      blurb: 'Feature installs and styled reveal moments that put your product centre stage.',
    },
    {
      name: 'Grand openings',
      blurb: 'Ribbon-ready entrances and celebratory decor to mark the day in style.',
    },
    {
      name: 'Dinner & dance (D&D)',
      blurb: 'Themed staging, table styling and photo walls for your company celebration.',
    },
    {
      name: 'Booths, pop-ups & roadshows',
      blurb: 'Booth styling built to your space and branding, from single fairs to mall pop-ups.',
    },
    {
      name: 'Festive & seasonal decor',
      blurb: 'Seasonal styling for stores and offices — displays that last through the season.',
    },
    {
      name: 'Shopping mall activations & festive displays',
      blurb: 'Storefront takeovers and festive mall displays built to stop shoppers in their tracks.',
    },
  ];
}
