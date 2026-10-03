// Client/organisation logos for the homepage "Our Clients" section.
// Background removed, original colours kept (CSS grayscale filter handles the
// monochrome treatment at render time — see .client-card__logo in home.scss).
// Every client gets equal visual weight — no featured/secondary split — each
// with a short, truthful one-line description of the actual work done.
// Add a client by adding one entry here, no template changes needed.

export interface Client {
  name: string;
  logo: string;
  alt: string;
  blurb: string;
}

export const CLIENTS: readonly Client[] = [
  {
    name: "People's Association",
    logo: '/brand/clients/peoples-association.png',
    alt: "People's Association logo",
    blurb: 'Event décor styling for People’s Association.',
  },
  {
    name: 'Avocadoria',
    logo: '/brand/clients/avocadoria.png',
    alt: 'Avocadoria logo',
    blurb: 'Seasonal in-store styling for Avocadoria, including a full Easter installation.',
  },
];
