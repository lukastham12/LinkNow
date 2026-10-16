import { Component } from '@angular/core';
import { businessWhatsappLink, EMAIL_ADDRESS } from '../../shared/contact';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';
import { CaseCard } from '../../components/case-card/case-card';

interface EventType {
  name: string;
  blurb: string;
}

/**
 * For Businesses page (route '/corporate' — URL kept unchanged, owner
 * request, 23 Oct 2026, when the page was reworded from "Corporate Events"
 * to speak to businesses/stores/brands rather than "events").
 *
 * Informational page describing the decor we create for businesses, stores
 * and brands — corporate backdrops, product launches, grand openings,
 * dinner & dance, roadshows, festive/seasonal decor, mall activations, and
 * anything bespoke beyond that list ("Weddings" was removed from this list
 * 23 Oct 2026 — wedding styling belongs on /flowers, not here, and the "new
 * photography coming soon" note was stale). Leads with a 4-client use-case
 * grid (People's Association, AWWA, Bucket House Preschool, Avocadoria),
 * each card linking through to its own case-study page (/corporate/:slug).
 * WhatsApp is the primary enquiry path (via businessWhatsappLink(), a
 * different template from the rest of the site — Company/Location/Dates/
 * What we need rather than Event/Venue/Theme/Budget); a secondary "Email
 * us" mailto link sits below the main CTA for corporate/admin buyers who'd
 * rather email — still no form or /contact link on this page.
 */
@Component({
  selector: 'app-corporate',
  imports: [CaseCard],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate {
  protected readonly whatsappHref = businessWhatsappLink('For Businesses');
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
