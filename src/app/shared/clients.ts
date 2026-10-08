// Client/organisation logos for the homepage "Our Clients" section.
// Background removed, original colours kept (CSS grayscale filter handles the
// monochrome treatment at render time — see .clients__logo in home.scss).
// Logo-only row, no names/descriptions shown. Add a client by adding one
// entry here, no template changes needed.

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
    name: 'AWWA',
    logo: '/brand/clients/awwa.png',
    alt: 'AWWA logo',
  },
  {
    name: 'Bucket House Preschool',
    logo: '/brand/clients/bucket-house.png',
    alt: 'Bucket House Preschool logo',
  },
  {
    name: 'Avocadoria',
    logo: '/brand/clients/avocadoria.png',
    alt: 'Avocadoria logo',
  },
];
