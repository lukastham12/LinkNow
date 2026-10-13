// Custom-backdrop portfolio photos — single source of truth for the /backdrops
// gallery. These are REAL scene photos of LinkNow builds (public/backdrops/);
// they are displayed as-is (no background removal). Gallery only — no prices
// or quantities (BRIEF.md §4).
//
// Captions/categories (owner request, 12 Oct 2026) are drawn only from what's
// genuinely visible in each photo's own signage/banner — no invented client
// names, venues or dates. Venue isn't captioned: it isn't recorded per photo
// and isn't legible in the photos themselves, so it's left out rather than
// guessed.
//
// backdrop-08 and backdrop-09 are the Avocaderia in-store event photos; they
// now live on the Corporate Events page (/corporate) and are intentionally
// excluded here (ticket 007), leaving backdrop-01…25 minus the two corporate
// shots as gallery items.

export type BackdropCategory = 'Birthday' | '100 Days & Naming' | 'Baby Shower & Gender Reveal' | 'Other';

export interface BackdropPhoto {
  /** Path under public/ (served at the site root). */
  src: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
  /** Short visible caption — occasion/theme, from the photo's own signage. */
  caption: string;
  category: BackdropCategory;
}

// Curated display order (most eye-catching/premium-looking first), not file
// order — the strongest designs lead so first-time visitors are hooked
// before they scroll. Re-order this list to change what leads.
const PHOTOS: Record<number, { caption: string; category: BackdropCategory }> = {
  25: { caption: 'Gender reveal balloon arch — "Our Little Hunny is on the way!"', category: 'Baby Shower & Gender Reveal' },
  2: { caption: "Daxton's 100 Days backdrop", category: '100 Days & Naming' },
  22: { caption: "Elakiya's 28th birthday, Stitch-themed", category: 'Birthday' },
  21: { caption: "Lady Julie's 55th birthday soirée", category: 'Birthday' },
  23: { caption: 'Sparkle & Co. retail pop-up backdrop', category: 'Other' },
  18: { caption: 'Welcome backdrop for newborn Aarav Xayyan', category: 'Baby Shower & Gender Reveal' },
  19: { caption: 'Aqiqah naming-ceremony backdrop', category: '100 Days & Naming' },
  24: { caption: "Sharan Nikitharan's 1st birthday, safari-themed", category: 'Birthday' },
  15: { caption: "Vishal Arivin Enrico's 21st birthday", category: 'Birthday' },
  17: { caption: "Raphael's 1st birthday", category: 'Birthday' },
  12: { caption: '16th birthday, gold & black', category: 'Birthday' },
  5: { caption: "Farzanah's baby shower", category: 'Baby Shower & Gender Reveal' },
  7: { caption: 'Floral birthday backdrop', category: 'Birthday' },
  14: { caption: "Iymran Firman's basketball-themed 16th birthday", category: 'Birthday' },
  20: { caption: "Enzo's 8th birthday, Minecraft-themed", category: 'Birthday' },
  1: { caption: 'Naming ceremony backdrop for a little prince', category: '100 Days & Naming' },
  4: { caption: 'Easter "He is Risen" backdrop', category: 'Other' },
  16: { caption: 'Gender reveal balloon arch — "Our Little Hunny is on the way!"', category: 'Baby Shower & Gender Reveal' },
  6: { caption: 'Ganesh prayer-function backdrop', category: 'Other' },
  3: { caption: "Herman Keh's 30th birthday", category: 'Birthday' },
  13: { caption: "Azkayra Nur Aasyifa's birthday, Kuromi-themed", category: 'Birthday' },
  10: { caption: "Leia's 1st birthday", category: 'Birthday' },
  11: { caption: 'Peppa Pig-themed birthday backdrop', category: 'Birthday' },
};

const ORDER = [
  25, 2, 22, 21, 23, 18, 19, 24, 15, 17, 12, 5, 7, 14, 20, 1, 4, 16, 6, 3, 13, 10, 11,
];

export const BACKDROPS: readonly BackdropPhoto[] = ORDER.map((num) => {
  const n = String(num).padStart(2, '0');
  const { caption, category } = PHOTOS[num];
  return {
    src: `/backdrops/backdrop-${n}.jpg`,
    alt: `${caption} — custom event backdrop by LinkNow`,
    caption,
    category,
  };
});

export const BACKDROP_CATEGORIES: readonly BackdropCategory[] = [
  'Birthday',
  '100 Days & Naming',
  'Baby Shower & Gender Reveal',
  'Other',
];

export interface BackdropGroup {
  category: BackdropCategory;
  photos: readonly BackdropPhoto[];
}

// Grouped by category, in BACKDROP_CATEGORIES order — each group renders as
// its own horizontally-scrolling carousel (owner request, 13 Oct 2026:
// filter-pill buttons over one grid didn't read well on mobile or desktop;
// category-grouped carousels are the more common pattern on modern
// portfolio/case-study sites, and surface every category at a glance
// instead of hiding them behind a click).
export const BACKDROP_GROUPS: readonly BackdropGroup[] = BACKDROP_CATEGORIES.map((category) => ({
  category,
  photos: BACKDROPS.filter((b) => b.category === category),
}));
