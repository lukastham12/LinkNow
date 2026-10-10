import { Component, inject } from '@angular/core';
import { WHATSAPP_HREF } from '../../shared/contact';
import { ADDONS, ADDONS_WA_LINK } from '../../shared/addons';
import { AnalyticsService } from '../../shared/analytics';

/**
 * Party Add-Ons & Extras page (route '/extras'). Owner-requested 10 Oct
 * 2026 as the destination for the homepage's "Other Services" card — a
 * dedicated page for the things that don't have a photo gallery of their
 * own (food station, bouncy castle, balloon sculpting, party hosting).
 * WhatsApp is the only enquiry channel — no form, no pricing.
 */
@Component({
  selector: 'app-extras',
  imports: [],
  templateUrl: './extras.html',
  styleUrl: './extras.scss',
})
export class Extras {
  private readonly analytics = inject(AnalyticsService);

  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly addons = ADDONS;
  protected readonly addonsWaLink = ADDONS_WA_LINK;

  protected trackWhatsappClick(item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section: 'extras', item });
  }
}
