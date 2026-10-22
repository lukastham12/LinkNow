import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';

/**
 * Persistent floating WhatsApp CTA, shown on every page (bottom-right).
 * Hidden on mobile on /backdrops only (see styles.scss's body.backdrops-page
 * rule) — that page has its own sticky bottom WhatsApp bar instead, so there
 * aren't two WhatsApp buttons competing for the same space.
 */
@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
})
export class WhatsappButton {
  protected readonly whatsappHref = WHATSAPP_HREF;
}
