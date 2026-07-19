import { Component } from '@angular/core';
import { FLOWER_CATALOGUE } from './catalogue';

/**
 * Reusable floral showcase gallery.
 *
 * A gallery — NOT a shop. It shows the range of flowers Linknow works with,
 * grouped by type, as photo + name only. There is deliberately no price,
 * quantity, bundle size, cart, selection, or quote-builder anywhere (BRIEF.md
 * §4). Rendered inside the Floral Services section of the Services page.
 *
 * Images use `object-fit: contain` on a fixed aspect box so the whole flower is
 * always visible — no subject cropping (e.g. Bird of Paradise).
 */
@Component({
  selector: 'app-floral-showcase',
  imports: [],
  templateUrl: './floral-showcase.html',
  styleUrl: './floral-showcase.scss',
})
export class FloralShowcase {
  protected readonly catalogue = FLOWER_CATALOGUE;
}
