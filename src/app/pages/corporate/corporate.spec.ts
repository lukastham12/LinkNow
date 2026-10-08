import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Corporate } from './corporate';

describe('Corporate (Corporate Events page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corporate],
      providers: [provideRouter([])],
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

  it("shows a 4-card use-case grid (People's Association, AWWA, Bucket House, Avocadoria), each linking to its own page", () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.case-card')) as HTMLAnchorElement[];
    expect(cards.length).toBe(4);
    const labels = Array.from(el.querySelectorAll('.case-card__label')).map((n) =>
      (n.textContent ?? '').trim(),
    );
    expect(labels.some((l) => l.includes("People's Association"))).toBeTrue();
    expect(labels.some((l) => l.includes('AWWA'))).toBeTrue();
    expect(labels.some((l) => l.includes('Bucket House'))).toBeTrue();
    expect(labels.some((l) => l.includes('Avocadoria'))).toBeTrue();

    const hrefs = cards.map((c) => c.getAttribute('href'));
    expect(hrefs).toContain('/corporate/peoples-association');
    expect(hrefs).toContain('/corporate/awwa');
    expect(hrefs).toContain('/corporate/bucket-house');
    expect(hrefs).toContain('/corporate/avocadoria');

    for (const card of cards) {
      const img = card.querySelector('.case-card__img') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });

  it('does NOT render case-study brief/build/result content on this page (it now lives on the dedicated pages)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.case-study')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toContain('The brief');
    expect(text).not.toContain('What we built');
  });

  it('states scope covers any custom corporate or formal event, not just the listed types', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text.toLowerCase()).toContain('any custom corporate or formal');
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
