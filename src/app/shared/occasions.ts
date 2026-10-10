// "Events we style" homepage section data (Homepage — Services & Occasions
// Redesign v1.0, 10 Oct 2026, §7; occasions later grouped per owner
// request 10 Oct 2026 — see summary in chat). One array so adding,
// removing or reordering an occasion is a one-line change (R2.7). All
// images are existing repo photos (BRIEF.md: no new images) — the "other"
// tile has no photo by design (R2.6/R2.8) and the component falls back to
// a styled placeholder for any occasion without an image.

import { whatsappLink } from './contact';

export interface Occasion {
  id: string;
  title: string;
  description: string;
  /** Site-root-relative path under public/. Omitted only for the "other" tile. */
  image?: string;
  imageAlt?: string;
  waLink: string;
}

function occasionWaLink(occasion: string): string {
  return whatsappLink(
    `Hi LinkNow, I'm planning a ${occasion} and would like to enquire about decorations.`,
  );
}

export const OCCASIONS: readonly Occasion[] = [
  {
    id: 'birthdays-babies',
    title: 'Birthdays & Baby Celebrations',
    description: 'Birthdays, naming ceremonies, gender reveals and baby showers.',
    image: '/backdrops/backdrop-20.jpg',
    imageAlt: 'Minecraft-themed birthday backdrop with balloon decorations by LinkNow Events Co.',
    waLink: occasionWaLink(
      'birthday, naming ceremony, gender reveal or baby shower',
    ),
  },
  {
    id: 'weddings-bachelor',
    title: 'Weddings, ROM & Bachelor Parties',
    description: 'Styling for your wedding, ROM, or bachelor/bachelorette night.',
    image: '/flowers/custom-arrangement-hero.jpg',
    imageAlt: 'Bespoke floral centrepiece styled for a wedding table by LinkNow Events Co.',
    waLink: occasionWaLink('wedding, ROM, or bachelor/bachelorette party'),
  },
  {
    id: 'festive',
    title: 'Festive Celebrations',
    description: 'CNY, Hari Raya, Deepavali, Christmas and National Day.',
    image: '/backdrops/backdrop-08.jpg',
    imageAlt: 'Festive in-store balloon display styled by LinkNow Events Co.',
    waLink: occasionWaLink('festive celebration'),
  },
  {
    id: 'openings',
    title: 'Grand Openings & Open Houses',
    description: 'Balloon arches and entrances that draw a crowd.',
    image: '/corporate/peoples-association-01.jpg',
    imageAlt: "Balloon pillar entrance for a People's Association Open House by LinkNow Events Co.",
    waLink: occasionWaLink('grand opening or open house'),
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Family days, launches, school and CC events.',
    image: '/corporate/bucket-house-01.jpg',
    imageAlt: "Balloon-twisting entertainer at a preschool Children's Day event by LinkNow Events Co.",
    waLink: occasionWaLink('corporate or community event'),
  },
  {
    id: 'other',
    title: 'Something else?',
    description:
      "Planning a different occasion? Tell us about it — if it's a celebration, we can style it.",
    waLink: whatsappLink(
      "Hi LinkNow, I'm planning an event and would like to enquire about decorations. The occasion is:",
    ),
  },
];
