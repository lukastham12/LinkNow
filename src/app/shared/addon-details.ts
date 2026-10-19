// Per-add-on detail pages (route '/services/:slug', pages/addon-detail) —
// added 19 Oct 2026. LinkNow engages a third-party vendor for these five
// add-ons (Popcorn Station, Candy Floss, Soft Serve Ice Cream, Bouncy
// Castle, Balloon Sculpting); the owner supplied that vendor's own listing
// pages as a pricing/copy reference and asked for a LinkNow-branded page per
// item. Per the owner's instruction, "pricing follows exactly the same" —
// every tier below is copied verbatim from the vendor's listings, not
// estimated. Copy ("description"/"whatsIncluded") is adapted loosely from
// the same reference, but anything presented as a confirmed fact about this
// vendor specifically (e.g. a named certification, named costumed-character
// attendants, or a fixed catalogue of bouncy-castle designs) was left out —
// BRIEF.md says never to publish an unverified claim, and none of that was
// confirmed. "Need help choosing?" boxes showing the vendor's own contact
// details (their WhatsApp/Instagram) were also dropped — every CTA on these
// pages routes to LinkNow's own WhatsApp/email, never the vendor's.

export interface PricingTier {
  label: string;
  price: string;
}

export interface AddOnDetail {
  slug: string;
  title: string;
  tagline: string;
  description: readonly string[];
  whatsIncluded: readonly string[];
  pricing: readonly PricingTier[];
  extraHour?: string;
  priceNote: string;
}

export const ADDON_DETAILS: readonly AddOnDetail[] = [
  {
    slug: 'popcorn-station',
    title: 'Popcorn Station',
    tagline: 'Fresh-popped, flavour-packed party snacks.',
    description: [
      'A popcorn station popped fresh on the spot, right in front of your guests. Choose from ' +
        'classic butter, caramel, cheese or custom flavours, served in themed cups or bags.',
    ],
    whatsIncluded: ['Multiple flavour options', 'Popped live on site', 'Cups or bags provided'],
    pricing: [
      { label: '2 hrs', price: '$220' },
      { label: '3 hrs', price: '$320' },
      { label: '4 hrs', price: '$420' },
    ],
    extraHour: '+$100 / hour',
    priceNote: 'Area and date surcharges may apply — we’ll confirm your exact total when you enquire.',
  },
  {
    slug: 'candy-floss',
    title: 'Candy Floss',
    tagline: 'Spun fresh, in any colour you want.',
    description: [
      'Fresh-spun candy floss, made live in custom colours to match your party theme — pink, ' +
        'blue, purple, rainbow, you name it. The spinning itself is half the show for younger guests.',
    ],
    whatsIncluded: ['Custom colour matching your theme', 'Spun fresh, live on site'],
    pricing: [
      { label: '2 hrs', price: '$220' },
      { label: '3 hrs', price: '$320' },
      { label: '4 hrs', price: '$420' },
    ],
    extraHour: '+$100 / hour',
    priceNote: 'Area and date surcharges may apply — we’ll confirm your exact total when you enquire.',
  },
  {
    slug: 'soft-serve-ice-cream',
    title: 'Soft Serve Ice Cream',
    tagline: 'Creamy soft serve — a crowd favourite.',
    description: [
      'A soft serve ice cream station with a toppings bar — vanilla, chocolate or swirl, served ' +
        'in cups or cones. A reliable favourite for Singapore’s weather, loved by kids and ' +
        'parents alike.',
    ],
    whatsIncluded: ['Vanilla, chocolate or swirl flavours', 'Toppings bar', 'Cups and cones provided'],
    pricing: [
      { label: '2 hrs', price: '$420' },
      { label: '3 hrs', price: '$520' },
      { label: '4 hrs', price: '$620' },
    ],
    extraHour: '+$100 / hour',
    priceNote: 'Area and date surcharges may apply — we’ll confirm your exact total when you enquire.',
  },
  {
    slug: 'bouncy-castle',
    title: 'Bouncy Castle',
    tagline: "Hours of safe, bouncy fun for kids' parties.",
    description: [
      'A bouncy castle sized to your venue, with delivery, full setup, a blower machine and ' +
        'collection all included — suitable indoors and outdoors. Let us know your space and ' +
        'headcount and we’ll recommend a size and design on request.',
    ],
    whatsIncluded: [
      'Delivery, setup and collection included',
      'Blower machine provided',
      'Indoor and outdoor suitable',
      'Design options available on request',
    ],
    pricing: [
      { label: '2 hrs', price: '$95' },
      { label: '3 hrs', price: '$120' },
      { label: '4 hrs', price: '$140' },
    ],
    priceNote: 'Area and date surcharges may apply — we’ll confirm your exact total when you enquire.',
  },
  {
    slug: 'balloon-sculpting',
    title: 'Balloon Sculpting',
    tagline: 'A roving balloon artist making animals and shapes for kids and grown-ups alike.',
    description: [
      'A balloon artist creates sculptures on-site — animals, swords, hats, flowers and more. ' +
        'Fast, fun and endlessly customisable, and a reliable hit at any kids’ party.',
      'For around 30 children, 1–2 hours is usually enough; for 50+ children or a mixed ' +
        'kids-and-adults crowd, book 2–3 hours so everyone leaves with a balloon.',
    ],
    whatsIncluded: ['Customisable designs on request', 'On-site artist included', 'All ages welcome'],
    pricing: [
      { label: '1 hr', price: '$120' },
      { label: '2 hrs', price: '$220' },
      { label: '3 hrs', price: '$320' },
      { label: '4 hrs', price: '$420' },
    ],
    extraHour: '+$100 / hour',
    priceNote: 'Area and date surcharges may apply — we’ll confirm your exact total when you enquire.',
  },
];
