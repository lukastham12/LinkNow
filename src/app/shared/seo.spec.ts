import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { SeoService } from './seo';
import { SITE_URL, absoluteUrl } from './site';

describe('absoluteUrl', () => {
  it('maps the root path to the bare base URL (no trailing slash)', () => {
    expect(absoluteUrl('/')).toBe(SITE_URL);
  });

  it('prefixes a route path with the base URL', () => {
    expect(absoluteUrl('/services')).toBe(`${SITE_URL}/services`);
  });

  it('leaves an already-absolute URL untouched', () => {
    expect(absoluteUrl('https://example.com/x.jpg')).toBe('https://example.com/x.jpg');
  });

  it('does not hard-code a real production domain (placeholder until owned)', () => {
    expect(SITE_URL).toContain('REPLACE-WITH-DOMAIN');
  });
});

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  afterEach(() => {
    document.getElementById('ld-json-linknow')?.remove();
    document.head.querySelector('link[rel="canonical"]')?.remove();
  });

  it('sets a unique title and meta description', () => {
    service.update({ title: 'Backdrops — SG', description: 'Custom backdrops', path: '/backdrops' });
    expect(title.getTitle()).toBe('Backdrops — SG');
    expect(meta.getTag('name="description"')?.content).toBe('Custom backdrops');
  });

  it('sets a canonical link and Open Graph / Twitter tags on the base URL', () => {
    service.update({ title: 'Services', description: 'Our services', path: '/services' });
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe(`${SITE_URL}/services`);
    expect(meta.getTag('property="og:url"')?.content).toBe(`${SITE_URL}/services`);
    expect(meta.getTag('property="og:title"')?.content).toBe('Services');
    expect(meta.getTag('name="twitter:card"')?.content).toBe('summary_large_image');
  });

  it('injects Organization/WebSite JSON-LD once, with valid canonical-only data', () => {
    service.injectStructuredData();
    service.injectStructuredData(); // idempotent

    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]#ld-json-linknow');
    expect(scripts.length).toBe(1);

    const raw = scripts[0].textContent ?? '';
    const data = JSON.parse(raw); // throws if invalid JSON
    const json = JSON.stringify(data);

    const org = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Organization');
    expect(org.name).toBe('LinkNow Events Co.');
    expect(org.areaServed.name).toBe('Singapore');
    expect(org.contactPoint.telephone).toBe('+6588090600');
    expect(org.sameAs).toContain('https://www.instagram.com/linknowsg/');
    expect(org.url).toBe(SITE_URL);

    // No fabricated business data / pricing / ratings (BRIEF.md §4 + ticket 008).
    expect(json).not.toContain('address');
    expect(json).not.toContain('openingHours');
    expect(json).not.toContain('priceRange');
    expect(json).not.toContain('Offer');
    expect(json).not.toContain('aggregateRating');
  });
});
