import { Component, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_EVENT_HREF, WHATSAPP_HREF } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { FAQS } from '../../shared/faq';
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

interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Rotated hero photos (owner request, 12 Oct 2026, narrowed to kids'-party/
// birthday photos only — owner request, 23 Oct 2026, removing the corporate
// and fine-dining photos that used to round out the rotation): picked
// client-side after hydration so the prerendered HTML (SEO/first paint)
// stays stable on the first photo and only swaps once a real browser is
// rendering, on every screen size. Add to HERO_IMAGES rather than hard-coding
// a second hero image elsewhere — keep every entry a kids'-party/birthday
// photo.
const HERO_IMAGES: readonly HeroImage[] = [
  {
    src: '/backdrops/hero-minecraft.jpg',
    alt: "A Minecraft-themed birthday backdrop with balloon garlands, TNT and character cut-outs — styled by LinkNow for Enzo's 8th birthday",
    width: 1200,
    height: 1240,
  },
  {
    src: '/backdrops/backdrop-24.jpg',
    alt: "A safari-themed 1st birthday backdrop with balloon garlands styled by LinkNow for Sharan Nikitharan",
    width: 1050,
    height: 1400,
  },
  {
    src: '/backdrops/backdrop-11.jpg',
    alt: 'A Peppa Pig-themed birthday backdrop styled by LinkNow',
    width: 1050,
    height: 1400,
  },
];

/** Uniform random pick across HERO_IMAGES. */
function pickHeroImage(): HeroImage {
  return HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];
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

  // Defaults to the first kids'-party photo for the prerendered/SSR first
  // paint, then a random one of HERO_IMAGES is picked once a real browser
  // has hydrated.
  protected readonly heroImage = signal<HeroImage>(HERO_IMAGES[0]);

  constructor() {
    afterNextRender(() => {
      this.heroImage.set(pickHeroImage());
    });
  }

  // Real 5-star Google reviews only; empty until the owner supplies them.
  protected readonly testimonials = TESTIMONIALS;

  // Same FAQ shown on /backdrops (UX review, 23 Oct 2026 — the same
  // pre-enquiry questions apply before a visitor ever reaches the gallery).
  protected readonly faqs = FAQS;

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
        alt: "A Minecraft-themed birthday backdrop built by LinkNow for Enzo's 8th birthday",
      },
      {
        image: '/backdrops/backdrop-02.jpg',
        alt: "A balloon-garland celebration setup styled by LinkNow for Daxton's 100 Days",
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
