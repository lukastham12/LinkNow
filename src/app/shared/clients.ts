// Client/organisation logos for the homepage "Our Clients" credibility section.
// Logo assets are pre-processed to a single charcoal tone with the background
// removed (see public/brand/clients/) — add a client by adding one entry here,
// no template changes needed.

export interface Client {
  name: string;
  logo: string;
  alt: string;
}

export const CLIENTS: readonly Client[] = [
  {
    name: "People's Association",
    logo: '/brand/clients/peoples-association.png',
    alt: "People's Association logo",
  },
  {
    name: 'Avocadoria',
    logo: '/brand/clients/avocadoria.png',
    alt: 'Avocadoria logo',
  },
];
