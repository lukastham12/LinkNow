import { Component, input } from '@angular/core';
import { Faq } from '../../shared/faq';

/**
 * Shared FAQ accordion — extracted 20 Oct 2026 (owner request: "improve
 * the look and feel to make it more modernized... have a + sign to
 * expand") from three near-identical copies on the homepage, /backdrops and
 * /corporate, so the modernised look lives in one place instead of being
 * kept in sync across three templates by hand. `eyebrow`/`title` stay
 * per-page inputs since the heading copy differs ("Good to Know" vs "For
 * Businesses FAQ", sentence case vs title case); `faqs` is either the
 * shared `FAQS` array (home/backdrops) or a page-local one (corporate).
 */
@Component({
  selector: 'app-faq-accordion',
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordion {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly faqs = input.required<readonly Faq[]>();
}
