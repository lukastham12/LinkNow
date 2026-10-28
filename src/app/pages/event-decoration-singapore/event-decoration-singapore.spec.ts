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

  it('shows a plain "Starting from S$349" trust line with no fabricated star rating or reviews claim', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const trust = el.querySelector('.hero__trust')?.textContent?.trim() ?? '';
    expect(trust).toBe('Starting from S$349');
    expect(trust).not.toMatch(/\d(\.\d)?\s*(star|\/\s*5|on google)/i);
    expect(trust).not.toContain('reviews');
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

  it('WhatsApp CTA uses the site-wide pageWhatsappLink() template (Event/Date/Venue/Theme/Budget), not a hand-rolled message missing fields (26 Oct 2026, pre-merge review fix)', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLink = el.querySelector('a[href*="wa.me/6588090600"]') as HTMLAnchorElement;
    const decoded = decodeURIComponent(waLink.getAttribute('href') ?? '');
    expect(decoded).toContain('I saw your Event Decoration Singapore page');
    expect(decoded).toContain('Event:');
    expect(decoded).toContain('Date:');
    expect(decoded).toContain('Venue:');
    expect(decoded).toContain('Theme:');
    expect(decoded).toContain('Budget:');
  });

  it('shows "Our Work" split into a Party Decorations gallery and a For Businesses gallery, each with 3 photos and a deep-link button (28 Oct 2026 rename)', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const groups = Array.from(el.querySelectorAll('.work__group'));
    expect(groups.length).toBe(2);

    const titles = groups.map((g) => g.querySelector('.work__group-title')?.textContent?.trim());
    expect(titles).toEqual(['Party Decorations', 'For Businesses']);

    const birthdayImgs = groups[0].querySelectorAll('.work__img');
    expect(birthdayImgs.length).toBe(3);
    const birthdayLink = groups[0].querySelector('a.btn') as HTMLAnchorElement;
    expect(birthdayLink.getAttribute('href')).toBe('/party-decorations-singapore');

    const businessImgs = groups[1].querySelectorAll('.work__img');
    expect(businessImgs.length).toBe(3);
    const businessLink = groups[1].querySelector('a.btn') as HTMLAnchorElement;
    expect(businessLink.getAttribute('href')).toBe('/corporate');

    for (const img of Array.from(el.querySelectorAll('.work__img')) as HTMLImageElement[]) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect(img.getAttribute('alt')).toBeTruthy();
    }
  });

  it('excludes backdrop-13 and backdrop-24 from the Our Work galleries', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.work__img')) as HTMLImageElement[];
    for (const img of imgs) {
      expect(img.getAttribute('src')).not.toContain('backdrop-13.jpg');
      expect(img.getAttribute('src')).not.toContain('backdrop-24.jpg');
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

  it('does not render the removed Why LinkNow, testimonials, How It Works or outro sections', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.why')).toBeNull();
    expect(el.querySelector('.reviews')).toBeNull();
    expect(el.querySelector('.steps')).toBeNull();
    expect(el.querySelector('.outro')).toBeNull();
    expect(el.querySelector('.portfolio-link')).toBeNull();
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
    expect(text).not.toContain('at least 1 month');
    expect(text).toContain("there's no hard lead time or preferred window");
  });

  it('ends at the FAQ — no content section renders after it', () => {
    const fixture = TestBed.createComponent(EventDecorationSingaporePage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const children = Array.from(el.children);
    const faqIndex = children.findIndex((c) => c.tagName.toLowerCase() === 'app-faq-accordion');
    expect(faqIndex).toBeGreaterThan(-1);
    expect(faqIndex).toBe(children.length - 1);
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
