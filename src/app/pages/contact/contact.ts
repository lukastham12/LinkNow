import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../shared/analytics';
import { EMAIL_ADDRESS, EMAIL_HREF, UEN, WHATSAPP_HREF, whatsappLink } from '../../shared/contact';

type Occasion = 'Birthday' | 'Wedding & ROM' | 'Baby shower / gender reveal' | 'Corporate event' | 'Other';
type Budget = 'Under $500' | '$500 – $1,000' | '$1,000 – $2,500' | '$2,500+' | 'Not sure yet';

/**
 * Contact page (route '/contact').
 *
 * Owner request, 12 Oct 2026: corporate/admin/HR buyers often can't buy
 * through a personal WhatsApp chat, so this page gives them a second, more
 * formal channel — email — alongside WhatsApp, plus the UEN so the business
 * can be verified. There is still no backend/form submission (static
 * prerendered site): the email option is a `mailto:` link, and the mini
 * enquiry form below builds a pre-filled WhatsApp message rather than
 * posting anywhere.
 */
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly analytics = inject(AnalyticsService);

  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly emailHref = EMAIL_HREF;
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly uen = UEN;

  protected readonly occasions: Occasion[] = [
    'Birthday',
    'Wedding & ROM',
    'Baby shower / gender reveal',
    'Corporate event',
    'Other',
  ];
  protected readonly budgets: Budget[] = [
    'Under $500',
    '$500 – $1,000',
    '$1,000 – $2,500',
    '$2,500+',
    'Not sure yet',
  ];

  protected occasion: Occasion | '' = '';
  protected date = '';
  protected venue = '';
  protected budget: Budget | '' = '';

  /** Builds a pre-filled wa.me link from whatever the visitor has entered. */
  protected get formWhatsappLink(): string {
    const lines = ["Hi LinkNow, I'd like to enquire about an event."];
    if (this.occasion) lines.push(`Occasion: ${this.occasion}`);
    if (this.date) lines.push(`Date: ${this.date}`);
    if (this.venue) lines.push(`Venue: ${this.venue}`);
    if (this.budget) lines.push(`Budget: ${this.budget}`);
    return whatsappLink(lines.join('\n'));
  }

  protected trackWhatsappClick(section: string, item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section, item });
  }

  protected trackEmailClick(): void {
    this.analytics.trackEvent('email_click', { section: 'contact', item: 'generic' });
  }
}
