import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_EVENT_HREF, WHATSAPP_HREF } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { CLIENTS } from '../../shared/clients';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';
import { OCCASIONS } from '../../shared/occasions';
import { ADDONS, ADDONS_WA_LINK } from '../../shared/addons';
import { AnalyticsService } from '../../shared/analytics';
import { CaseCard } from '../../components/case-card/case-card';
import { ReviewsCarousel } from '../../components/reviews-carousel/reviews-carousel';

interface Service {
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  link: string;
}

interface PortfolioTile {
  image: string;
  alt: string;
}

interface PortfolioGroup {
  label: string;
  ctaLink: string;
  items: PortfolioTile[];
}

/** Homepage (route ''). Sections: hero, occasions, services, add-ons, bundle
 *  band, clients, portfolio teaser, testimonials, enquiry strip. WhatsApp is
 *  the only enquiry channel — no contact/quote links. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, CaseCard, ReviewsCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly analytics = inject(AnalyticsService);

  protected readonly whatsappHref = WHATSAPP_HREF;
  // Homepage redesign (v1.0, 10 Oct 2026): hero primary CTA and the bundle
  // band use this slightly different generic message — see contact.ts.
  protected readonly eventWhatsappHref = WHATSAPP_EVENT_HREF;

  // "Events we style" — one data array driving all 9 tiles (shared/occasions.ts).
  protected readonly occasions = OCCASIONS;

  // "Add to your event" — one data array driving all 5 add-ons (shared/addons.ts).
  protected readonly addons = ADDONS;
  protected readonly addonsWaLink = ADDONS_WA_LINK;

  // Real 5-star Google reviews only; empty until the owner supplies them.
  protected readonly testimonials = TESTIMONIALS;

  // Organisations we've worked with — logo row only.
  protected readonly clients = CLIENTS;

  // Exactly 4 featured services (Homepage redesign R3) — order matters.
  protected readonly services: Service[] = [
    {
      name: 'Balloon Decorations',
      blurb:
        'Organic garlands, arches, columns and balloon walls in your colours and theme — for ' +
        'any venue, big or small.',
      image: '/backdrops/backdrop-18.jpg',
      imageAlt: 'A blue and gold organic balloon garland arch built by LinkNow Events Co.',
      link: '/backdrops',
    },
    {
      name: 'Backdrops & Party Styling',
      blurb:
        'Themed backdrops, cake table styling, props and name boards, designed around your ' +
        'celebration.',
      image: '/backdrops/backdrop-22.jpg',
      imageAlt:
        'A themed birthday backdrop with character cut-outs, a name board and a balloon garland ' +
        'by LinkNow Events Co.',
      link: '/backdrops',
    },
    {
      name: 'Floral Styling & Bouquets',
      blurb:
        'Fresh and soap-flower arrangements — from ROM tables and wedding decor to gift bouquets.',
      image: '/flowers/custom-arrangement-hero.jpg',
      imageAlt: 'A bespoke floral centrepiece styled along a fine-dining table by LinkNow Events Co.',
      link: '/flowers',
    },
    {
      name: 'Corporate & Community Events',
      blurb: 'Grand openings, open houses, family days and company celebrations, styled end to end.',
      image: '/corporate/awwa-01.jpg',
      imageAlt: "A themed bouncy castle set up for AWWA's Children's Day engagement",
      link: '/corporate',
    },
  ];

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
   * GA4 click tracking for the redesign's WhatsApp links (A1). Fired
   * fire-and-forget from (click) alongside the anchor's own default action —
   * never blocks or delays WhatsApp opening (A3).
   */
  protected trackWhatsappClick(section: string, item: string): void {
    this.analytics.trackEvent('whatsapp_click', { section, item });
  }
}
