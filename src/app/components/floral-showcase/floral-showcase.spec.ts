import { TestBed } from '@angular/core/testing';
import { FloralShowcase } from './floral-showcase';
import { FLOWER_CATALOGUE } from './catalogue';

describe('FloralShowcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloralShowcase],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(FloralShowcase).componentInstance).toBeTruthy();
  });

  it('renders all categories and every catalogue item as photo + name', () => {
    const fixture = TestBed.createComponent(FloralShowcase);
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
    const fixture = TestBed.createComponent(FloralShowcase);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.grid img')) as HTMLImageElement[];
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect(img.getAttribute('alt')?.trim()).toBeTruthy();
    }
  });

  it('shows NO price, currency, quantity or bundle/pack language (guardrail)', () => {
    const fixture = TestBed.createComponent(FloralShowcase);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    // Currency / price markers
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    // Ordering / bundle language
    expect(text).not.toMatch(
      /\bstems?\b|\bstalks?\b|\bbundle\b|\bpack\b|\bper\b|\bqty\b|\bquantity\b/i,
    );
    // No selection / cart UI
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('input, button[type="submit"], [type="checkbox"]')).toBeNull();
  });
});
