import { Component, computed, signal } from '@angular/core';
import { pageWhatsappLink } from '../../shared/contact';
import { BACKDROP_CATEGORIES, BACKDROPS, BackdropCategory } from './backdrops.data';

/**
 * Custom Backdrops portfolio page (route '/backdrops').
 *
 * A gallery of real backdrop builds — photo tiles only, no prices or
 * quantities (BRIEF.md §4). Each photo carries a short caption (occasion/
 * theme, from the photo's own signage — no invented venues) and a category,
 * filterable by the buttons above the grid (owner request, 12 Oct 2026).
 * Reachable from the Custom Backdrops service card and the Services nav
 * dropdown. The WhatsApp CTA names this page in the pre-filled message so
 * the enquiry source is visible in the chat.
 */
@Component({
  selector: 'app-backdrops',
  imports: [],
  templateUrl: './backdrops.html',
  styleUrl: './backdrops.scss',
})
export class Backdrops {
  protected readonly whatsappHref = pageWhatsappLink('Custom Backdrops');
  protected readonly backdrops = BACKDROPS;
  protected readonly categories = BACKDROP_CATEGORIES;

  protected readonly activeFilter = signal<BackdropCategory | 'All'>('All');

  protected readonly filtered = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All' ? this.backdrops : this.backdrops.filter((b) => b.category === filter);
  });

  protected setFilter(filter: BackdropCategory | 'All'): void {
    this.activeFilter.set(filter);
  }
}
