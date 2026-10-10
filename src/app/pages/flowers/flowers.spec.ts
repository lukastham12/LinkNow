import { TestBed } from '@angular/core/testing';
import { Flowers } from './flowers';

describe('Flowers (Wedding & ROM Styling page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flowers],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Flowers).componentInstance).toBeTruthy();
  });

  it('has a single h1 focused on wedding & ROM styling, not just florals', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    const text = h1s[0].textContent?.toLowerCase() ?? '';
    expect(text).toContain('wedding');
    expect(text).toContain('rom');
  });

  it('shows the single bespoke hero photo (no flower catalogue grid)', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const heroImgs = Array.from(el.querySelectorAll('.hero__img')) as HTMLImageElement[];
    expect(heroImgs.length).toBe(1);
    expect(heroImgs[0].getAttribute('src')).toBe('/flowers/custom-arrangement-hero.jpg');
    expect((heroImgs[0].getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    // The old 35-item flower-type catalogue component is gone.
    expect(el.querySelector('app-floral-showcase')).toBeNull();
  });

  it('leads with florals as the specialty, but covers the full wedding/ROM styling job, as plain unclickable cards', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.capability'));
    expect(cards.length).toBe(4);

    // Cards are plain <article>s, not links — same pattern as the homepage's
    // "Other Services We Provide".
    expect(el.querySelectorAll('a.capability').length).toBe(0);
    for (const card of cards) {
      expect(card.tagName.toLowerCase()).toBe('article');
      expect(card.querySelector('svg')).toBeTruthy();
    }

    const titles = cards.map((c) => c.querySelector('.capability__title')?.textContent);
    expect(titles[0]).toContain('Floral styling');
    expect(titles[0]).toContain('specialty');

    const text = (el.textContent ?? '').toLowerCase();
    // Not floral-only: backdrops, balloons and table styling are also covered.
    expect(text).toContain('backdrop');
    expect(text).toContain('balloon');
    expect(text).toContain('table');

    // One WhatsApp enquiry button below the grid, not per-card links.
    const waButtons = Array.from(el.querySelectorAll('a.btn--solid')) as HTMLAnchorElement[];
    expect(waButtons.length).toBeGreaterThan(0);
    for (const btn of waButtons) {
      expect(btn.getAttribute('href')).toContain('wa.me/6588090600');
    }
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact)', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });
});
