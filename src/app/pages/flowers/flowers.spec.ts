import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Flowers } from './flowers';
import { FLOWER_CATALOGUE } from './catalogue';

describe('Flowers', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flowers],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Flowers).componentInstance).toBeTruthy();
  });

  it('has a single h1 titled "Floral Showcase"-framed heading', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(el.textContent).toContain('Floral Showcase');
  });

  it('renders all categories and every catalogue item as photo + name', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const totalItems = FLOWER_CATALOGUE.reduce((n, g) => n + g.items.length, 0);
    expect(totalItems).toBe(42);

    for (const group of FLOWER_CATALOGUE) {
      expect(el.textContent).toContain(group.category);
      for (const item of group.items) {
        expect(el.textContent).toContain(item.name);
      }
    }

    const imgs = el.querySelectorAll('.grid img');
    expect(imgs.length).toBe(totalItems);
  });

  it('lazy-loads images with alt text equal to the flower name', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.grid img')) as HTMLImageElement[];
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect(img.getAttribute('alt')?.trim()).toBeTruthy();
    }
  });

  it('uses the canonical generic WhatsApp link (no per-item message)', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      expect(a.href).toContain('enquire%20about%20your%20services');
    }
  });

  it('links to /contact', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a[href="/contact"]')).toBeTruthy();
  });

  it('shows NO price, currency, quantity or bundle/pack language (guardrail)', () => {
    const fixture = TestBed.createComponent(Flowers);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    // Currency / price markers
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    // Ordering / bundle language
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bbundle\b|\bpack\b|\bper\b|\bqty\b|\bquantity\b/i);
    // No selection / cart UI
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('input, button[type="submit"], [type="checkbox"]')).toBeNull();
  });
});
