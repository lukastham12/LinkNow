// SEO plumbing: per-page metadata driven by route `data.seo`, plus the
// site-wide JSON-LD structured data. Everything runs during SSR/prerender so
// the tags land in the static HTML (BRIEF.md §10/§11).

import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import {
  INSTAGRAM_URL,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
} from './contact';
import {
  DEFAULT_OG_IMAGE,
  LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from './site';

/** Per-page SEO carried on each route's `data.seo` (see app.routes.ts). */
export interface PageSeo {
  /** Full, unique <title> (should carry Singapore context). */
  title: string;
  /** Unique meta description. */
  description: string;
  /** Site-root-relative path for the canonical/OG url, e.g. '/services'. */
  path: string;
  /** Optional per-page share image (path or absolute); falls back to default. */
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly doc = inject(DOCUMENT);

  /**
   * Subscribe to navigation and apply the merged `data.seo` for the active
   * route. Called once from the root App component. Applies immediately for the
   * current route (covers the SSR/prerender initial render) and on every
   * subsequent NavigationEnd.
   */
  init(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.applyForActiveRoute());
    this.applyForActiveRoute();
  }

  private applyForActiveRoute(): void {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const seo = route.snapshot.data['seo'] as PageSeo | undefined;
    if (seo) {
      this.update(seo);
    }
  }

  /** Set title + description + canonical + Open Graph + Twitter tags. */
  update(seo: PageSeo): void {
    const url = absoluteUrl(seo.path);
    const image = absoluteUrl(seo.ogImage ?? DEFAULT_OG_IMAGE);

    this.title.setTitle(seo.title);
    this.setName('description', seo.description);
    this.setCanonical(url);

    // Open Graph.
    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', SITE_NAME);
    this.setProperty('og:title', seo.title);
    this.setProperty('og:description', seo.description);
    this.setProperty('og:url', url);
    this.setProperty('og:image', image);

    // Twitter card.
    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', seo.title);
    this.setName('twitter:description', seo.description);
    this.setName('twitter:image', image);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  /**
   * Inject the site-wide JSON-LD (Organization + WebSite) into <head> once.
   * Uses ONLY canonical, truthful data (BRIEF.md §2/§8): no address, hours,
   * geo, pricing/Offer, or aggregateRating. Idempotent so browser hydration
   * does not duplicate the server-rendered block.
   */
  injectStructuredData(): void {
    const id = 'ld-json-linknow';
    if (this.doc.getElementById(id)) {
      return;
    }
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          legalName: LEGAL_NAME,
          url: SITE_URL,
          logo: absoluteUrl('/brand/logo.jpg'),
          image: absoluteUrl('/brand/logo.jpg'),
          description:
            'Singapore event décor studio creating custom backdrops, floral ' +
            'services and corporate event styling for celebrations and formal occasions.',
          areaServed: { '@type': 'Country', name: 'Singapore' },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: `+${WHATSAPP_NUMBER}`,
          },
          sameAs: [INSTAGRAM_URL, TIKTOK_URL],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: 'en-SG',
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    };

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
