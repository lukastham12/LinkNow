import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { whatsappLink } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { FAQS } from '../../shared/faq';
import { ADDONS } from '../../shared/addons';
import { AddonCard } from '../../components/addon-card/addon-card';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';
import { ReviewsCarousel } from '../../components/reviews-carousel/reviews-carousel';
import { BACKDROP_CATEGORIES, BACKDROP_GROUPS, BackdropCategory } from './backdrops.data';

interface CarouselScrollState {
  atStart: boolean;
  atEnd: boolean;
}

interface HowItWorksStep {
  title: string;
  text: string;
}

// "How It Works" section (owner request, 22 Oct 2026) — a short, concrete
// process so a first-time visitor knows what happens after they message us,
// without us naming a price or timeline we haven't confirmed.
const HOW_IT_WORKS: readonly HowItWorksStep[] = [
  {
    title: 'Send us your theme',
    text: "Message us on WhatsApp with your date, venue and the theme or vibe you're going for.",
  },
  {
    title: 'We send a mock-up',
    text: "You'll see a visual of the design before anything is built, so there are no surprises.",
  },
  {
    title: 'You confirm',
    text: 'Approve the mock-up and we lock in your date.',
  },
  {
    title: 'We set up and clear',
    text: 'Delivery, setup before your event and teardown after — all handled for you.',
  },
];

// Mobile-first restructure (owner request, 22 Oct 2026, 2nd round) — chip
// labels shown on the page differ from the underlying BackdropCategory
// values (which stay unchanged so existing data/aria-id wiring doesn't
// break): "Birthday" reads as "Kids' Birthdays" here so it reads clearly
// next to "Grown-Up" rather than implying it covers every age.
const CHIP_LABELS: Record<BackdropCategory, string> = {
  Birthday: "Kids' Birthdays",
  'Grown-Up Celebrations': 'Grown-Up',
  '100 Days & Naming': '100 Days & Naming',
  'Baby Shower & Gender Reveal': 'Baby Shower',
};

// This page's WhatsApp buttons (hero, final CTA) use a bespoke prefill
// rather than the shared pageWhatsappLink() template — owner spec, 22 Oct
// 2026 mobile-first restructure — asking for date/venue/theme/add-ons up
// front, tuned for a parent planning a kid's birthday.
const BACKDROPS_WHATSAPP_MESSAGE =
  "Hi LinkNow! I'm planning a birthday party.\n" +
  'Date: \n' +
  'Venue (HDB / condo / other): \n' +
  'Theme: \n' +
  'Add-ons I\'m interested in: ';

// Reviews that are about floral/bouquet delivery rather than party decor
// don't fit this page's "plan your kid's party" context (owner request, 22
// Oct 2026) — filtered out for THIS page's carousel only; the full list
// (shared/testimonials.ts) is untouched and still shown in full elsewhere
// (e.g. the homepage).
const EXCLUDED_QUOTE_SNIPPETS = ['the big and beautiful bouquet', 'soap flower bouquets'];

// "Make It a Full Party" strip (restored 22 Oct 2026 — owner request, in
// place of the single "See party add-ons" redirect line the mobile-first
// restructure replaced it with) — a fixed, deliberately short pick of 4
// add-ons (not all 7) that a parent planning a kid's birthday is most
// likely to want: one food station, one sweet station, entertainment and
// hosting. Buffet Catering, Soft Serve Ice Cream and Balloon Sculpting are
// left for the full /services/add-ons page.
const FULL_PARTY_ADDON_IDS = ['bouncy-castle', 'candy-floss', 'popcorn-station', 'party-hosting'];

/**
 * Birthdays & Celebrations portfolio page (route '/backdrops').
 *
 * Mobile-first restructure (owner request, 22 Oct 2026, 2nd round): everything
 * needed to decide and enquire now sits in the first ~1.5 mobile viewports —
 * compact hero, then one chip-filtered gallery (replacing four separate
 * always-visible carousel rows). "How It Works" compresses to a single
 * strip on mobile; testimonials/FAQ/final CTA are unchanged in substance,
 * just reordered after the gallery. See backdrops.html/.scss for the
 * section-by-section layout.
 *
 * 3rd round (owner request, 22 Oct 2026, same day): the hero photo and the
 * trust line were both dropped — the photo read as too large/heavy for a
 * compact mobile-first hero, and the trust line ("Real 5-star reviews from
 * Singapore parents") wasn't earning its place without a page section right
 * below it to back it up. The "See party add-ons" redirect line was also
 * swapped back for the full "Make It a Full Party" add-on card section
 * (FULL_PARTY_ADDON_IDS below) — the owner wanted the cards shown inline on
 * this page rather than just a link elsewhere.
 *
 * 4th round (owner request, 22 Oct 2026, same day): the sticky mobile
 * bottom WhatsApp CTA bar (and the matching hiding of the floating
 * site-wide WhatsApp bubble on mobile) was reverted — the owner wanted the
 * normal floating WhatsApp bubble back (bottom-right, every page including
 * this one), not a replacement sticky bar. This page no longer touches the
 * floating bubble at all.
 */
