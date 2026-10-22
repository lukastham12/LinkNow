import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Corporate } from './corporate';

describe('Corporate (For Businesses page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corporate],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Corporate).componentInstance).toBeTruthy();
  });

  it('.btn gets a 220px min-width and centered text so short-label buttons match longer ones (button-width consistency fix)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('.btn') as HTMLElement;
    expect(btn).toBeTruthy();
    const style = getComputedStyle(btn);
    expect(style.minWidth).toBe('220px');
    expect(style.textAlign).toBe('center');
  });

  it('has a single h1', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  it('describes the range of corporate occasions, no "Weddings" entry (removed 23 Oct 2026 — belongs on /flowers)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toContain('Weddings');
    expect(text).not.toContain('wedding photography coming soon');
    expect(text).toContain('Corporate backdrops');
    expect(text).toContain('Product launches');
    expect(text).toContain('Grand openings');
    expect(text).toMatch(/Dinner\s*&\s*dance/i);
    expect(text).toContain('Booths, pop-ups & roadshows');
    expect(text).toMatch(/festive/i);
    expect(text).toContain('Shopping mall activations & festive displays');
  });

  it("shows a 5-card use-case grid (People's Association, AWWA, Bucket House, Avocadoria, Sparkle & Co.), each linking to its own page", () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.case-card')) as HTMLAnchorElement[];
    expect(cards.length).toBe(5);
    const labels = Array.from(el.querySelectorAll('.case-card__label')).map((n) =>
      (n.textContent ?? '').trim(),
    );
    expect(labels.some((l) => l.includes("People's Association"))).toBeTrue();
    expect(labels.some((l) => l.includes('AWWA'))).toBeTrue();
    expect(labels.some((l) => l.includes('Bucket House'))).toBeTrue();
    expect(labels.some((l) => l.includes('Avocadoria'))).toBeTrue();
    expect(labels.some((l) => l.includes('Sparkle & Co.'))).toBeTrue();

    const hrefs = cards.map((c) => c.getAttribute('href'));
    expect(hrefs).toContain('/corporate/peoples-association');
    expect(hrefs).toContain('/corporate/awwa');
    expect(hrefs).toContain('/corporate/bucket-house');
    expect(hrefs).toContain('/corporate/avocadoria');
    expect(hrefs).toContain('/corporate/sparkle-and-co');

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

  it('states scope covers any business occasion, not just the listed types (reworded 23 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain("Don't see what you need? Tell us — we design for any business occasion.");
  });

  it('shows a "For Businesses" FAQ accordion with all 4 questions (owner request, 23 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('.faq__item')) as HTMLDetailsElement[];
    expect(items.length).toBe(4);
    const text = el.textContent ?? '';
    expect(text).toContain('Can you install outside opening hours?');
    expect(text).toContain('Can you include our branding?');
    expect(text).toContain('Who handles mall or venue approvals?');
    expect(text).toContain('Do you issue invoices?');
    expect(text).toContain('every business job comes with a formal invoice');
  });

  it('uses a page-specific WhatsApp link naming "For Businesses", plus a secondary mailto "Email us" (owner request, 23 Oct 2026) — still no form/quote/contact-page link', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      const decoded = decodeURIComponent(a.href);
      expect(decoded).toContain('For Businesses');
      // Business enquiry template (owner request, 23 Oct 2026) — Company/
      // Location/Dates/What we need, not the retail Event/Venue/Theme/Budget
      // template used elsewhere on the site.
      expect(decoded).toContain("I'd like a quote");
      expect(decoded).toContain('Company:');
      expect(decoded).toContain('Location/outlet:');
    }

    const mailtoLinks = Array.from(el.querySelectorAll('a[href^="mailto:"]')) as HTMLAnchorElement[];
    expect(mailtoLinks.length).toBe(1);
    expect(mailtoLinks[0].getAttribute('href')).toBe('mailto:novestelatham@linknow-singapore.com');
    expect(mailtoLinks[0].textContent?.trim()).toBe('Email us');

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
