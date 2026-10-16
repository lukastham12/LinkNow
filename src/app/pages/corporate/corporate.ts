import { Component } from '@angular/core';
import { EMAIL_ADDRESS, pageWhatsappLink } from '../../shared/contact';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';
import { CaseCard } from '../../components/case-card/case-card';

interface EventType {
  name: string;
  blurb: string;
}

/**
 * Corporate Events page (route '/corporate').
 *
 * Informational page describing the decor we create for companies, formal
 * occasions, and any other custom event — corporate backdrops, product
 * launches, grand openings, dinner & dance, roadshows, festive/seasonal
 * decor, mall activations, and anything bespoke beyond that list ("Weddings"
 * was removed from this list 23 Oct 2026 — wedding styling belongs on
 * /flowers, not here, and the "new photography coming soon" note was stale).
 * Leads with a 4-client use-case grid (People's Association, AWWA, Bucket
 * House Preschool, Avocadoria), each card linking through to its own
 * case-study page (/corporate/:slug). WhatsApp is the primary enquiry path;
 * a secondary "Email us" mailto link sits below the main CTA for
 * corporate/admin buyers who'd rather email (owner request, 23 Oct 2026) —
 * still no form or /contact link on this page.
 */
@Component({
  selector: 'app-corporate',
  imports: [CaseCard],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate {
  protected readonly whatsappHref = pageWhatsappLink('Corporate Events');
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly caseStudies = CORPORATE_CASE_STUDIES;

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
      name: 'Roadshows',
      blurb: 'Portable, eye-catching setups that travel and stand out across venues.',
    },
    {
      name: 'Festive & seasonal decor',
      blurb: 'Seasonal styling for offices and events — warm, on-brand and beautifully finished.',
    },
    {
      name: 'Shopping mall activations & festive displays',
      blurb: 'Storefront takeovers and festive mall displays built to stop shoppers in their tracks.',
    },
  ];
}
