// "Other Services We Provide" homepage section data (Homepage — Services &
// Occasions Redesign v1.0, 10 Oct 2026, §R4; food items grouped into one
// "Food Station" entry per owner request 10 Oct 2026 — see summary in
// chat). One array so adding, removing or reordering an item is a
// one-line change (R4.7). No photos — these are icon + title + line items
// by design (R4.2); icon names map to the inline SVGs rendered in home.html.

import { whatsappLink } from './contact';

export type AddOnIcon = 'popcorn' | 'castle' | 'balloon' | 'microphone';

export interface AddOn {
  id: string;
  title: string;
  line: string;
  icon: AddOnIcon;
  waLink: string;
}

function addOnWaLink(addOn: string): string {
  return whatsappLink(`Hi LinkNow, I'd like to enquire about a ${addOn} for my event.`);
}

export const ADDONS: readonly AddOn[] = [
  {
    id: 'food-station',
    title: 'Food Station',
    line: 'Popcorn, ice cream or candy floss — freshly made on the spot.',
    icon: 'popcorn',
    waLink: addOnWaLink('food station (popcorn, ice cream or candy floss)'),
  },
  {
    id: 'bouncy-castle',
    title: 'Bouncy Castle',
    line: 'Hours of safe, bouncy fun for the kids.',
    icon: 'castle',
    waLink: addOnWaLink('bouncy castle'),
  },
  {
    id: 'balloon-sculpting',
    title: 'Balloon Sculpting',
    line: 'A roving balloon artist making animals and shapes for the kids.',
    icon: 'balloon',
    waLink: addOnWaLink('balloon sculpting session'),
  },
  {
    id: 'party-hosting',
    title: 'Party Hosting',
    line: 'Games and emcee to keep the energy up.',
    icon: 'microphone',
    waLink: addOnWaLink('party hosting service'),
  },
];

export const ADDONS_WA_LINK = whatsappLink(
  "Hi LinkNow, I'd like to ask about your other services (food station, bouncy castle, balloon " +
    'sculpting, party hosting).',
);
