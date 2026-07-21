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
  /** The review text, verbatim. */
  quote: string;
  /** Always 5 — only 5-star reviews are listed here. */
  rating: 5;
}

// NOTE: reviewer names are deliberately NOT stored here. The site shows a
// neutral "Verified Google review" attribution instead of individual names
// (owner request), so names are neither displayed nor shipped in the JS bundle.

// Real 5-star Google reviews supplied by the owner (Google Business Profile for
// LinkNow Pte Ltd). Lightly tidied for spelling/emoji only — wording is the
// reviewer's own. The one non-positive review was intentionally excluded per the
// 5-star-only policy above.
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'Thank you for the big and beautiful bouquet! And personalised service — the owner ' +
      'Novestela really goes the extra mile for her customers. Can’t wait to surprise my MIL ' +
      'with this on Mother’s Day!',
    rating: 5,
  },
  {
    quote:
      'I can’t thank you enough for the amazing birthday backdrop decor! It truly elevated the ' +
      'whole celebration and made my special day extra memorable. Excellent pricing and perfect ' +
      'punctuality. You are the best, Nove!',
    rating: 5,
  },
  {
    quote:
      'We had such a wonderful experience with this company for our baby’s 100-day celebration. ' +
      'From the very beginning, they were incredibly attentive, patient, and responsive to every ' +
      'detail we wanted.',
    rating: 5,
  },
  {
    quote:
      'Did my baby shower decoration, it turned out exactly how I envisioned it to be. Will ' +
      'definitely engage them again for future events! Highly recommended.',
    rating: 5,
  },
  {
    quote:
      'Thanks Novi for the speedy delivery of these soap flower bouquets! Service is superb and ' +
      'helped to make sure everything was delivered on time. Bouquets are huge and everyone ' +
      'loves it! Will definitely engage Novi for future occasions!',
    rating: 5,
  },
  {
    quote:
      'A big thank you to Novi! Wonderful decorations and such friendly service. Everything was ' +
      'handled with great care, and she made sure the decor looked perfect. Thank you so much for ' +
      'making our son’s birthday celebration truly special.',
    rating: 5,
  },
  {
    quote:
      'A big thank you to Ms. Novi for decorating the birthday backdrop for my granddaughter’s ' +
      '1st birthday!',
    rating: 5,
  },
  {
    quote:
      'I took her service at the last minute today at 4 pm. She did a very good job for my ' +
      'birthday party. I am very happy with the job done. She is very friendly.',
    rating: 5,
  },
];
