import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../shared/analytics';
import {
  EMAIL_ADDRESS,
  UEN,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  WHATSAPP_HREF,
} from '../../shared/contact';

type EventType = 'Birthday' | 'Wedding & ROM' | 'Baby shower / gender reveal' | 'Corporate event' | 'Other';
type Budget = 'Under $500' | '$500 – $1,000' | '$1,000 – $2,500' | '$2,500+' | 'Not sure yet';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

/**
 * Contact page (route '/contact').
 *
 * Owner request, 12–13 Oct 2026: corporate/admin/HR buyers often can't buy
 * through a personal WhatsApp chat, so this page gives them a second,
 * formal channel. The form below submits directly to Web3Forms (no mail
 * app opens, no backend of our own) and delivers to
 * novestelatham@linknow-singapore.com. A separate urgency section still
 * points time-sensitive enquiries to WhatsApp. UEN is shown for
 * verification; no street address or opening hours are published.
 *
 * Venue/Budget fields (UX review, 16 Oct 2026): the original 5-field form
 * (Name/Phone/Event Type/Date/Message) still made Novi chase venue and
 * budget over follow-up messages — both are now explicit fields, and the
 * email address is shown as plain text so a visitor isn't limited to the
 * form if they'd rather write their own email.
 */
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly analytics = inject(AnalyticsService);
  private readonly http = inject(HttpClient);

  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly uen = UEN;
  protected readonly emailAddress = EMAIL_ADDRESS;

  protected readonly eventTypes: EventType[] = [
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

  protected name = '';
  protected phone = '';
  protected eventType: EventType | '' = '';
  protected eventDate = '';
  protected venue = '';
  protected budget: Budget | '' = '';
  protected message = '';
  // Honeypot: stays unchecked for real visitors (it's hidden via CSS and
  // skipped in tab order). A bot that blindly fills every form field trips
  // it, so we quietly drop the submission instead of sending it on.
  protected botcheck = false;

  protected readonly status = signal<SubmitStatus>('idle');

  protected submit(): void {
    if (this.botcheck) {
      return;
    }
    if (!this.name || !this.phone || !this.eventType) {
      return;
    }

    this.status.set('sending');

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New enquiry from the LinkNow website — ${this.eventType}`,
      name: this.name,
      phone: this.phone,
      event_type: this.eventType,
      event_date: this.eventDate || 'Not provided',
      venue: this.venue || 'Not provided',
      budget: this.budget || 'Not provided',
      message: this.message || 'Not provided',
      botcheck: false,
    };

    this.http.post<{ success: boolean }>(WEB3FORMS_ENDPOINT, payload).subscribe({
      next: () => {
        this.status.set('success');
        this.analytics.trackEvent('email_submit', { section: 'contact', item: 'success' });
        this.name = '';
        this.phone = '';
        this.eventType = '';
        this.eventDate = '';
        this.venue = '';
        this.budget = '';
        this.message = '';
      },
      error: () => {
        this.status.set('error');
        this.analytics.trackEvent('email_submit', { section: 'contact', item: 'error' });
      },
    });
  }

  protected trackWhatsappClick(section: string, item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section, item });
  }
}
