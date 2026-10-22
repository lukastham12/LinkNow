// "Events we style" — the 3 featured service cards shown identically on the
// homepage and /services (owner request, 10 Oct 2026: both pages must show
// the same section rather than /services maintaining its own stale grid).
// Single source of truth so the two pages can never drift again.
//
// The Birthdays & Celebrations card's image was a gender-reveal photo
// (backdrop-25.jpg) — swapped 22 Oct 2026 (owner request) for an actual
// kid's birthday shot (backdrop-24.jpg, safari-themed 1st birthday) so the
// card's photo matches what it's promoting.

export interface FeaturedService {
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  link: string;
}

export const FEATURED_SERVICES: readonly FeaturedService[] = [
  {
    name: 'Birthdays & Celebrations',
    blurb:
      "Birthdays, naming ceremonies, 100 days and more — you name the celebration, we'll style it.",
    image: '/backdrops/backdrop-24.jpg',
    imageAlt: 'A safari-themed 1st birthday balloon backdrop styled by LinkNow',
    link: '/backdrops',
  },
  {
    name: 'Weddings & ROM',
    blurb: 'Floral and backdrop styling for your big day.',
    image: '/flowers/custom-arrangement-hero.jpg',
    imageAlt: 'A bespoke floral centrepiece styled along a fine-dining table by LinkNow',
    link: '/flowers',
  },
  {
    name: 'For Businesses',
    blurb:
      'Store displays, launches, booths and staff celebrations — tell us what your business needs.',
    image: '/corporate/peoples-association-01.jpg',
    imageAlt: "Balloon pillar entrance styled by LinkNow for a People's Association Open House",
    link: '/corporate',
  },
];
