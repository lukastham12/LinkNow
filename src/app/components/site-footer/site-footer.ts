import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../shared/analytics';
import {
  EMAIL_ADDRESS,
  EMAIL_HREF,
  INSTAGRAM_URL,
  NAV_LINKS,
  TIKTOK_URL,
  UEN,
  WHATSAPP_HREF,
} from '../../shared/contact';

/** Shared site footer: logo, contact, socials, region, UEN. */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  private readonly analytics = inject(AnalyticsService);

  protected readonly navLinks = NAV_LINKS;
  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly emailHref = EMAIL_HREF;
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly instagramUrl = INSTAGRAM_URL;
  protected readonly tiktokUrl = TIKTOK_URL;
  protected readonly uen = UEN;
  protected readonly year = new Date().getFullYear();

  protected trackEmailClick(): void {
    this.analytics.trackEvent('email_click', { section: 'footer', item: 'generic' });
  }
}
