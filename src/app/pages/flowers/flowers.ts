import { Component } from '@angular/core';
import { FloralShowcase } from '../../components/floral-showcase/floral-showcase';
import { WHATSAPP_HREF } from '../../shared/contact';

/**
 * Floral Showcase page (route '/flowers').
 *
 * Its own page (not a top-level nav tab): reachable via the Services dropdown
 * and the Floral Services card on /services. Renders the reusable
 * `app-floral-showcase` gallery — 42 flowers, photo + name only, no prices,
 * no quantities, no cart (BRIEF.md §4). WhatsApp is the only enquiry path.
 */
@Component({
  selector: 'app-flowers',
  imports: [FloralShowcase],
  templateUrl: './flowers.html',
  styleUrl: './flowers.scss',
})
export class Flowers {
  protected readonly whatsappHref = WHATSAPP_HREF;
}
