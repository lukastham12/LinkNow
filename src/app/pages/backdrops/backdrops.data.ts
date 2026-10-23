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
// Captions are theme-only, with NO child's name (owner request, 22 Oct
// 2026 — a parent browsing could wonder whether their own child's name
// would end up here too, and there's no record of those parents agreeing
// to be named). Previously several captions used a full name lifted
// straight from the backdrop's own signage (e.g. "Sharan Nikitharan's 1st
// birthday" for backdrop-24, "Azkayra Nur Aasyifa's birthday" for
// backdrop-13) — every one of those was rewritten to describe the theme
// instead. Don't reintroduce a name into a caption without the owner
// confirming that family agreed to be named publicly.
//
// "Other" category removed entirely (owner request, 22 Oct 2026 — it
// diluted a birthday-focused page with non-birthday content). Its 3 photos
// (backdrop-04 Easter, backdrop-06 Ganesh prayer function, backdrop-23
// Sparkle & Co.) are no longer shown here. backdrop-23 already has its own
// case study on /corporate (shared/corporate-case-studies.ts) so it's not
// lost — just not duplicated here. backdrop-04 and backdrop-06 currently
// have NO page they're shown on; they weren't moved to /corporate because
// that page's case studies each need a brief/build/result narrative this
// pair doesn't have — flag to the owner for where these two belong, rather
// than guess.
//
// backdrop-08 and backdrop-09 are the Avocadoria in-store event photos; they
// now live on the Corporate Events page (/corporate) and are intentionally
// excluded here (ticket 007). backdrop-16 is also excluded — a duplicate
// upload of the same "Our Little Hunny" gender-reveal photo as backdrop-25
// (owner request, 23 Oct 2026) — leaving backdrop-01…25 minus those five as
// gallery items.
//
// backdrop-12's caption dropped "16th" (owner request, 22 Oct 2026) — now
// "Gold and black birthday backdrop", age-generic. With backdrop-14
// ("Basketball-themed 16th birthday") also in this category, two explicit
// "16th birthday" captions overemphasised teen parties on a page already
// missing a 2–5-year-old's birthday (flagged separately — see CLAUDE.md);
// dropping the age from one of the two softens that without fabricating a
// toddler photo that doesn't exist.

export type BackdropCategory =
  | 'Birthday'
  | 'Grown-Up Celebrations'
  | '100 Days & Naming'
  | 'Baby Shower & Gender Reveal';

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
// backdrop-16 is the same "Our Little Hunny" gender-reveal photo as
// backdrop-25 (duplicate upload) — removed from here and from ORDER below
// (owner request, 23 Oct 2026).
const PHOTOS: Record<number, { caption: string; category: BackdropCategory }> = {
  25: { caption: 'Gender reveal balloon arch — "Our Little Hunny is on the way!"', category: 'Baby Shower & Gender Reveal' },
  2: { caption: '100 Days backdrop', category: '100 Days & Naming' },
  22: { caption: '28th birthday, Stitch-themed', category: 'Grown-Up Celebrations' },
  21: { caption: '55th birthday soirée', category: 'Grown-Up Celebrations' },
  18: { caption: 'Welcome backdrop for a newborn', category: 'Baby Shower & Gender Reveal' },
  19: { caption: 'Aqiqah naming-ceremony backdrop', category: '100 Days & Naming' },
  24: { caption: 'Safari-themed 1st birthday backdrop', category: 'Birthday' },
  15: { caption: '21st birthday', category: 'Grown-Up Celebrations' },
  17: { caption: 'Teddy-bear-themed 1st birthday backdrop', category: 'Birthday' },
  12: { caption: 'Gold and black birthday backdrop', category: 'Birthday' },
  5: { caption: 'Baby shower', category: 'Baby Shower & Gender Reveal' },
  7: { caption: 'Floral birthday backdrop', category: 'Birthday' },
  14: { caption: 'Basketball-themed 16th birthday', category: 'Birthday' },
  20: { caption: '8th birthday, Minecraft-themed', category: 'Birthday' },
  1: { caption: 'Naming ceremony backdrop for a little prince', category: '100 Days & Naming' },
  3: { caption: '30th birthday', category: 'Grown-Up Celebrations' },
  13: { caption: 'Kuromi-themed birthday backdrop', category: 'Birthday' },
  10: { caption: '1st birthday, pink and white balloon decor', category: 'Birthday' },
  11: { caption: 'Peppa Pig-themed birthday backdrop', category: 'Birthday' },
};

// backdrop-20 (Minecraft) moved up to lead the Birthday row (owner request,
// 22 Oct 2026 — "move the Minecraft card into the first three").
const ORDER = [25, 2, 22, 21, 18, 19, 20, 24, 15, 17, 12, 5, 7, 14, 1, 3, 13, 10, 11];

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

// Birthday first (owner request, 22 Oct 2026 — kids' birthdays should
// lead, since that's most of what this page's visitors are searching
// for). Reordered 23 Oct 2026 (owner request) — Baby Shower & Gender
// Reveal moved up to 2nd, Grown-Up Celebrations moved to last.
export const BACKDROP_CATEGORIES: readonly BackdropCategory[] = [
  'Birthday',
  'Baby Shower & Gender Reveal',
  '100 Days & Naming',
  'Grown-Up Celebrations',
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
