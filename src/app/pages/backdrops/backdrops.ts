import { Component } from '@angular/core';
import { pageWhatsappLink } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { ReviewsCarousel } from '../../components/reviews-carousel/reviews-carousel';
import { BACKDROP_GROUPS } from './backdrops.data';

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
}
