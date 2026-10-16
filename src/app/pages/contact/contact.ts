import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
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

// SG mobile/landline numbers: optional +65, then 8 digits starting with
// 3, 6, 8 or 9. Spaces are stripped before testing so "+65 9123 4567" and
// "91234567" both validate the same way.
const SG_PHONE_PATTERN = /^(\+65)?[3689]\d{7}$/;

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
 *
 * Email field (owner request, 23 Oct 2026): optional, after Phone — some
 * enquiries are easier to follow up over email than WhatsApp. Corporate
 * event type also shows a hint under Event Type nudging the visitor to
 * mention in their message if they'd like LinkNow's business profile,
 * portfolio and rate card sent over, since corporate buyers usually ask for
 * those anyway.
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

  @ViewChild('nameInput') private nameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('phoneInput') private phoneInput?: ElementRef<HTMLInputElement>;
  @ViewChild('eventTypeInput') private eventTypeInput?: ElementRef<HTMLSelectElement>;

  protected name = '';
  protected phone = '';
  protected email = '';
  protected eventType: EventType | '' = '';
  protected eventDate = '';
  protected venue = '';
  protected budget: Budget | '' = '';
  protected message = '';
  // Honeypot: stays unchecked for real visitors (it's hidden via CSS and
  // skipped in tab order). A bot that blindly fills every form field trips
  // it, so we quietly drop the submission instead of sending it on.
  protected botcheck = false;

  // Required-field validation (UX review, 16 Oct 2026 — the form used
  // novalidate and clicking "Send Message" with empty required fields did
  // nothing visible). `touched` gates when an error is shown: a field only
  // starts validating-as-you-type once it's been through one submit attempt
  // or been blurred, so errors don't appear before the visitor has had a
  // chance to fill anything in.
  protected touched = { name: false, phone: false, eventType: false };
  protected nameError: string | null = null;
  protected phoneError: string | null = null;
  protected eventTypeError: string | null = null;

  protected readonly status = signal<SubmitStatus>('idle');

  protected validateName(): string | null {
    return this.name.trim() ? null : 'Please enter your name.';
  }

  protected validatePhone(): string | null {
    const value = this.phone.trim();
    if (!value) {
      return 'Please enter your phone number.';
    }
    return SG_PHONE_PATTERN.test(value.replace(/\s+/g, ''))
      ? null
      : 'Please enter a valid Singapore phone number, e.g. +65 9123 4567.';
  }

  protected validateEventType(): string | null {
    return this.eventType ? null : 'Please select an event type.';
  }

  protected onNameTouched(): void {
    this.touched.name = true;
    this.nameError = this.validateName();
  }

  protected onPhoneTouched(): void {
    this.touched.phone = true;
    this.phoneError = this.validatePhone();
  }

  protected onEventTypeTouched(): void {
    this.touched.eventType = true;
    this.eventTypeError = this.validateEventType();
  }

  private focusFirstInvalid(): void {
    const target = this.nameError
      ? this.nameInput
      : this.phoneError
        ? this.phoneInput
        : this.eventTypeInput;
    target?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target?.nativeElement.focus();
  }

  protected submit(): void {
    if (this.botcheck) {
      return;
    }

    this.touched = { name: true, phone: true, eventType: true };
    this.nameError = this.validateName();
    this.phoneError = this.validatePhone();
    this.eventTypeError = this.validateEventType();

    if (this.nameError || this.phoneError || this.eventTypeError) {
      this.focusFirstInvalid();
      return;
    }

    this.status.set('sending');

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New enquiry from the LinkNow website — ${this.eventType}`,
      name: this.name,
      phone: this.phone,
      email: this.email || 'Not provided',
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
        this.email = '';
        this.eventType = '';
        this.eventDate = '';
        this.venue = '';
        this.budget = '';
        this.message = '';
        this.touched = { name: false, phone: false, eventType: false };
        this.nameError = null;
        this.phoneError = null;
        this.eventTypeError = null;
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
