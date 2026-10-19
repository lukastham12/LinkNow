// "Other Services We Provide" homepage section data (Homepage — Services &
// Occasions Redesign v1.0, 10 Oct 2026, §R4). One array so adding, removing
// or reordering an item is a one-line change (R4.7). Icon names map to the
// inline SVGs rendered in events-we-style.html.
//
// Starting prices (owner request, 19 Oct 2026 — explicit, deliberate
// override of BRIEF.md §4's "no package catalogue, no 'from $X' pricing"
// rule). Originally sourced from LinkNow_RateCard.pdf (Corporate Rate Card
// 2026 §5 "Guest engagement add-ons", rates effective 17 Oct 2026), which
// priced only "Popcorn station: From $260/day" for food & drink add-ons.
// Superseded same day by owner-supplied prices from a different reference
// (a vendor catalogue screenshot), which price Popcorn Station, Candy Floss
// and Soft Serve Ice Cream individually — Food Station was split into these
// three separate cards to match (was one combined "Ice Cream & Candy Floss"
// card). The $260 popcorn figure from the rate card PDF is intentionally
// NOT used below; $220 (the newer, owner-confirmed figure) is. Neither
// source gives a per-unit label (day/guest/hour) for these three, so none
// is shown — don't invent one. Chocolate Fondue and Mini Churros appeared
// in that same reference image but were NOT added here (owner declined,
// 19 Oct 2026) — don't add them without the owner asking again. Buffet
// Catering has no price from either source ("quoted per event" per the
// rate card's own terms) and stays price-free. Bouncy Castle, Balloon
// Sculpting and Party Hosting still carry their rate-card figures
// ($110/day, $140/day, $90/hour respectively) — unaffected by the newer
// reference, which didn't cover them.
//
// These are *corporate* rate-card figures (plus the newer food & drink
// figures) shown on a section that also serves retail/birthday visitors —
// see the section__intro note in events-we-style.html about the
// coordination fee for standalone bookings.

import { whatsappLink } from './contact';

export type AddOnIcon =
  | 'popcorn'
  | 'candyfloss'
  | 'icecream'
  | 'buffet'
  | 'castle'
  | 'balloon'
  | 'microphone';

export interface AddOn {
  id: string;
  title: string;
  line: string;
  icon: AddOnIcon;
  waLink: string;
  /** Starting price, e.g. "From $110 / day". Omit when no confirmed figure exists — never invent one. */
  price?: string;
}

function addOnWaLink(addOn: string): string {
  return whatsappLink(`Hi LinkNow, I'd like to enquire about a ${addOn} for my event.`);
}

export const ADDONS: readonly AddOn[] = [
  {
    id: 'popcorn-station',
    title: 'Popcorn Station',
    line: 'Fresh-popped, flavour-packed party snacks.',
    icon: 'popcorn',
    waLink: addOnWaLink('popcorn station'),
    price: 'From $220',
  },
  {
    id: 'candy-floss',
    title: 'Candy Floss',
    line: 'Spun fresh, in any colour you want.',
    icon: 'candyfloss',
    waLink: addOnWaLink('candy floss station'),
    price: 'From $220',
  },
  {
    id: 'soft-serve-ice-cream',
    title: 'Soft Serve Ice Cream',
    line: 'Creamy soft serve — a crowd favourite.',
    icon: 'icecream',
    waLink: addOnWaLink('soft serve ice cream station'),
    price: 'From $420',
  },
  {
    id: 'buffet-catering',
    title: 'Buffet Catering',
    line: 'A full buffet spread catered for your event, any headcount.',
    icon: 'buffet',
    waLink: addOnWaLink('buffet catering'),
  },
  {
    id: 'bouncy-castle',
    title: 'Bouncy Castle',
    line: "Hours of safe, bouncy fun for kids' parties.",
    icon: 'castle',
    waLink: addOnWaLink('bouncy castle'),
    price: 'From $110 / day',
  },
  {
    id: 'balloon-sculpting',
    title: 'Balloon Sculpting',
    line: 'A roving balloon artist making animals and shapes for kids and grown-ups alike.',
    icon: 'balloon',
    waLink: addOnWaLink('balloon sculpting session'),
    price: 'From $140 / day',
  },
  {
    id: 'party-hosting',
    title: 'Party Hosting',
    line: 'Games and emcee to keep the energy up.',
    icon: 'microphone',
    waLink: addOnWaLink('party hosting service'),
    price: 'From $90 / hour',
  },
];

export const ADDONS_WA_LINK = whatsappLink(
  "Hi LinkNow, I'd like to ask about your other services (popcorn station, candy floss, soft " +
    'serve ice cream, buffet catering, bouncy castle, balloon sculpting, party hosting).',
);
