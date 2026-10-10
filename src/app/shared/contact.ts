// Canonical contact values for LinkNow Events Co. (see BRIEF.md §8).
// Single source of truth — every component imports from here so the WhatsApp
// number and social links are never re-typed with typos.
//
// WhatsApp is the ONLY enquiry channel (BRIEF.md §4/§6): there is no contact
// page, no enquiry form, and no destination email. Do not reintroduce them.

export const WHATSAPP_NUMBER = '6588090600';
export const WHATSAPP_MESSAGE = "Hi LinkNow, I'd like to enquire about your services";

/** Build a wa.me link for an arbitrary pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = whatsappLink(WHATSAPP_MESSAGE);

// Homepage Services & Occasions redesign (v1.0, 10 Oct 2026) — this generic
// message is used only by the hero's primary CTA and the "One booking, one
// team" bundle band. Every other WhatsApp link on the site keeps using
// WHATSAPP_HREF/WHATSAPP_MESSAGE above, unchanged.
export const WHATSAPP_EVENT_MESSAGE = "Hi LinkNow, I'd like to enquire about decorating my event.";
export const WHATSAPP_EVENT_HREF = whatsappLink(WHATSAPP_EVENT_MESSAGE);

export const INSTAGRAM_URL = 'https://www.instagram.com/linknowsg/';
export const TIKTOK_URL = 'https://www.tiktok.com/@linknowsg';

// Primary navigation used by the header (and footer).
//
// Weddings & ROM is NOT a top-level tab (WhatsApp-only site, no Contact
// tab): the Wedding & ROM styling page (/flowers) is reachable only via
// the "Services" dropdown and the matching card on /services. The
// Services item therefore carries `children` — the header renders them as
// an accessible dropdown/submenu, while the footer ignores them and just
// lists the top level.
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
      { label: 'Weddings & ROM', path: '/flowers' },
      { label: 'Corporate Events', path: '/corporate' },
    ],
  },
  { label: 'About', path: '/about' },
];
