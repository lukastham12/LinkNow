import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddonCard } from '../addon-card/addon-card';
import { ADDONS, ADDONS_WA_LINK } from '../../shared/addons';
import { AnalyticsService } from '../../shared/analytics';
import { FEATURED_SERVICES } from '../../shared/featured-services';

// The 3 add-ons shown in the homepage's compact teaser (owner request,
// 26 Oct 2026 — the full food/entertainment grid was "too heavy" on the
// homepage, which already has its own hero, occasions grid, clients,
// portfolio and testimonials above it). One from each category plus the
// highest-value service, so the teaser still reads as representative
// rather than an arbitrary slice: Popcorn Station (food), Bouncy Castle
// (entertainment), Buffet Catering (the most substantial/highest-value
// add-on, spanning both personal and business events). /services keeps the
// full grouped grid — only the homepage uses this compact id list.
const TEASER_IDS: readonly string[] = [
  'popcorn-station',
  'bouncy-castle',
  'buffet-catering',
];

/**
 * "Events we style" + "Other Services We Provide" — shown on both the
 * homepage and /services (owner request, 10 Oct 2026) so the two pages can
 * never drift apart again. "Other Services We Provide" is grouped into
 * "Food & Drink Stations" / "Entertainment" (owner request, 19 Oct 2026) —
 * same two categories as the dedicated /services/add-ons hub page
 * (pages/addons-overview), which this section's CTA links out to.
 *
 * `compact` input (26 Oct 2026, owner request): when true, "Other Services
 * We Provide" renders as a flat 3-card teaser strip (TEASER_IDS,
 * above) with a single "See all add-ons →" link, instead of the full
 * two-category grid plus its stacked dual-CTA. /services passes nothing
 * (defaults to false, full grid); the homepage passes `[compact]="true"`.
 */
@Component({
  selector: 'app-events-we-style',
  imports: [RouterLink, AddonCard],
  templateUrl: './events-we-style.html',
  styleUrl: './events-we-style.scss',
})
export class EventsWeStyle {
  private readonly analytics = inject(AnalyticsService);

  readonly compact = input(false);

  protected readonly services = FEATURED_SERVICES;
  protected readonly foodAddons = ADDONS.filter((a) => a.category === 'food');
  protected readonly entertainmentAddons = ADDONS.filter((a) => a.category === 'entertainment');
  protected readonly teaserAddons = TEASER_IDS.map(
    (id) => ADDONS.find((a) => a.id === id)!,
  );
  protected readonly addonsWaLink = ADDONS_WA_LINK;

  protected trackWhatsappClick(section: string, item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section, item });
  }
}
