import { Component, afterNextRender, inject, signal } from '@angular/core';
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

interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Rotated hero photos (owner request, 12 Oct 2026): a kids' Minecraft party
// alone reads as "kids' party vendor" to corporate/wedding buyers, so the
// hero shows one of three occasions — picked client-side after hydration so
// the prerendered HTML (SEO/first paint) stays stable on the kids' photo and
// only swaps once a real browser is rendering.
//
// `weight` biases the pick (UX review, 16 Oct 2026): birthdays are the most
// common reason someone lands here, and a parent who opens the homepage to
// a corporate red-carpet arch reads it as "wrong kind of vendor" — so the
// birthday photo shows roughly half the time, with corporate/wedding
// splitting the rest to still signal that range to other audiences.
interface WeightedHeroImage extends HeroImage {
  weight: number;
}

const HERO_IMAGES: readonly WeightedHeroImage[] = [
  {
    src: '/backdrops/hero-minecraft.jpg',
    alt: "A Minecraft-themed birthday backdrop with balloon garlands, TNT and character cut-outs — styled by LinkNow for Enzo's 8th birthday",
    width: 1200,
    height: 1240,
    weight: 2,
  },
  {
    src: '/corporate/peoples-association-01.jpg',
    alt: "Balloon pillar entrance styled by LinkNow for a People's Association Open House",
    width: 1050,
    height: 1400,
    weight: 1,
  },
  {
    src: '/flowers/custom-arrangement-hero.jpg',
    alt: 'A bespoke floral centrepiece styled along a fine-dining table by LinkNow',
    width: 1050,
    height: 1400,
    weight: 1,
  },
];

/** Weighted random pick — see the `weight` note on HERO_IMAGES above. */
function pickWeightedHeroImage(): WeightedHeroImage {
  const totalWeight = HERO_IMAGES.reduce((sum, img) => sum + img.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const image of HERO_IMAGES) {
    roll -= image.weight;
    if (roll < 0) return image;
  }
  return HERO_IMAGES[0];
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

  // Defaults to the kids'-party photo for the prerendered/SSR first paint,
  // then a random one of the 3 occasions is picked once a real browser has
  // hydrated — see HERO_IMAGES above.
  protected readonly heroImage = signal<HeroImage>(HERO_IMAGES[0]);

  constructor() {
    afterNextRender(() => {
      this.heroImage.set(pickWeightedHeroImage());
    });
  }

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
