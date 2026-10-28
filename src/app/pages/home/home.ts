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
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';
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
// photo. Alt text is theme-only, no child's name (owner request, 22 Oct
// 2026 — same reasoning as backdrops.data.ts: a parent browsing could
// wonder if their own child's name ends up here too).
//
// Curated for visual impact (owner request, 20 Oct 2026 — "most exquisite
// images... Peppa Pig is boring"): swapped out backdrop-11 (a basic printed
// Peppa Pig tablecloth + plain balloon garland) for two more elaborate,
// editorial-looking builds already in the portfolio — backdrop-12 (gold/
// black birthday backdrop, neon signage, foil numbers) and backdrop-17
// (teddy-bear-themed 1st birthday, styled dessert table, blue/peach
// palette). backdrop-12's "16th" was dropped from its caption/alt 22 Oct
// 2026 — see backdrops.data.ts for why.
// Both were re-derived from their pre-optimisation originals (git history,
// commit 0b59aab~1) and re-saved at hero scale (1150px long edge) rather
// than upscaled from their smaller 700px gallery-thumbnail versions, which
// would have looked soft at hero size — see the image-optimisation
// CLAUDE.md note. Width/height below are each image's real current
// dimensions (keep them in sync if an image here is ever re-processed).
const HERO_IMAGES: readonly HeroImage[] = [
  {
    src: '/backdrops/hero-minecraft.jpg',
    alt: 'A Minecraft-themed 8th birthday backdrop with balloon garlands, TNT and character cut-outs — styled by LinkNow',
    width: 1113,
    height: 1150,
  },
  {
    src: '/backdrops/backdrop-24.jpg',
    alt: 'A safari-themed 1st birthday backdrop with balloon garlands, styled by LinkNow',
    width: 862,
    height: 1150,
  },
  {
    src: '/backdrops/backdrop-12.jpg',
    alt: 'A gold and black birthday backdrop with neon signage and foil number balloons, styled by LinkNow',
    width: 959,
    height: 1150,
  },
  {
    src: '/backdrops/backdrop-17.jpg',
    alt: 'A teddy-bear-themed 1st birthday backdrop with a styled dessert table, styled by LinkNow',
    width: 862,
    height: 1150,
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
  imports: [RouterLink, CaseCard, EventsWeStyle, ReviewsCarousel, FaqAccordion],
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

  /**
   * Bug fix (26 Oct 2026 — reported as "some users can't see the hero
   * image"): the prerendered page always ships with HERO_IMAGES[0], which
   * is guaranteed to exist — then, purely for variety, afterNextRender()
   * above swaps in a DIFFERENT, randomly-picked photo once the browser has
   * hydrated. That swap forces a brand-new network fetch; if it fails for
   * any reason specific to the visitor (ad blocker, flaky connection,
   * privacy extension, a CDN edge hiccup) the <img> box still reserves its
   * space but renders nothing — a perfectly good photo silently replaced
   * by a blank one. Reproduced locally by blocking the swapped-in image's
   * request: naturalWidth drops to 0 with no visible fallback. This
   * handler falls back to the known-good SSR default the moment a swap
   * fails, so a failed "variety" fetch can never leave the hero blank.
   */
  protected onHeroImageError(): void {
    if (this.heroImage().src !== HERO_IMAGES[0].src) {
      this.heroImage.set(HERO_IMAGES[0]);
    }
  }

  // Real 5-star Google reviews only; empty until the owner supplies them.
  protected readonly testimonials = TESTIMONIALS;

  // Same FAQ shown on /party-decorations-singapore (UX review, 23 Oct 2026 — the same
  // pre-enquiry questions apply before a visitor ever reaches the gallery).
  protected readonly faqs = FAQS;

  // Organisations we've worked with — logo row only.
  protected readonly clients = CLIENTS;

  // Recent work, split by audience — a retail teaser (plain gallery tiles,
  // linking to the full /party-decorations-singapore gallery) and a corporate teaser (the same
  // use-case cards shown on /corporate, linking straight to each client's
  // case-study page).
  protected readonly retail: PortfolioGroup = {
    label: 'Customers',
    ctaLink: '/party-decorations-singapore',
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
