import { TestBed } from '@angular/core/testing';
import { Corporate } from './corporate';

describe('Corporate (Corporate Events page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corporate],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Corporate).componentInstance).toBeTruthy();
  });

  it('has a single "Corporate Events" h1', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  it('describes the range of corporate occasions (incl. weddings, described only)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Weddings');
    expect(text).toContain('Corporate backdrops');
    expect(text).toContain('Product launches');
    expect(text).toContain('Grand openings');
    expect(text).toMatch(/Dinner\s*&\s*dance/i);
    expect(text).toContain('Roadshows');
    expect(text).toMatch(/festive/i);
  });

  it('shows the two Avocaderia photos with descriptive alt text, lazy-loaded', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.showcase__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(2);
    const srcs = imgs.map((i) => i.getAttribute('src'));
    expect(srcs).toContain('/backdrops/backdrop-08.jpg');
    expect(srcs).toContain('/backdrops/backdrop-09.jpg');
    for (const img of imgs) {
      expect(img.getAttribute('alt')).toBe('In-store corporate event styled for Avocaderia');
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact/form)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      expect(a.href).toContain('enquire%20about%20your%20services');
    }
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/request a quote|contact us/i);
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });
});
