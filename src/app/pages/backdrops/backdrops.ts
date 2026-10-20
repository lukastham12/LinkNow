import { afterNextRender, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { pageWhatsappLink } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { FAQS } from '../../shared/faq';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';
import { ReviewsCarousel } from '../../components/reviews-carousel/reviews-carousel';
import { BACKDROP_GROUPS } from './backdrops.data';

interface CarouselScrollState {
  atStart: boolean;
  atEnd: boolean;
}

/**
 * Birthdays & Celebrations portfolio page (route '/backdrops').
 *
 * Renamed from "Custom Backdrops" to "Birthdays & Celebrations" site-wide
 * on 23 Oct 2026 (owner request) — "Custom Backdrops" is the product, but a
 * customer searching for a birthday/celebration decorator doesn't think in
 * that term; the nav label and H1 now speak to the occasion, while the body
 * copy still describes backdrops as the product.
 *
 * A gallery of real backdrop builds, grouped into one horizontally
 * scrolling carousel per category (Birthday, 100 Days & Naming, Baby
 * Shower & Gender Reveal, Other) — owner request, 13 Oct 2026, replacing
 * filter-pill buttons over a single grid which didn't read well on mobile
 * or desktop. Each photo carries a short caption (occasion/theme, from the
 * photo's own signage — no invented venues). No prices or quantities
 * (BRIEF.md §4). Reachable from the Birthdays & Celebrations service card
 * and the Services nav dropdown. The WhatsApp CTA names this page in the
 * pre-filled message so the enquiry source is visible in the chat.
 *
 * Reviews (UX review, 16 Oct 2026): testimonials previously only lived on
 * the homepage, not here where a visitor is actually deciding — same real
 * TESTIMONIALS data, same carousel component, shown below the gallery.
 *
 * FAQ (UX review, 16 Oct 2026; shown on home too since 23 Oct 2026): see
 * shared/faq.ts for why most answers stay general rather than naming
 * unconfirmed numbers.
 *
 * Carousel arrows (UX review, 16 Oct 2026): previous/next buttons on
 * tablet/desktop (hidden on mobile, where touch swipe already works) —
 * see the carouselState/scrollCarousel members above.
 */
@Component({
  selector: 'app-backdrops',
  imports: [ReviewsCarousel, FaqAccordion],
  templateUrl: './backdrops.html',
  styleUrl: './backdrops.scss',
})
export class Backdrops {
  protected readonly whatsappHref = pageWhatsappLink('Birthdays & Celebrations');
  protected readonly groups = BACKDROP_GROUPS;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly faqs = FAQS;

  // Carousel arrows (UX review, 16 Oct 2026 — the carousels had no controls,
  // so mouse users couldn't tell they scroll). One scroll state per category
  // (atStart/atEnd), used to disable the matching arrow at each end. Read
  // after the first render (afterNextRender), same pattern as the hero image
  // pick in home.ts — mutating carouselState any earlier (e.g. in
  // ngAfterViewInit) trips Angular's "changed after checked" dev-mode guard.
  @ViewChildren('carouselRef') private carouselRefs!: QueryList<ElementRef<HTMLUListElement>>;
  private readonly carouselElements = new Map<string, HTMLUListElement>();
  protected readonly carouselState: Record<string, CarouselScrollState> = {};

  constructor() {
    afterNextRender(() => {
      const refs = this.carouselRefs.toArray();
      this.groups.forEach((group, i) => {
        const el = refs[i]?.nativeElement;
        if (!el) {
          return;
        }
        this.carouselElements.set(group.category, el);
        this.carouselState[group.category] = this.readScrollState(el);
      });
    });
  }

  private readScrollState(el: HTMLUListElement): CarouselScrollState {
    return {
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    };
  }

  protected onCarouselScroll(category: string, event: Event): void {
    this.carouselState[category] = this.readScrollState(event.target as HTMLUListElement);
  }

  protected scrollCarousel(category: string, direction: 'prev' | 'next'): void {
    const el = this.carouselElements.get(category);
    if (!el) {
      return;
    }
    const amount = el.clientWidth * 0.9 * (direction === 'next' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
