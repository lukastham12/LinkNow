// "Events we style" homepage section data (Homepage — Services & Occasions
// Redesign v1.0, 10 Oct 2026, §7). One array so adding, removing or
// reordering an occasion is a one-line change (R2.7). All images are
// existing repo photos (BRIEF.md: no new images) — the "other" tile has no
// photo by design (R2.6/R2.8) and the component falls back to a styled
// placeholder for any occasion without an image.

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
    id: 'birthdays',
    title: 'Birthdays',
    description: "Kids' parties to milestone 21sts and 50ths.",
    image: '/backdrops/backdrop-20.jpg',
    imageAlt: 'Minecraft-themed birthday backdrop with balloon decorations by LinkNow Events Co.',
    waLink: occasionWaLink('birthday'),
  },
  {
    id: 'baby-milestones',
    title: '1st Birthday & 100 Days',
    description: "Sweet setups for baby's big milestones.",
    image: '/backdrops/backdrop-02.jpg',
    imageAlt: "Balloon-garland celebration setup for a baby's 100 Days by LinkNow Events Co.",
    waLink: occasionWaLink('1st birthday or 100 days celebration'),
  },
  {
    id: 'baby-shower',
    title: 'Baby Showers & Gender Reveals',
    description: 'Soft, themed décor for the mum-to-be.',
    image: '/backdrops/backdrop-25.jpg',
    imageAlt: 'Winnie the Pooh-themed gender reveal backdrop by LinkNow Events Co.',
    waLink: occasionWaLink('baby shower or gender reveal'),
  },
  {
    id: 'weddings',
    title: 'Weddings & ROM',
    description: 'Floral and backdrop styling for your big day.',
    image: '/flowers/custom-arrangement-hero.jpg',
    imageAlt: 'Bespoke floral centrepiece styled for a wedding table by LinkNow Events Co.',
    waLink: occasionWaLink('wedding or ROM'),
  },
  {
    id: 'bachelor',
    title: 'Bachelor & Bachelorette Parties',
    description: 'Fun, photo-ready setups for the night.',
    image: '/backdrops/backdrop-15.jpg',
    imageAlt: 'Gold balloon-garland backdrop for a milestone adult birthday by LinkNow Events Co.',
    waLink: occasionWaLink('bachelor or bachelorette party'),
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
    title: 'Corporate & Community Events',
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
