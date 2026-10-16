// Shared FAQ data — shown on /backdrops (below the gallery) and on the
// homepage (above "Planning something?", UX review, 23 Oct 2026 — the same
// pre-enquiry questions a visitor has apply site-wide, not just once they've
// reached the backdrops gallery).
//
// Answers stay deliberately general — no specific deposit percentage or
// cancellation window is named, since neither is confirmed business policy.
// The lead-time answer is the one exception: the owner confirmed "2–3 weeks
// ahead is ideal; last-minute requests are often possible" (23 Oct 2026), so
// that one fact is now stated directly rather than deferred to WhatsApp.

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: readonly Faq[] = [
  {
    question: 'How far ahead do we need to book?',
    answer:
      "There's no fixed cut-off — message us with your date on WhatsApp and we'll tell you straight away whether it's doable. The earlier you reach out, the more design options we'll have time to plan. 2–3 weeks ahead is ideal; last-minute requests are often possible, just ask.",
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
