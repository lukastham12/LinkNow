// Custom-backdrop portfolio photos — single source of truth for the /backdrops
// gallery. These are REAL scene photos of Linknow builds (public/backdrops/
// backdrop-01.jpg … backdrop-14.jpg); they are displayed as-is (no background
// removal). Gallery only — no prices, no quantities, no per-item messages
// (BRIEF.md §4). WhatsApp is the sole enquiry channel.

export interface BackdropPhoto {
  /** Path under public/ (served at the site root). */
  src: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
}

// 14 photos, generated so the count is guaranteed to stay in sync.
export const BACKDROPS: readonly BackdropPhoto[] = Array.from({ length: 14 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    src: `/backdrops/backdrop-${n}.jpg`,
    alt: `Custom event backdrop designed and built by Linknow Events Co. — design ${i + 1}`,
  };
});
