import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Services } from './services';

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

  it('renders a 3-card service grid, each with an image and an Explore affordance', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('a.card')) as HTMLAnchorElement[];
    expect(cards.length).toBe(3);
    for (const card of cards) {
      expect(card.querySelector('img.card__img')).toBeTruthy();
      expect(card.textContent ?? '').toContain('Explore');
    }
  });

  it('links the Floral card to /flowers and the others to in-page anchors', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hrefs = (Array.from(el.querySelectorAll('a.card')) as HTMLAnchorElement[]).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toContain('/flowers');
    expect(hrefs).toContain('/services#backdrops');
    expect(hrefs).toContain('/services#setup');
  });

  it('has detail blocks anchored at #backdrops and #setup', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#backdrops')).toBeTruthy();
    expect(el.querySelector('#setup')).toBeTruthy();
  });

  it('does not embed the floral gallery (it now lives on /flowers)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-floral-showcase')).toBeNull();
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
