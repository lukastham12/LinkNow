// Client/organisation logos for the homepage "Our Clients" spotlight.
// Background removed, original colours kept (CSS grayscale filter handles the
// monochrome treatment at render time — see .clients__logo in home.scss).
// The first entry is the featured spotlight; any further entries are named in
// a short "...and also" line below it. Add a client by adding one entry here.

export interface Client {
  name: string;
  logo: string;
  alt: string;
  /** Shown only for the featured (first) client. */
  blurb?: string;
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
  },
];
