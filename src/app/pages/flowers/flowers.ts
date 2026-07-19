import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';
import { FLOWER_CATALOGUE } from './catalogue';

/**
 * Floral Showcase page (route '/flowers').
 *
 * A gallery — NOT a shop. It shows the range of flowers Linknow works with,
 * grouped by type, as photo + name only. There is deliberately no price,
 * quantity, bundle size, cart, selection, or quote-builder anywhere (BRIEF.md
 * §4). Conversion is the single generic canonical WhatsApp CTA plus a link to
 * /contact.
 */
@Component({
  selector: 'app-flowers',
  imports: [RouterLink],
  templateUrl: './flowers.html',
  styleUrl: './flowers.scss',
})
export class Flowers {
  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly catalogue = FLOWER_CATALOGUE;
}
