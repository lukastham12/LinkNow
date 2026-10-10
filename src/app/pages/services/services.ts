import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';
import { EventsWeStyle } from '../../components/events-we-style/events-we-style';

/**
 * Services overview page (route '/services').
 *
 * Shows the exact same "Events we style" and "Other Services We Provide"
 * sections as the homepage (owner request, 10 Oct 2026 — the two pages must
 * never show different content), via the shared `app-events-we-style`
 * component. WhatsApp is the only enquiry path — no forms, email, quote
 * button, or pricing.
 */
@Component({
  selector: 'app-services',
  imports: [EventsWeStyle],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly whatsappHref = WHATSAPP_HREF;
}
