// Canonical contact values for LinkNow Events Co. (see BRIEF.md §8).
// Single source of truth — every component imports from here so the WhatsApp
// number, email and social links are never re-typed with typos.
//
// WhatsApp and email are the two enquiry channels (owner request, 12 Oct
// 2026 — corporate/admin/HR buyers often can't buy through a personal WA
// chat, so a dedicated /contact page with an email option was added
// alongside WhatsApp). There is still no enquiry form/backend — the email
// option is a `mailto:` link, same "redirect" pattern as WhatsApp's wa.me
// links, since this is a static prerendered site with no server to receive
// form submissions.

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

/**
 * Build a page-specific wa.me link (owner request, 12 Oct 2026): naming the
 * page the visitor came from in the pre-filled message cuts the
 * back-and-forth and shows the enquiry source right in the chat. Use this
 * instead of the flat WHATSAPP_HREF wherever a page has its own clear
 * identity (backdrops, corporate, about, services) — keep WHATSAPP_HREF only
 * for generic/shared chrome like the footer and the floating WhatsApp button.
 */
export function pageWhatsappLink(pageLabel: string): string {
  return whatsappLink(`Hi LinkNow, I saw your ${pageLabel} page and I'd like to enquire.`);
}

export const EMAIL_ADDRESS = 'novestelatham@linknow-singapore.com';

/** Build a mailto: link with a pre-filled subject (and optional body). */
export function mailtoLink(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  return `mailto:${EMAIL_ADDRESS}?${params.toString()}`;
}

export const EMAIL_HREF = mailtoLink("Enquiry from LinkNow's website");

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
      { label: 'Custom Backdrops', path: '/backdrops' },
      { label: 'Weddings & ROM', path: '/flowers' },
      { label: 'Corporate Events', path: '/corporate' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];
