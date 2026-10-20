// Canonical contact values for LinkNow (see BRIEF.md §8).
// Single source of truth — every component imports from here so the WhatsApp
// number, email and social links are never re-typed with typos.
//
// WhatsApp and email are the two enquiry channels (owner request, 12–13 Oct
// 2026 — corporate/admin/HR buyers often can't buy through a personal WA
// chat, so a dedicated /contact page with an email option was added
// alongside WhatsApp). The /contact form submits straight to Web3Forms
// (WEB3FORMS_ENDPOINT/ACCESS_KEY below) rather than opening the visitor's
// mail app — there is still no backend of our own, Web3Forms delivers the
// message to novestelatham@linknow-singapore.com.

export const WHATSAPP_NUMBER = '6588090600';

// Fill-in-the-blank template (owner request, 16 Oct 2026, from a UX review:
// a bare "I'd like to enquire" meant Novi had to chase date/venue/theme/
// budget over 5-6 follow-up messages, giving a shopping visitor time to book
// elsewhere first). Every generic WhatsApp message below appends this block
// so the whole brief arrives in the first message.
const ENQUIRY_TEMPLATE = 'Event: \nDate: \nVenue: \nTheme: \nBudget: ';

export const WHATSAPP_MESSAGE =
  "Hi LinkNow! I'd like to enquire about an event.\n" + ENQUIRY_TEMPLATE;

/** Build a wa.me link for an arbitrary pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = whatsappLink(WHATSAPP_MESSAGE);

// Homepage Services & Occasions redesign (v1.0, 10 Oct 2026) — this generic
// message is used only by the hero's primary CTA and the "One booking, one
// team" bundle band. Every other WhatsApp link on the site keeps using
// WHATSAPP_HREF/WHATSAPP_MESSAGE above, unchanged.
export const WHATSAPP_EVENT_MESSAGE =
  "Hi LinkNow! I'd like to enquire about decorating my event.\n" + ENQUIRY_TEMPLATE;
export const WHATSAPP_EVENT_HREF = whatsappLink(WHATSAPP_EVENT_MESSAGE);

/**
 * Build a page-specific wa.me link (owner request, 12 Oct 2026): naming the
 * page the visitor came from in the pre-filled message cuts the
 * back-and-forth and shows the enquiry source right in the chat. Use this
 * instead of the flat WHATSAPP_HREF wherever a page has its own clear
 * identity (backdrops, about, services) — keep WHATSAPP_HREF only for
 * generic/shared chrome like the footer and the floating WhatsApp button.
 * The For Businesses page uses businessWhatsappLink() below instead, since
 * its template asks for different details.
 */
export function pageWhatsappLink(pageLabel: string): string {
  return whatsappLink(
    `Hi LinkNow, I saw your ${pageLabel} page and I'd like to enquire about an event.\n` +
      ENQUIRY_TEMPLATE,
  );
}

// For Businesses enquiry template (owner request, 23 Oct 2026 — reworded the
// corporate section to speak to businesses rather than "events"): a
// business/store enquiry needs a company name, outlet/location and dates,
// not the retail Event/Venue/Theme/Budget template above.
const BUSINESS_ENQUIRY_TEMPLATE = 'Company: \nLocation/outlet: \nDates: \nWhat we need: ';

/** Page-specific wa.me link for the For Businesses page and its case studies. */
export function businessWhatsappLink(pageLabel: string): string {
  return whatsappLink(
    `Hi LinkNow, I saw your ${pageLabel} page and I'd like a quote.\n` + BUSINESS_ENQUIRY_TEMPLATE,
  );
}

export const EMAIL_ADDRESS = 'novestelatham@linknow-singapore.com';

// Web3Forms submission endpoint (owner request, 13 Oct 2026 — the /contact
// form must deliver the message directly, not just open the visitor's mail
// app). ACCESS_KEY is a Web3Forms *public* access key: by design it only
// allows submitting a form to the email verified with Web3Forms
// (novestelatham@linknow-singapore.com) and carries no other privilege, so
// it's safe to ship in client-side code — it is not a secret.
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY = '3e1dbb4e-f13e-45c5-9ab6-ec9219c374b0';

// LinkNow Pte Ltd's UEN (Unique Entity Number) — shown on /contact and in
// the site footer so corporate/admin/HR buyers can verify the business.
export const UEN = '202608341G';

export const INSTAGRAM_URL = 'https://www.instagram.com/linknowsg/';
export const TIKTOK_URL = 'https://www.tiktok.com/@linknowsg';

// Primary navigation used by the header (and footer).
//
// Weddings & ROM is NOT a top-level tab: the Wedding & ROM styling page
// (/flowers) is reachable only via the "Services" dropdown and the matching
// card on /services. The Services item therefore carries `children` — the
// header renders them as an accessible dropdown/submenu, while the footer
// ignores them and just lists the top level.
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
      { label: 'Birthdays & Celebrations', path: '/backdrops' },
      { label: 'Weddings & ROM', path: '/flowers' },
      { label: 'For Businesses', path: '/corporate' },
      { label: 'Party Add-Ons', path: '/services/add-ons' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];
