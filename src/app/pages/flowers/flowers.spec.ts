import { TestBed } from '@angular/core/testing';
import { Flowers } from './flowers';
import { FLOWER_CATALOGUE } from '../../components/floral-showcase/catalogue';

describe('Flowers (Floral Showcase page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flowers],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Flowers).componentInstance).toBeTruthy();
  });

  it('has a single "Floral Showcase" h1', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toContain('Floral Showcase');
  });

  it('renders the floral gallery (photo + name only)', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const totalItems = FLOWER_CATALOGUE.reduce((n, g) => n + g.items.length, 0);
    expect(totalItems).toBe(35);
    expect(el.querySelector('app-floral-showcase')).toBeTruthy();
    expect(el.querySelectorAll('.grid img').length).toBe(totalItems);
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
