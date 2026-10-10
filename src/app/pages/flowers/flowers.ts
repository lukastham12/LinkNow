import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';

interface WeddingCapability {
  title: string;
  blurb: string;
}

/**
 * Wedding & ROM Styling page (route '/flowers').
 *
 * Its own page (not a top-level nav tab): reachable via the Services dropdown
 * and the matching card on /services. Floral styling is our specialty and
 * leads the page, but the focus is the full wedding/ROM decor job — backdrops,
 * balloon accents and table styling alongside the florals — so one team
 * covers the whole day (owner request, 10 Oct 2026; previously this page was
 * floral-only). No fixed packages/catalogue anywhere (BRIEF.md §4). WhatsApp
 * is the only enquiry path.
 */
@Component({
  selector: 'app-flowers',
  imports: [],
  templateUrl: './flowers.html',
  styleUrl: './flowers.scss',
})
export class Flowers {
  protected readonly whatsappHref = WHATSAPP_HREF;

  protected readonly capabilities: WeddingCapability[] = [
    {
      title: 'Floral styling — our specialty',
      blurb:
        'Bouquets, ceremony arrangements and reception florals in any flower, any palette — ' +
        'fresh or soap flower, tailored to your colour story.',
    },
    {
      title: 'Backdrops & ceremony styling',
      blurb: 'Arches, aisles, ROM backdrops and stage styling designed around your theme.',
    },
    {
      title: 'Balloon accents & installations',
      blurb:
        'Balloon garlands and columns that complement your florals for a fuller, more festive look.',
    },
    {
      title: 'Table & venue styling',
      blurb: 'Centrepieces, signage corners and tablescapes styled for your reception.',
    },
    {
      title: 'Fully bespoke, start to finish',
      blurb:
        "No fixed packages — share your vision on WhatsApp and we'll design the full day together.",
    },
  ];
}
