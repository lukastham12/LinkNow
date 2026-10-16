import { afterNextRender, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { pageWhatsappLink, GOOGLE_REVIEWS_URL } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { ReviewsCarousel } from '../../components/reviews-carousel/reviews-carousel';
import { BACKDROP_GROUPS } from './backdrops.data';

interface CarouselScrollState {
  atStart: boolean;
  atEnd: boolean;
}

interface Faq {
  question: string;
  answer: string;
}

// FAQ (UX review, 16 Oct 2026): a shortlisting visitor had no answers on
// lead time, venues, what's included, deposit/cancellation or rain backup
// before messaging. Answers stay deliberately general rather than naming a
// specific minimum lead time, a deposit percentage or a cancellation
// window — none of those are confirmed business policy, so none are
// claimed; each answer routes the specifics to a WhatsApp conversation
// instead of inventing a number.
const FAQS: readonly Faq[] = [
  {
    question: 'How far ahead do we need to book?',
    answer:
      "There's no fixed cut-off — message us with your date on WhatsApp and we'll tell you straight away whether it's doable. The earlier you reach out, the more design options we'll have time to plan.",
  },
  {
    question: 'Do you set up in condo function rooms, void decks or HDB spaces?',
    answer:
      "Yes — we regularly build in condo function rooms, void decks, HDB flats, hotels and offices across Singapore. If your venue needs its own booking or permit (a void deck or function room, for example), that's arranged on your end; just tell us the space and we'll plan the setup around it.",
  },
  {
    question: 'What does a backdrop include — is setup and teardown part of it?',
    answer:
      "Every backdrop is quoted as a full job, not a bare backdrop: delivery, setup and teardown are part of what you're quoted for, and the design is sized to fit your space. Share your venue and theme on WhatsApp and we'll confirm exactly what's included for your event.",
  },
  {
    question: "What's your deposit and cancellation policy?",
    answer:
      "Deposit and cancellation terms are confirmed with your quote, since they depend on the scale of the job — ask us on WhatsApp before you commit to anything and we'll walk you through it.",
  },
  {
    question: 'What if the event is outdoors and it rains?',
    answer:
      "For outdoor setups we'll talk through a rain backup — a sheltered spot, timing buffer or indoor alternative — before the day, so there's a plan in place either way.",
  },
];

/**
 * Custom Backdrops portfolio page (route '/backdrops').
 *
 * A gallery of real backdrop builds, grouped into one horizontally
 * scrolling carousel per category (Birthday, 100 Days & Naming, Baby
 * Shower & Gender Reveal, Other) — owner request, 13 Oct 2026, replacing
 * filter-pill buttons over a single grid which didn't read well on mobile
 * or desktop. Each photo carries a short caption (occasion/theme, from the
 * photo's own signage — no invented venues). No prices or quantities
 * (BRIEF.md §4). Reachable from the Custom Backdrops service card and the
 * Services nav dropdown. The WhatsApp CTA names this page in the
 * pre-filled message so the enquiry source is visible in the chat.
 *
 * Reviews (UX review, 16 Oct 2026): testimonials previously only lived on
 * the homepage, not here where a visitor is actually deciding — same real
 * TESTIMONIALS data, same carousel component, shown below the gallery.
 *
 * FAQ (UX review, 16 Oct 2026): see FAQS above for why the answers stay
 * general rather than naming unconfirmed numbers.
 *
 * Carousel arrows (UX review, 16 Oct 2026): previous/next buttons on
 * tablet/desktop (hidden on mobile, where touch swipe already works) —
 * see the carouselState/scrollCarousel members above.
 */
@Component({
  selector: 'app-backdrops',
  imports: [ReviewsCarousel],
  templateUrl: './backdrops.html',
  styleUrl: './backdrops.scss',
})
export class Backdrops {
  protected readonly whatsappHref = pageWhatsappLink('Custom Backdrops');
  protected readonly groups = BACKDROP_GROUPS;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly faqs = FAQS;
  protected readonly googleReviewsUrl = GOOGLE_REVIEWS_URL;

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
