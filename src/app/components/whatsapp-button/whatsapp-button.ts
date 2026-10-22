import { Component } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';

/** Persistent floating WhatsApp CTA, shown on every page (bottom-right). */
@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
})
export class WhatsappButton {
  protected readonly whatsappHref = WHATSAPP_HREF;
}
