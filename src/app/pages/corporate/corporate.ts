import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';

interface CorporatePhoto {
  src: string;
  alt: string;
}

interface EventType {
  name: string;
  blurb: string;
}

interface CaseStudy {
  client: string;
  brief: string;
  build: string;
  result: string;
}

/**
 * Corporate Events page (route '/corporate').
 *
 * Informational page describing the décor we create for companies, formal
 * occasions, and any other custom event — corporate backdrops, product
 * launches, grand openings, dinner & dance, roadshows, festive/seasonal décor,
 * weddings, and anything bespoke beyond that list. Shows a short case study
 * (brief/build/result) built around the two real Avocaderia in-store event
 * photos. WhatsApp is the only enquiry path — no forms, email, contact link,
 * or pricing.
 */
@Component({
  selector: 'app-corporate',
  imports: [],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate {
  protected readonly whatsappHref = WHATSAPP_HREF;

  // Real in-store event photos styled for Avocaderia (moved here from the
  // /backdrops gallery, ticket 007).
  protected readonly photos: CorporatePhoto[] = [
    {
      src: '/backdrops/backdrop-08.jpg',
      alt: 'In-store Easter event styled for Avocaderia — storefront view',
    },
    {
      src: '/backdrops/backdrop-09.jpg',
      alt: 'In-store Easter event styled for Avocaderia — pastel balloon backdrop',
    },
  ];

  protected readonly caseStudy: CaseStudy = {
    client: 'Avocadoria',
    brief:
      'Avocadoria wanted their café storefront to feel festive and photo-worthy for the Easter ' +
      'season — something that would catch the eye from outside and give customers a reason to ' +
      'stop and share it.',
    build:
      'A pastel balloon installation and Easter-themed display built around their storefront ' +
      'entrance, scaled to the space and designed to read well both in person and in photos.',
    result:
      'A warm, seasonal storefront moment that fit naturally with the café’s own branding — ' +
      'the same disciplined, no-clutter styling we bring to every event, corporate or retail.',
  };

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
