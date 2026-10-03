import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';

interface FloralCapability {
  title: string;
  blurb: string;
}

/**
 * Floral Services page (route '/flowers').
 *
 * Its own page (not a top-level nav tab): reachable via the Services dropdown
 * and the Floral Services card on /services. Positions florals as a fully
 * bespoke service — any flower, any palette, any occasion — rather than a
 * fixed catalogue of stock, since there is no price/quantity/cart anywhere
 * (BRIEF.md §4). WhatsApp is the only enquiry path.
 */
@Component({
  selector: 'app-flowers',
  imports: [],
  templateUrl: './flowers.html',
  styleUrl: './flowers.scss',
})
export class Flowers {
  protected readonly whatsappHref = WHATSAPP_HREF;

  protected readonly capabilities: FloralCapability[] = [
    {
      title: 'Any flower, any palette',
      blurb:
        "We're not limited to a fixed selection — tell us the blooms or colour scheme you have " +
        'in mind and we source and style around it.',
    },
    {
      title: 'Styled for any occasion',
      blurb:
        'Weddings, corporate events, product launches, birthdays and festive celebrations — ' +
        'florals designed to match the occasion.',
    },
    {
      title: 'Arches, installations & tablescapes',
      blurb:
        'From statement floral arches to fine, hand-tied centrepieces for a seated dinner — ' +
        'scaled to your venue and event.',
    },
    {
      title: 'Fully bespoke, start to finish',
      blurb:
        "No fixed templates — share your vision on WhatsApp and we'll design it together from " +
        'scratch.',
    },
  ];
}
