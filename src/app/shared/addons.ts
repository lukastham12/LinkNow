// "Other Services We Provide" homepage section data (Homepage — Services &
// Occasions Redesign v1.0, 10 Oct 2026, §R4). One array so adding, removing
// or reordering an item is a one-line change (R4.7). Icon names map to the
// inline SVGs rendered by the shared `app-addon-icon` component.
//
// Starting prices (owner request, 19 Oct 2026 — explicit, deliberate
// override of BRIEF.md §4's "no package catalogue, no 'from $X' pricing"
// rule). Originally sourced from LinkNow_RateCard.pdf (Corporate Rate Card
// 2026 §5 "Guest engagement add-ons", rates effective 17 Oct 2026), which
// only priced "Popcorn station: From $260/day" for food & drink and gave
// flat per-day/per-hour figures for Bouncy Castle ($110/day), Balloon
// Sculpting ($140/day) and Party Hosting ($90/hour).
//
// Superseded same day by owner-supplied prices from LinkNow's actual
// third-party vendor for these add-ons (a vendor catalogue with its own
// per-item detail pages — see shared/addon-details.ts), engaged 19 Oct 2026.
// That vendor prices Popcorn Station, Candy Floss and Soft Serve Ice Cream
// individually — Food Station was split into these three separate cards to
// match (was one combined "Ice Cream & Candy Floss" card). It also gives
// Bouncy Castle and Balloon Sculpting tiered hourly pricing instead of a
// flat day rate; the `price` fields below were updated to the vendor's
// lowest tier ("From $X") to match each item's detail page. Party Hosting
// and Buffet Catering are NOT covered by this vendor and keep their
// original rate-card figures / no-price status unchanged.
//
// `detailSlug` links an add-on to its own page (route '/services/:slug',
// pages/addon-detail for the 4 simple items, or a bespoke page for Buffet
// Catering — see below) with full pricing and a WhatsApp/email CTA. Only
// items with a real detail page carry one. Chocolate Fondue and Mini
// Churros also appeared in the food-station vendor's catalogue but were NOT
// added here (owner declined, 19 Oct 2026) — don't add them without being
// asked again.
//
// Buffet Catering (owner-supplied catalogues, 19 Oct 2026 — two PDFs from a
// second, separate third-party vendor, "Yea! Mama — Experiential Catering",
// engaged for buffet catering specifically): now has its own bespoke detail
// page (pages/buffet-catering/, route '/services/buffet-catering') — see
// shared/buffet-menu.ts for the full sourcing note. "From $18.90" is that
// vendor's lowest per-pax tier across every buffet line in both catalogues
// (Classic Buffet Standard and the Premium tier of the build-your-own
// buffet are tied at this price).
//
// `category` groups add-ons into the two sections shown on the dedicated
// /services/add-ons page and in the "Other Services We Provide" teaser
// (owner request, 19 Oct 2026 — "food station then candy floss, buffet
// etc, then entertainment like bouncy castle hosting etc").

import { whatsappLink } from './contact';

export type AddOnIcon =
  | 'popcorn'
  | 'candyfloss'
  | 'icecream'
  | 'buffet'
  | 'castle'
  | 'balloon'
  | 'microphone';

export type AddOnCategory = 'food' | 'entertainment';

export interface AddOn {
  id: string;
  title: string;
  line: string;
  icon: AddOnIcon;
  waLink: string;
  category: AddOnCategory;
  /** Starting price, e.g. "From $110 / day". Omit when no confirmed figure exists — never invent one. */
  price?: string;
  /** Slug of this add-on's own detail page (route '/services/:slug'), when it has one. */
  detailSlug?: string;
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
    category: 'food',
    price: 'From $220',
    detailSlug: 'popcorn-station',
  },
  {
    id: 'candy-floss',
    title: 'Candy Floss',
    line: 'Spun fresh, in any colour you want.',
    icon: 'candyfloss',
    waLink: addOnWaLink('candy floss station'),
    category: 'food',
    price: 'From $220',
    detailSlug: 'candy-floss',
  },
  {
    id: 'soft-serve-ice-cream',
    title: 'Soft Serve Ice Cream',
    line: 'Creamy soft serve — a crowd favourite.',
    icon: 'icecream',
    waLink: addOnWaLink('soft serve ice cream station'),
    category: 'food',
    price: 'From $420',
    detailSlug: 'soft-serve-ice-cream',
  },
  {
    id: 'buffet-catering',
    title: 'Buffet Catering',
    line: 'A full buffet spread catered for your event, any headcount.',
    icon: 'buffet',
    waLink: addOnWaLink('buffet catering'),
    category: 'food',
    price: 'From $18.90 / pax',
    detailSlug: 'buffet-catering',
  },
  {
    id: 'bouncy-castle',
    title: 'Bouncy Castle',
    line: "Hours of safe, bouncy fun for kids' parties.",
    icon: 'castle',
    waLink: addOnWaLink('bouncy castle'),
    category: 'entertainment',
    price: 'From $95',
    detailSlug: 'bouncy-castle',
  },
  {
    id: 'balloon-sculpting',
    title: 'Balloon Sculpting',
    line: 'A roving balloon artist making animals and shapes for kids and grown-ups alike.',
    icon: 'balloon',
    waLink: addOnWaLink('balloon sculpting session'),
    category: 'entertainment',
    price: 'From $120',
    detailSlug: 'balloon-sculpting',
  },
  {
    id: 'party-hosting',
    title: 'Party Hosting',
    line: 'Games and emcee to keep the energy up.',
    icon: 'microphone',
    waLink: addOnWaLink('party hosting service'),
    category: 'entertainment',
    price: 'From $90 / hour',
  },
];

export const ADDONS_WA_LINK = whatsappLink(
  "Hi LinkNow, I'd like to ask about your other services (popcorn station, candy floss, soft " +
    'serve ice cream, buffet catering, bouncy castle, balloon sculpting, party hosting).',
);
