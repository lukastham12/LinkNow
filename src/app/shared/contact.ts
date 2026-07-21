// Canonical contact values for Linknow Events Co. (see BRIEF.md §8).
// Single source of truth — every component imports from here so the WhatsApp
// number and social links are never re-typed with typos.
//
// WhatsApp is the ONLY enquiry channel (BRIEF.md §4/§6): there is no contact
// page, no enquiry form, and no destination email. Do not reintroduce them.

export const WHATSAPP_NUMBER = '6588090600';
export const WHATSAPP_MESSAGE = "Hi LinkNow, I'd like to enquire about your services";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/linknowsg/';
export const TIKTOK_URL = 'https://www.tiktok.com/@linknowsg';

// Primary navigation used by the header (and footer).
//
// Floral is NOT a top-level tab (WhatsApp-only site, no Contact tab): the
// Floral Showcase page (/flowers) is reachable only via the "Services"
// dropdown and the Floral Services card on /services. The Services item
// therefore carries `children` — the header renders them as an accessible
// dropdown/submenu, while the footer ignores them and just lists the top level.
export interface NavChild {
  label: string;
  path: string;
  // Optional in-page anchor on the target route (e.g. #backdrops on /services).
  fragment?: string;
}

export interface NavLink {
  label: string;
  path: string;
  children?: readonly NavChild[];
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Custom Backdrops', path: '/backdrops' },
      { label: 'Floral Services', path: '/flowers' },
      { label: 'Corporate Events', path: '/corporate' },
    ],
  },
  { label: 'About', path: '/about' },
];
