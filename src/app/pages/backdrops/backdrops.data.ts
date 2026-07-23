// Custom-backdrop portfolio photos — single source of truth for the /backdrops
// gallery. These are REAL scene photos of LinkNow builds (public/backdrops/);
// they are displayed as-is (no background removal). Gallery only — no prices,
// no quantities, no per-item messages (BRIEF.md §4). WhatsApp is the sole
// enquiry channel.
//
// backdrop-08 and backdrop-09 are the Avocaderia in-store event photos; they
// now live on the Corporate Events page (/corporate) and are intentionally
// excluded here (ticket 007), leaving 12 gallery items.

export interface BackdropPhoto {
  /** Path under public/ (served at the site root). */
  src: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
}

// The Avocaderia photos moved to /corporate; the gallery skips them.
const EXCLUDED = new Set([8, 9]);

// 12 photos (of backdrop-01…14, minus the two corporate shots).
export const BACKDROPS: readonly BackdropPhoto[] = Array.from({ length: 14 }, (_, i) => i + 1)
  .filter((num) => !EXCLUDED.has(num))
  .map((num) => {
    const n = String(num).padStart(2, '0');
    return {
      src: `/backdrops/backdrop-${n}.jpg`,
      alt: `Custom event backdrop designed and built by LinkNow Events Co. — design ${num}`,
    };
  });
