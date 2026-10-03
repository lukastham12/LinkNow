import { TestBed } from '@angular/core/testing';
import { Flowers } from './flowers';

describe('Flowers (Floral Services page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flowers],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Flowers).componentInstance).toBeTruthy();
  });

  it('has a single h1 introducing custom/bespoke floral services', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent?.toLowerCase()).toContain('custom');
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

  it('presents floral services as bespoke capabilities, not a fixed catalogue', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = el.querySelectorAll('.capability');
    expect(cards.length).toBeGreaterThanOrEqual(3);
    const text = el.textContent ?? '';
    expect(text.toLowerCase()).toContain('any flower');
    expect(text.toLowerCase()).toContain('any occasion');
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
