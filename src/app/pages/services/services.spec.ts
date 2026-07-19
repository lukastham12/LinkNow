import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Services } from './services';
import { FLOWER_CATALOGUE } from '../../components/floral-showcase/catalogue';

describe('Services', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Services).componentInstance).toBeTruthy();
  });

  it('has a single h1 and shows the three service lines', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    const text = el.textContent ?? '';
    expect(text).toContain('Custom Backdrops');
    expect(text).toContain('Floral Services');
    expect(text).toContain('Setup-Only Labour');
  });

  it('embeds the floral showcase gallery with every catalogue item', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const totalItems = FLOWER_CATALOGUE.reduce((n, g) => n + g.items.length, 0);
    expect(el.querySelector('app-floral-showcase')).toBeTruthy();
    expect(el.querySelectorAll('.grid img').length).toBe(totalItems);
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      expect(a.href).toContain('enquire%20about%20your%20services');
    }
    // No contact route, no mailto, no forms.
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/request a quote|contact us/i);
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });
});
