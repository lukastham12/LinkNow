// Custom-backdrop portfolio photos — single source of truth for the /backdrops
// gallery. These are REAL scene photos of LinkNow builds (public/backdrops/);
// they are displayed as-is (no background removal). Gallery only — no prices,
// no quantities, no per-item messages (BRIEF.md §4). WhatsApp is the sole
// enquiry channel.
//
// backdrop-08 and backdrop-09 are the Avocaderia in-store event photos; they
// now live on the Corporate Events page (/corporate) and are intentionally
// excluded here (ticket 007), leaving 18 gallery items (backdrop-01…20
// minus the two corporate shots).

export interface BackdropPhoto {
  /** Path under public/ (served at the site root). */
  src: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
}

// Curated display order (most eye-catching/premium-looking first), not file
// order — the strongest designs lead so first-time visitors are hooked
// before they scroll. Re-order this list to change what leads; add a number
// to feature a new backdrop-NN.jpg.
const ORDER = [2, 18, 19, 15, 17, 12, 5, 7, 14, 20, 1, 4, 16, 6, 3, 13, 10, 11];

export const BACKDROPS: readonly BackdropPhoto[] = ORDER.map((num) => {
  const n = String(num).padStart(2, '0');
  return {
    src: `/backdrops/backdrop-${n}.jpg`,
    alt: `Custom event backdrop designed and built by LinkNow Events Co. — design ${num}`,
  };
});
