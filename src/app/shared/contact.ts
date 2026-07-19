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

// Primary navigation used by the header (and footer). Floral lives under
// Services; there is no Flowers or Contact tab (WhatsApp-only).
export const NAV_LINKS: readonly { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'About', path: '/about' },
];
