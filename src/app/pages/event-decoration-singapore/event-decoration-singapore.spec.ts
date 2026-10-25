import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventDecorationSingaporePage } from './event-decoration-singapore';
import { EMAIL_ADDRESS } from '../../shared/contact';

describe('EventDecorationSingaporePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDecorationSingaporePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    document.getElementById('ld-json-event-decoration-singapore')?.remove();
  });

  it('has a single h1 with the exact target keyword', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent?.trim()).toBe('Event Decoration Singapore');
  });

  it('names LinkNow as an event decoration company in Singapore in the first <p>', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const firstP = el.querySelector('p');
    expect(firstP?.textContent).toContain('LinkNow Pte Ltd is an event decoration company in Singapore');
  });

  it('shows a trust line with no fabricated star rating', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const trust = el.querySelector('.hero__trust')?.textContent ?? '';
    expect(trust).not.toMatch(/\d(\.\d)?\s*(star|\/\s*5|on google)/i);
    expect(trust).toContain('Real 5-star reviews from Singapore customers');
    expect(trust).toContain('Event decoration from S$349');
  });

  it('has both a WhatsApp CTA and an email CTA using the canonical email address', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = el.querySelectorAll('a[href*="wa.me/6588090600"]');
    expect(waLinks.length).toBeGreaterThan(0);
    const mailtoLinks = Array.from(el.querySelectorAll('a[href^="mailto:"]')) as HTMLAnchorElement[];
    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const a of mailtoLinks) {
      expect(a.getAttribute('href')).toBe(`mailto:${EMAIL_ADDRESS}`);
    }
  });

  it('shows a personal-events card and a business-events card, each with its own CTA', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const titles = Array.from(el.querySelectorAll('.split__card-title')).map((n) =>
      n.textContent?.trim(),
    );
    expect(titles).toEqual(['Personal Celebrations', 'Business Events']);
  });

  it('shows 6 photos with descriptive alt text matching "event decoration Singapore"', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.gallery__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(6);
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect((img.getAttribute('alt') ?? '').toLowerCase()).toContain('event decoration singapore');
    }
  });

  it('excludes backdrop-13 and backdrop-24 (still show a child\'s full name in the photo itself)', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.gallery__img')) as HTMLImageElement[];
    for (const img of imgs) {
      expect(img.getAttribute('src')).not.toContain('backdrop-13.jpg');
      expect(img.getAttribute('src')).not.toContain('backdrop-24.jpg');
    }
  });

  it('shows the 3-point why-us strip', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('.why__item-title')).map((n) => n.textContent?.trim());
    expect(items).toEqual([
      'Setup & teardown included',
      'All venues — void deck, condo, ballroom, retail',
      'Mock-up before you commit',
    ]);
  });

  it('shows exactly 2 real review cards, not fabricated', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const quotes = Array.from(el.querySelectorAll('.review__quote')).map((n) => n.textContent ?? '');
    expect(quotes.length).toBe(2);
    for (const q of quotes) {
      expect(q.length).toBeGreaterThan(0);
    }
    const attributions = Array.from(el.querySelectorAll('.review__attribution')).map((n) =>
      n.textContent?.trim(),
    );
    expect(attributions.every((a) => a === 'Verified Google review')).toBeTrue();
  });

  it('reuses the exact "How It Works" 4-step copy from /backdrops', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const titles = Array.from(el.querySelectorAll('.steps__item-title')).map((n) => n.textContent?.trim());
    expect(titles).toEqual(['Send us your theme', 'We send a mock-up', 'You confirm', 'We set up and clear']);
  });

  it('links to the full /backdrops portfolio', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const link = el.querySelector('.portfolio-link__cta');
    expect(link?.getAttribute('ng-reflect-router-link') ?? link?.getAttribute('href')).toBeTruthy();
    expect(link?.textContent).toContain('Browse our full decoration portfolio');
  });

  it('shows 4 FAQ questions and does not state unconfirmed billing policy as fact', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';
    expect(text).toContain('What venues do you cover?');
    expect(text).toContain('Do you work with businesses and provide tax invoices?');
    expect(text).toContain("What's your minimum lead time?");
    expect(text).toContain('Do you handle multi-day setups?');
    // Unconfirmed specifics from the original spec must not appear as fact.
    expect(text).not.toContain('30-day credit terms');
    expect(text).not.toContain('no deposit required');
    expect(text).not.toContain('progress billing');
    // And must not reintroduce a suggested lead-time window.
    expect(text).not.toContain("at least 1 month");
    expect(text).toContain("there's no hard lead time or preferred window");
  });

  it('shows the final CTA text with both WhatsApp and email buttons', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain("Whatever you're planning, we'll make it look the part.");
  });

  it('injects a page-scoped LocalBusiness JSON-LD block with no fabricated rating or address', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const script = document.getElementById('ld-json-event-decoration-singapore');
    expect(script).toBeTruthy();
    const data = JSON.parse(script!.textContent ?? '{}');
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.name).toBe('LinkNow Pte Ltd');
    expect(data.description).toBe('Event decoration company in Singapore');
    expect(data.url).toContain('event-decoration-singapore');
    expect(data.telephone).toBe('+6588090600');
    expect(data.priceRange).toBe('S$349+');
    expect(data.aggregateRating).toBeUndefined();
    expect(data.address).toBeUndefined();
  });

  it('removes its JSON-LD script on destroy', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    expect(document.getElementById('ld-json-event-decoration-singapore')).toBeTruthy();
    fixture.destroy();
    expect(document.getElementById('ld-json-event-decoration-singapore')).toBeNull();
  });

  it('has a min-width floor on .btn for width consistency', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('.btn') as HTMLElement;
    expect(getComputedStyle(btn).minWidth).toBe('220px');
  });
});
