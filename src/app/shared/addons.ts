// "Other Services We Provide" homepage section data (Homepage — Services &
// Occasions Redesign v1.0, 10 Oct 2026, §R4). One array so adding, removing
// or reordering an item is a one-line change (R4.7). Icon names map to the
// inline SVGs rendered in events-we-style.html.
//
// Starting prices (owner request, 19 Oct 2026 — explicit, deliberate
// override of BRIEF.md §4's "no package catalogue, no 'from $X' pricing"
// rule, sourced from LinkNow_RateCard.pdf, Corporate Rate Card 2026 §5
// "Guest engagement add-ons", rates effective 17 Oct 2026): Food Station
// was split into Popcorn Station (priced — the rate card only prices
// popcorn, "From $260" per day) and Ice Cream & Candy Floss (no rate-card
// price, so no price shown — don't invent one). Buffet Catering has no
// rate-card price either ("quoted per event" per the terms) and stays
// price-free. Bouncy Castle, Balloon Sculpting and Party Hosting carry
// their rate-card figures ($110/day, $140/day, $90/hour respectively).
// These are *corporate* rate-card figures shown on a section that also
// serves retail/birthday visitors — see the section__intro note in
// events-we-style.html about the coordination fee for standalone bookings.

import { whatsappLink } from './contact';

export type AddOnIcon = 'popcorn' | 'icecream' | 'buffet' | 'castle' | 'balloon' | 'microphone';

export interface AddOn {
  id: string;
  title: string;
  line: string;
  icon: AddOnIcon;
  waLink: string;
  /** Starting price, e.g. "From $110 / day". Omit when no rate-card figure exists — never invent one. */
  price?: string;
}

function addOnWaLink(addOn: string): string {
  return whatsappLink(`Hi LinkNow, I'd like to enquire about a ${addOn} for my event.`);
}

export const ADDONS: readonly AddOn[] = [
  {
    id: 'popcorn-station',
    title: 'Popcorn Station',
    line: 'Freshly popped popcorn, made on the spot.',
    icon: 'popcorn',
    waLink: addOnWaLink('popcorn station'),
    price: 'From $260 / day',
  },
  {
    id: 'ice-cream-candy-floss',
    title: 'Ice Cream & Candy Floss',
    line: 'Soft-serve ice cream or spun candy floss, made fresh for your guests.',
    icon: 'icecream',
    waLink: addOnWaLink('ice cream or candy floss station'),
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
  "Hi LinkNow, I'd like to ask about your other services (popcorn station, ice cream or candy " +
    'floss, buffet catering, bouncy castle, balloon sculpting, party hosting).',
);
