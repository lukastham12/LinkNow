// "Add to your event" homepage section data (Homepage — Services & Occasions
// Redesign v1.0, 10 Oct 2026, §R4). One array so adding, removing or
// reordering an add-on is a one-line change (R4.7). No photos — these are
// icon + title + line items by design (R4.2); icon names map to the inline
// SVGs rendered by AddonCard.

import { whatsappLink } from './contact';

export type AddOnIcon = 'popcorn' | 'candy-floss' | 'castle' | 'balloon' | 'microphone';

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
    id: 'popcorn',
    title: 'Live Popcorn Station',
    line: 'Freshly popped on the spot — a hit with every crowd.',
    icon: 'popcorn',
    waLink: addOnWaLink('live popcorn station'),
  },
  {
    id: 'candy-floss',
    title: 'Candy Floss Station',
    line: 'Spun fresh in your colours, a sweet crowd favourite.',
    icon: 'candy-floss',
    waLink: addOnWaLink('candy floss station'),
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
  "Hi LinkNow, I'd like to ask about your party add-ons (popcorn, candy floss, bouncy castle, " +
    'balloon sculpting, party hosting).',
);
