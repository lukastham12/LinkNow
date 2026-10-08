import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';

interface EventType {
  name: string;
  blurb: string;
}

/**
 * Corporate Events page (route '/corporate').
 *
 * Informational page describing the décor we create for companies, formal
 * occasions, and any other custom event — corporate backdrops, product
 * launches, grand openings, dinner & dance, roadshows, festive/seasonal décor,
 * weddings, and anything bespoke beyond that list. Leads with a 4-client
 * use-case grid (People's Association, AWWA, Bucket House Preschool,
 * Avocadoria), each card linking through to its own case-study page
 * (/corporate/:slug). WhatsApp is the only enquiry path — no forms, email,
 * contact link, or pricing.
 */
@Component({
  selector: 'app-corporate',
  imports: [RouterLink],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate {
  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly caseStudies = CORPORATE_CASE_STUDIES;

  protected readonly eventTypes: EventType[] = [
    {
      name: 'Weddings',
      blurb:
        'Ceremony and reception styling — arches, aisles, stages and photo moments designed around ' +
        'your theme. (New wedding photography coming soon.)',
    },
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
      blurb: 'Ribbon-ready entrances and celebratory décor to mark the day in style.',
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
      name: 'Festive & seasonal décor',
      blurb: 'Seasonal styling for offices and events — warm, on-brand and beautifully finished.',
    },
  ];
}
