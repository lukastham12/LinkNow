// Client testimonials — single source of truth (used by the home teaser and,
// later, a dedicated Testimonials page).
//
// POLICY: only real, verified **5-star Google reviews** belong here. Every
// entry is displayed with a 5-star rating, so `rating` must always be 5. Do NOT
// invent, paraphrase, or embellish reviews — paste the customer's own words.
//
// Until the owner supplies real reviews (BRIEF.md §12), keep this array EMPTY.
// Components read the empty state and show a clearly-marked "coming soon" note
// instead of fabricated content.

export interface Testimonial {
  /** Reviewer's name as shown on their Google review. */
  author: string;
  /** The review text, verbatim. */
  quote: string;
  /** Always 5 — only 5-star reviews are listed here. */
  rating: 5;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  // Intentionally empty until real 5-star Google reviews are supplied by the
  // owner. Add entries as: { author: '...', quote: '...', rating: 5 }.
];
