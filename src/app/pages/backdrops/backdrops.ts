import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';
import { BACKDROPS } from './backdrops.data';

/**
 * Custom Backdrops portfolio page (route '/backdrops').
 *
 * A gallery of real backdrop builds — photo tiles only, no prices, quantities
 * or per-item messages (BRIEF.md §4). Reachable from the Custom Backdrops
 * service card and the Services nav dropdown. WhatsApp is the only enquiry
 * path (generic message, no forms/email/contact).
 */
@Component({
  selector: 'app-backdrops',
  imports: [],
  templateUrl: './backdrops.html',
  styleUrl: './backdrops.scss',
})
export class Backdrops {
  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly backdrops = BACKDROPS;
}
