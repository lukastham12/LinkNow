// Data for the SEO landing pages (route component: pages/seo-landing/) —
// added 24 Oct 2026, owner request: standalone pages targeting organic
// Google/AI search for keywords like "birthday decoration singapore".
// Originally 3 pages (birthday/party/event); the party and event entries
// were each later removed in favour of richer, bespoke pages for those
// keywords — see the notes below the one remaining entry. The shared
// component renders from this array (ActivatedRoute snapshot data -> find
// by slug), mirroring the addon-detail/corporate-case-study pattern already
// used elsewhere on the site, rather than a dedicated page component per
// keyword.
//
// Trust line: the owner's original spec asked for a fabricated "★ 4.8 on
// Google" rating — no real Google rating exists in this codebase (same
// issue already resolved on /backdrops, which uses "Real 5-star reviews
// from Singapore parents" instead of a star number). Confirmed directly
// with the owner (24 Oct 2026): drop the fabricated number, reuse the same
// unfabricated wording pattern. The S$349 starting price is the same
// owner-approved exception already in use on /backdrops — extended here to
// cover birthday/party/event decor generally, at the owner's request.
//
// Photos: reused real portfolio photos from public/backdrops/ (not literal
// placeholders — this is an image-led, photography-driven site, and a real
// photo with accurate alt text also helps image search). backdrop-13 and
// backdrop-24 are deliberately excluded from every page here: both still
// have a child's full name printed on the physical backdrop in the photo
// itself (captions were de-named, but the images were not edited) — see
// CLAUDE.md for the in-progress name-blurring work on those two.

export interface SeoLandingPhoto {
  src: string;
  alt: string;
}

export interface SeoLandingPage {
  slug: string;
  /** Exact target keyword — used verbatim as the <h1> and in meta/JSON-LD. */
  keyword: string;
  /** Hero subhead — also serves as the page's required first <p> (see
   *  seo-landing.html): names LinkNow as a [keyword] company in Singapore
   *  and covers venues (HDB, condo, void deck). */
  subhead: string;
  /** Occasion label used in the price trust-line, e.g. "Birthday decoration". */
  occasionPriceLabel: string;
  metaTitle: string;
  metaDescription: string;
  photos: readonly SeoLandingPhoto[];
}

export const SEO_LANDING_PAGES: readonly SeoLandingPage[] = [
  {
    slug: 'birthday-decoration-singapore',
    keyword: 'Birthday Decoration Singapore',
    subhead:
      'LinkNow Pte Ltd is a birthday decoration company in Singapore, styling custom backdrops ' +
      'and balloon setups for HDB void decks, condo function rooms and private venues.',
    occasionPriceLabel: 'Birthday decoration',
    metaTitle: 'Birthday Decoration Singapore | From S$349 | LinkNow Pte Ltd',
    metaDescription:
      'LinkNow Pte Ltd offers birthday decoration services in Singapore. Custom backdrops, ' +
      'balloon garlands and full party styling. HDB void decks, condo function rooms and ' +
      'private venues. From S$349.',
    photos: [
      {
        src: '/backdrops/backdrop-20.jpg',
        alt: 'Birthday decoration Singapore — Minecraft-themed backdrop with balloon garland',
      },
      {
        src: '/backdrops/backdrop-17.jpg',
        alt: 'Birthday decoration Singapore — teddy-bear-themed 1st birthday backdrop with styled dessert table',
      },
      {
        src: '/backdrops/backdrop-12.jpg',
        alt: 'Birthday decoration Singapore — gold and black balloon backdrop with neon signage',
      },
      {
        src: '/backdrops/backdrop-07.jpg',
        alt: 'Birthday decoration Singapore — floral birthday backdrop',
      },
      {
        src: '/backdrops/backdrop-10.jpg',
        alt: 'Birthday decoration Singapore — pink and white 1st birthday balloon decor',
      },
      {
        src: '/backdrops/backdrop-14.jpg',
        alt: 'Birthday decoration Singapore — basketball-themed birthday backdrop',
      },
    ],
  },
  // 'event-decoration-singapore' used to be the 2nd entry here, rendered via
  // the generic SeoLandingPageComponent. Removed 25 Oct 2026 — the owner
  // asked for a richer, bespoke rebuild of that page (personal/business
  // split, dedicated FAQ, dual WhatsApp/email CTAs), which now lives at
  // pages/event-decoration-singapore/ with its own route registration in
  // app.routes.ts.
  //
  // 'party-decoration-singapore' (singular) used to be the 3rd entry here.
  // Removed 28 Oct 2026, owner request: it was keyword-cannibalizing against
  // the richer, real portfolio page at '/party-decorations-singapore'
  // (plural — the renamed /backdrops, see pages/backdrops/) for essentially
  // the same search phrase. That route now redirects to the portfolio page
  // instead (app.routes.ts). This array now covers only the birthday page.
];
