import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { About } from './about';

describe('About page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(About).componentInstance).toBeTruthy();
  });

  it('has exactly one h1', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const h1s = (fixture.nativeElement as HTMLElement).querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  it('covers events, balloons, parties and corporate events, in a Singapore context', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toMatch(/balloon/i);
    expect(text).toMatch(/part(y|ies)/i);
    expect(text).toMatch(/corporate/i);
    expect(text).toMatch(/backdrop/i);
    expect(text).toMatch(/floral|flower/i);
    expect(text).toMatch(/Singapore/i);
  });

  it('images are lazy-loaded and carry alt text', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const imgs = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('img'),
    ) as HTMLImageElement[];
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect((img.getAttribute('alt') ?? '').trim().length).toBeGreaterThan(0);
    }
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact/form)', () => {
    const fixture = TestBed.createComponent(About);
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
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });
});
