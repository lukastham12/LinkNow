import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { SeoLandingPageComponent } from './seo-landing';
import { SEO_LANDING_PAGES } from '../../shared/seo-landing-pages';

describe('SeoLandingPageComponent', () => {
  async function configure(slug: string): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [SeoLandingPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { slug } } },
        },
      ],
    }).compileComponents();
  }

  afterEach(() => {
    document.getElementById('ld-json-seo-landing')?.remove();
  });

  it('throws for an unknown slug rather than silently rendering nothing', async () => {
    await configure('not-a-real-slug');
    expect(() => TestBed.createComponent(SeoLandingPageComponent)).toThrow();
  });

  for (const page of SEO_LANDING_PAGES) {
    describe(`slug "${page.slug}"`, () => {
      it('has a single h1 containing the exact target keyword', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const h1s = el.querySelectorAll('h1');
        expect(h1s.length).toBe(1);
        expect(h1s[0].textContent?.trim()).toBe(page.keyword);
      });

      it('names LinkNow as a [keyword] company in Singapore in the first <p> on the page', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const firstP = el.querySelector('p');
        expect(firstP?.textContent?.trim()).toBe(page.subhead);
        expect(firstP?.textContent).toMatch(/LinkNow Pte Ltd is an? .+ company in Singapore/);
      });

      it('shows a trust line with no fabricated star rating, and the occasion-specific S$349 price', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const trust = el.querySelector('.hero__trust')?.textContent ?? '';
        expect(trust).not.toMatch(/\d(\.\d)?\s*(star|\/\s*5|on google)/i);
        expect(trust).toContain('Real 5-star reviews from Singapore customers');
        expect(trust).toContain(`${page.occasionPriceLabel} from S$349`);
      });

      it('shows 6 photos with descriptive alt text matching the keyword', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const imgs = Array.from(el.querySelectorAll('.gallery__img')) as HTMLImageElement[];
        expect(imgs.length).toBe(6);
        for (const img of imgs) {
          expect(img.getAttribute('loading')).toBe('lazy');
          expect((img.getAttribute('alt') ?? '').toLowerCase()).toContain(
            page.keyword.toLowerCase(),
          );
        }
      });

      it('excludes backdrop-13 and backdrop-24 (still show a child\'s full name in the photo itself)', async () => {
        for (const photo of page.photos) {
          expect(photo.src).not.toContain('backdrop-13.jpg');
          expect(photo.src).not.toContain('backdrop-24.jpg');
        }
      });

      it('shows the same 3-point "why us" strip', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const items = Array.from(el.querySelectorAll('.why__item-title')).map((n) =>
          n.textContent?.trim(),
        );
        expect(items).toEqual([
          'Setup & teardown included',
          'Mock-up before you commit',
          'HDB, condo & void deck setups',
        ]);
      });

      it('shows exactly 2 real review cards (not fabricated), with no venue-specific mismatches', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const quotes = Array.from(el.querySelectorAll('.review__quote')).map((n) =>
          n.textContent?.trim(),
        );
        expect(quotes.length).toBe(2);
        for (const q of quotes) {
          expect(q).toContain('“');
          expect(q).toContain('”');
        }
        const attributions = Array.from(el.querySelectorAll('.review__attribution')).map((n) =>
          n.textContent?.trim(),
        );
        expect(attributions.every((a) => a === 'Verified Google review')).toBeTrue();
      });

      it('reuses the exact "How It Works" 4-step copy from /backdrops', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const titles = Array.from(el.querySelectorAll('.steps__item-title')).map((n) =>
          n.textContent?.trim(),
        );
        expect(titles).toEqual(['Send us your theme', 'We send a mock-up', 'You confirm', 'We set up and clear']);
      });

      it('WhatsApp buttons use the site-wide pageWhatsappLink() template (Event/Date/Venue/Theme/Budget), not a hand-rolled message missing fields (26 Oct 2026, pre-merge review fix)', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        const waLinks = Array.from(
          el.querySelectorAll('a[href*="wa.me/6588090600"]'),
        ) as HTMLAnchorElement[];
        expect(waLinks.length).toBe(2);
        for (const a of waLinks) {
          const decoded = decodeURIComponent(a.href);
          expect(decoded).toContain(`I saw your ${page.keyword} page`);
          expect(decoded).toContain('Event:');
          expect(decoded).toContain('Date:');
          expect(decoded).toContain('Venue:');
          expect(decoded).toContain('Theme:');
          expect(decoded).toContain('Budget:');
        }
      });

      it('shows the final CTA text', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        expect(el.textContent ?? '').toContain('Ready to plan? Tell us your date and theme.');
      });

      it('injects a page-scoped LocalBusiness JSON-LD block with the correct fields, no fabricated rating', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        const script = document.getElementById('ld-json-seo-landing');
        expect(script).toBeTruthy();
        const data = JSON.parse(script!.textContent ?? '{}');
        expect(data['@type']).toBe('LocalBusiness');
        expect(data.name).toBe('LinkNow Pte Ltd');
        expect(data.description).toBe(page.keyword);
        expect(data.url).toContain(page.slug);
        expect(data.telephone).toBe('+6588090600');
        expect(data.priceRange).toBe('S$349+');
        expect(data.aggregateRating).toBeUndefined();
        expect(data.address).toBeUndefined();
      });

      it('removes its JSON-LD script on destroy (no stale script if the user navigates away)', async () => {
        await configure(page.slug);
        const fixture = TestBed.createComponent(SeoLandingPageComponent);
        fixture.detectChanges();
        expect(document.getElementById('ld-json-seo-landing')).toBeTruthy();
        fixture.destroy();
        expect(document.getElementById('ld-json-seo-landing')).toBeNull();
      });
    });
  }
});
