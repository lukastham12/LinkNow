// Single source of truth for the site's public base URL and site-wide SEO
// identity. EVERYTHING that needs an absolute URL (canonical links, Open Graph
// urls, the sitemap, JSON-LD) must reference SITE_URL from here — do not
// hard-code a domain anywhere else.
//
// ⚠️ TODO (BRIEF.md §9/§12): the production domain is not owned yet. Swap this
// single placeholder when the domain is purchased. NOTE: `public/robots.txt`
// and `public/sitemap.xml` are STATIC files and therefore repeat the domain
// literally — update those two files to match when you change SITE_URL.
export const SITE_URL = 'https://REPLACE-WITH-DOMAIN.example';

// Brand identity (canonical — see BRIEF.md §2/§7).
export const SITE_NAME = 'Linknow Events Co.';
export const LEGAL_NAME = 'LinkNow Pte Ltd';

// Default social-share image (reuses the brand logo until a purpose-made OG
// asset is supplied). Path is site-root-relative; made absolute via absoluteUrl.
export const DEFAULT_OG_IMAGE = '/brand/logo.jpg';

// Brand theme colour for browser UI — the rose accent from src/styles.scss
// (--color-rose). Keep in sync if the palette changes.
export const THEME_COLOR = '#a63f57';

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
