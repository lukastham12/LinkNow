// Single source of truth for the site's public base URL and site-wide SEO
// identity. EVERYTHING that needs an absolute URL (canonical links, Open Graph
// urls, the sitemap, JSON-LD) must reference SITE_URL from here — do not
// hard-code a domain anywhere else.
//
// Production domain (BRIEF.md §9/§12). NOTE: `public/robots.txt` and
// `public/sitemap.xml` are STATIC files and therefore repeat the domain
// literally — keep those two files in sync if this ever changes.
export const SITE_URL = 'https://linknowsg.com';

// Brand identity (canonical — see BRIEF.md §2/§7).
export const SITE_NAME = 'LinkNow Events Co.';
export const LEGAL_NAME = 'LinkNow Pte Ltd';

// Default social-share image. This brand is image-led, so the share card uses
// a décor photo (the homepage hero backdrop) rather than the dark logo tile —
// it makes a far stronger preview on TikTok/Instagram/WhatsApp link shares,
// which are the primary discovery channels. Swap for a purpose-made landscape
// (1.91:1) OG asset when one is supplied. Path is site-root-relative; made
// absolute via absoluteUrl.
export const DEFAULT_OG_IMAGE = '/backdrops/backdrop-02.jpg';

// Alt text / locale for the default share image and social cards.
export const DEFAULT_OG_IMAGE_ALT = 'A balloon-garland celebration setup styled by LinkNow Events Co. in Singapore';
export const OG_LOCALE = 'en_SG';

// Brand theme colour for browser UI — the rose accent from src/styles.scss
// (--color-rose). Keep in sync if the palette changes.
export const THEME_COLOR = '#a63f57';

// Google Analytics 4 Measurement ID (BRIEF.md §6/§12). AnalyticsService loads
// gtag.js in the browser and fires a page_view on every Angular route change
// (not just the first load), which a static <script> tag in index.html would
// miss for a single-page app.
export const GA_MEASUREMENT_ID = 'G-MNXLZPFKX7';

/**
 * Turn a site-root-relative path (e.g. '/services') or an already-absolute URL
 * into an absolute URL on SITE_URL. Collapses the double slash so '/' yields
 * exactly SITE_URL with no trailing slash mishaps.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}
