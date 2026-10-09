// Corporate Events use-case data — single source of truth shared by the
// /corporate use-case grid and each client's own case-study page
// (/corporate/:slug). WhatsApp is the only enquiry channel; no pricing.

export interface CorporatePhoto {
  src: string;
  alt: string;
}

export interface CorporateCaseStudy {
  slug: string;
  client: string;
  headline: CorporatePhoto;
  photos: CorporatePhoto[];
  brief: string;
  build: string;
  result: string;
}

export const CORPORATE_CASE_STUDIES: readonly CorporateCaseStudy[] = [
  {
    slug: 'peoples-association',
    client: "People's Association",
    headline: {
      src: '/corporate/peoples-association-01.jpg',
      alt: "Balloon pillar entrance and ribbon-cutting setup for a People's Association Open House",
    },
    photos: [
      {
        src: '/corporate/peoples-association-01.jpg',
        alt: "Balloon pillar entrance and ribbon-cutting setup for a People's Association Open House",
      },
      {
        src: '/corporate/peoples-association-02.jpg',
        alt: "Guests taking photos with the LinkNow team at a People's Association Open House",
      },
    ],
    brief:
      "People's Association needed a welcoming, grassroots-ready entrance for an Open House — " +
      'an opening ceremony and ribbon-cutting moment that would set the tone for the day.',
    build:
      'A pair of tall balloon pillars framing the tent entrance, a red-carpet ribbon-cutting ' +
      'point, and on-site balloon art twisting to keep the atmosphere festive throughout the event.',
    result:
      'A polished, camera-ready entrance that supported a smooth opening ceremony and strong ' +
      'grassroots engagement — the kind of dependable, on-brand execution we bring to community events.',
  },
  {
    slug: 'awwa',
    client: 'AWWA',
    headline: {
      src: '/corporate/awwa-01.jpg',
      alt: "Themed bouncy castle set up for AWWA's Children's Day engagement",
    },
    photos: [
      {
        src: '/corporate/awwa-01.jpg',
        alt: "Themed bouncy castle set up for AWWA's Children's Day engagement",
      },
    ],
    brief:
      "AWWA wanted a Children's Day engagement that would genuinely excite the kids — a hands-on " +
      'attraction, not just static decor.',
    build:
      'A themed inflatable bouncy castle with a slide, delivered end-to-end: site-suitable setup, ' +
      'safety matting, full inflation and power run-through, on-site supervision for the duration of ' +
      'play, and breakdown after — so the organisers could focus on the event, not the equipment.',
    result:
      "A Children's Day centrepiece that kept children engaged and smiling all day, backed by the " +
      'same careful, fuss-free handling we bring to every installation, big or small.',
  },
  {
    slug: 'bucket-house',
    client: 'Bucket House Preschool',
    headline: {
      src: '/corporate/bucket-house-01.jpg',
      alt: "Balloon twisting entertainer at Bucket House Preschool's Children's Day celebration",
    },
    photos: [
      {
        src: '/corporate/bucket-house-02.jpg',
        alt: 'Balloon and floral display styled for Bucket House Preschool',
      },
      {
        src: '/corporate/bucket-house-01.jpg',
        alt: "Balloon twisting entertainer at Bucket House Preschool's Children's Day celebration",
      },
    ],
    brief:
      "Bucket House Preschool wanted their Children's Day celebration to feel joyful and " +
      'hands-on for a preschool-age crowd.',
    build:
      'A dedicated balloon-twisting entertainer creating characters and shapes on the spot, paired ' +
      'with a bright balloon and floral display styled for the space.',
    result:
      'A celebration focused squarely on getting the children happy — simple, playful and ' +
      'full of smiles from start to finish.',
  },
  {
    slug: 'avocadoria',
    client: 'Avocadoria',
    headline: {
      src: '/backdrops/backdrop-08.jpg',
      alt: 'In-store Easter event styled for Avocadoria — storefront view',
    },
    photos: [
      {
        src: '/backdrops/backdrop-08.jpg',
        alt: 'In-store Easter event styled for Avocadoria — storefront view',
      },
      {
        src: '/backdrops/backdrop-09.jpg',
        alt: 'In-store Easter event styled for Avocadoria — pastel balloon backdrop',
      },
    ],
    brief:
      'Avocadoria wanted their café storefront to feel festive and photo-worthy for the Easter ' +
      'season — something that would catch the eye from outside and give customers a reason to ' +
      'stop and share it.',
    build:
      'A pastel balloon installation and Easter-themed display built around their storefront ' +
      'entrance, scaled to the space and designed to read well both in person and in photos.',
    result:
      'A warm, seasonal storefront moment that fit naturally with the café’s own branding — ' +
      'the same disciplined, no-clutter styling we bring to every event, corporate or retail.',
  },
];
