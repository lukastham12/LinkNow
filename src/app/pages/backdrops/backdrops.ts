import { Component } from '@angular/core';
import { pageWhatsappLink } from '../../shared/contact';
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
 */
@Component({
  selector: 'app-backdrops',
  imports: [],
  templateUrl: './backdrops.html',
  styleUrl: './backdrops.scss',
})
export class Backdrops {
  protected readonly whatsappHref = pageWhatsappLink('Custom Backdrops');
  protected readonly groups = BACKDROP_GROUPS;
}
