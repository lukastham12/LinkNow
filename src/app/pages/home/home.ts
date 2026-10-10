import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_EVENT_HREF, WHATSAPP_HREF } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { CLIENTS } from '../../shared/clients';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';
import { AnalyticsService } from '../../shared/analytics';
import { CaseCard } from '../../components/case-card/case-card';
import { EventsWeStyle } from '../../components/events-we-style/events-we-style';
import { ReviewsCarousel } from '../../components/reviews-carousel/reviews-carousel';

interface PortfolioTile {
  image: string;
  alt: string;
}

interface PortfolioGroup {
  label: string;
  ctaLink: string;
  items: PortfolioTile[];
}

/** Homepage (route ''). Sections: hero, events we style, clients, portfolio
 *  teaser, testimonials, enquiry strip. WhatsApp is the only enquiry
 *  channel — no contact/quote links. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, CaseCard, EventsWeStyle, ReviewsCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly analytics = inject(AnalyticsService);

  protected readonly whatsappHref = WHATSAPP_HREF;
  // Hero's primary CTA uses this slightly different generic message — see contact.ts.
  protected readonly eventWhatsappHref = WHATSAPP_EVENT_HREF;

  // Real 5-star Google reviews only; empty until the owner supplies them.
  protected readonly testimonials = TESTIMONIALS;

  // Organisations we've worked with — logo row only.
  protected readonly clients = CLIENTS;

  // Recent work, split by audience — a retail teaser (plain gallery tiles,
  // linking to the full /backdrops gallery) and a corporate teaser (the same
  // use-case cards shown on /corporate, linking straight to each client's
  // case-study page).
  protected readonly retail: PortfolioGroup = {
    label: 'Customers',
    ctaLink: '/backdrops',
    items: [
      {
        image: '/backdrops/backdrop-20.jpg',
        alt: "A Minecraft-themed birthday backdrop built by LinkNow Events Co. for Enzo's 8th birthday",
      },
      {
        image: '/backdrops/backdrop-02.jpg',
        alt: "A balloon-garland celebration setup styled by LinkNow Events Co. for Daxton's 100 Days",
      },
    ],
  };

  // Same client case studies shown on /corporate — People's Association and
  // Avocadoria — reused here so the card style and link target match exactly.
  protected readonly corporateCases = CORPORATE_CASE_STUDIES.filter(
    (c) => c.slug === 'peoples-association' || c.slug === 'avocadoria',
  );

  /**
   * GA4 click tracking for the hero's WhatsApp CTA. Fired fire-and-forget
   * from (click) alongside the anchor's own default action — never blocks
   * or delays WhatsApp opening.
   */
  protected trackWhatsappClick(section: string, item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section, item });
  }
}
