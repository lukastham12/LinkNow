import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddonCard } from '../addon-card/addon-card';
import { ADDONS, ADDONS_WA_LINK } from '../../shared/addons';
import { AnalyticsService } from '../../shared/analytics';
import { FEATURED_SERVICES } from '../../shared/featured-services';

/**
 * "Events we style" + "Other Services We Provide" — shown identically on the
 * homepage and /services (owner request, 10 Oct 2026) so the two pages can
 * never drift apart again. "Other Services We Provide" is grouped into
 * "Food & Drink Stations" / "Entertainment" (owner request, 19 Oct 2026) —
 * same two categories as the dedicated /services/add-ons hub page
 * (pages/addons-overview), which this section's CTA links out to.
 */
@Component({
  selector: 'app-events-we-style',
  imports: [RouterLink, AddonCard],
  templateUrl: './events-we-style.html',
  styleUrl: './events-we-style.scss',
})
export class EventsWeStyle {
  private readonly analytics = inject(AnalyticsService);

  protected readonly services = FEATURED_SERVICES;
  protected readonly foodAddons = ADDONS.filter((a) => a.category === 'food');
  protected readonly entertainmentAddons = ADDONS.filter((a) => a.category === 'entertainment');
  protected readonly addonsWaLink = ADDONS_WA_LINK;

  protected trackWhatsappClick(section: string, item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section, item });
  }
}