@Component({
  selector: 'app-backdrops',
  imports: [ReviewsCarousel, FaqAccordion, AddonCard, RouterLink],
  templateUrl: './backdrops.html',
  styleUrl: './backdrops.scss',
})
export class Backdrops {
  private readonly injector = inject(Injector);

  protected readonly whatsappHref = whatsappLink(BACKDROPS_WHATSAPP_MESSAGE);

  protected readonly fullPartyAddons = FULL_PARTY_ADDON_IDS.map(
    (id) => ADDONS.find((a) => a.id === id)!,
  );

  protected readonly categories = BACKDROP_CATEGORIES;
  protected readonly chips = BACKDROP_CATEGORIES.map((category) => ({
    category,
    label: CHIP_LABELS[category],
  }));
  protected readonly groups = BACKDROP_GROUPS;
  protected readonly activeCategory = signal<BackdropCategory>(BACKDROP_CATEGORIES[0]);

  protected readonly howItWorks = HOW_IT_WORKS;

  // Same real reviews shown everywhere else, minus the two about bouquets —
  // see EXCLUDED_QUOTE_SNIPPETS above. This filter is local to this page;
  // shared/testimonials.ts itself is unchanged.
  protected readonly testimonials = TESTIMONIALS.filter(
    (t) => !EXCLUDED_QUOTE_SNIPPETS.some((snippet) => t.quote.includes(snippet)),
  );
  protected readonly faqs = FAQS;

  // Single carousel on screen at a time (one per selected chip) — unlike
  // the old per-category carousels, there's only ever one #carouselRef in
  // the DOM, reused across chip switches.
  @ViewChild('carouselRef') private carouselRef?: ElementRef<HTMLUListElement>;
  @ViewChildren('chipRef') private chipRefs!: QueryList<ElementRef<HTMLButtonElement>>;
  protected carouselState: CarouselScrollState = { atStart: true, atEnd: true };

  constructor() {
    afterNextRender(() => {
      const el = this.carouselRef?.nativeElement;
      if (el) {
        this.carouselState = this.readScrollState(el);
      }
    });
  }

  protected get activeGroup() {
    return this.groups.find((g) => g.category === this.activeCategory())!;
  }

  protected get activeChipIndex(): number {
    return this.categories.indexOf(this.activeCategory());
  }

  private readScrollState(el: HTMLUListElement): CarouselScrollState {
    return {
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    };
  }

  protected onCarouselScroll(event: Event): void {
    this.carouselState = this.readScrollState(event.target as HTMLUListElement);
  }

  protected scrollCarousel(direction: 'prev' | 'next'): void {
    const el = this.carouselRef?.nativeElement;
    if (!el) {
      return;
    }
    const amount = el.clientWidth * 0.9 * (direction === 'next' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }

  protected selectCategory(category: BackdropCategory): void {
    if (category === this.activeCategory()) {
      return;
    }
    this.activeCategory.set(category);
    // Reset to the first photo of the newly-selected category once Angular
    // has rendered it — run after this render via the injector so it works
    // from an event handler, not just the constructor.
    afterNextRender(
      () => {
        const el = this.carouselRef?.nativeElement;
        if (!el) {
          return;
        }
        el.scrollTo({ left: 0 });
        this.carouselState = this.readScrollState(el);
      },
      { injector: this.injector },
    );
  }

  /** Arrow-key roving focus across the chip row (tablist a11y pattern). */
  protected onChipKeydown(event: KeyboardEvent, index: number): void {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }
    event.preventDefault();
    const chips = this.chipRefs.toArray();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + delta + chips.length) % chips.length;
    chips[nextIndex].nativeElement.focus();
    this.selectCategory(this.categories[nextIndex]);
  }
}
