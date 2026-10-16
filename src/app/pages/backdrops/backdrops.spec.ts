import { TestBed } from '@angular/core/testing';
import { Backdrops } from './backdrops';
import { BACKDROP_GROUPS, BACKDROPS } from './backdrops.data';
import { TESTIMONIALS } from '../../shared/testimonials';

describe('Backdrops (Custom Backdrops portfolio page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Backdrops],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Backdrops).componentInstance).toBeTruthy();
  });

  it('has a single "Custom Backdrops" h1', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toContain('Custom Backdrops');
  });

  it('lists all 23 backdrop photos with descriptive alt text, lazy-loaded', () => {
    expect(BACKDROPS.length).toBe(23);
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.carousel__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(23);
    for (const img of imgs) {
      expect(img.getAttribute('src')).toMatch(/\/backdrops\/backdrop-\d{2}\.jpg$/);
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });

  it('excludes the Avocadoria corporate photos (backdrop-08, backdrop-09) — now on /corporate', () => {
    const srcs = BACKDROPS.map((b) => b.src);
    expect(srcs).not.toContain('/backdrops/backdrop-08.jpg');
    expect(srcs).not.toContain('/backdrops/backdrop-09.jpg');
  });

  it('every photo has a non-empty caption and a valid category', () => {
    const validCategories = ['Birthday', '100 Days & Naming', 'Baby Shower & Gender Reveal', 'Other'];
    for (const photo of BACKDROPS) {
      expect(photo.caption.length).toBeGreaterThan(0);
      expect(validCategories).toContain(photo.category);
    }
  });

  it('renders a visible caption under each photo', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const captions = Array.from(el.querySelectorAll('.carousel__caption'));
    expect(captions.length).toBe(23);
    for (const caption of captions) {
      expect((caption.textContent ?? '').trim().length).toBeGreaterThan(0);
    }
  });

  it('groups photos into one carousel section per category, each with its own heading', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const sections = Array.from(el.querySelectorAll('.gallery'));
    expect(sections.length).toBe(BACKDROP_GROUPS.length);

    const headings = sections.map((s) => s.querySelector('.gallery__title')?.textContent?.trim());
    expect(headings).toEqual(BACKDROP_GROUPS.map((g) => g.category));

    BACKDROP_GROUPS.forEach((group, i) => {
      const imgs = sections[i].querySelectorAll('.carousel__img');
      expect(imgs.length).toBe(group.photos.length);
      expect(imgs.length).toBeGreaterThan(0);
    });
  });

  it('each carousel scrolls horizontally rather than wrapping into a grid', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.carousel').length).toBe(BACKDROP_GROUPS.length);
    expect(el.querySelector('.filter')).toBeNull();
  });

  it('uses a page-specific WhatsApp link naming "Custom Backdrops" (no email/quote/contact/form on this page)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      expect(decodeURIComponent(a.href)).toContain('Custom Backdrops');
    }
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/request a quote|contact us/i);
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });

  it('shows real testimonials below the gallery (UX review, 16 Oct 2026 — reviews previously only lived on the homepage)', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('What our clients say');
    expect(el.querySelector('app-reviews-carousel')).toBeTruthy();
  });

  it('shows a short FAQ covering lead time, venues, inclusions, deposit/cancellation and rain backup (UX review, 16 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('.faq__item')) as HTMLDetailsElement[];
    expect(items.length).toBeGreaterThanOrEqual(4);

    const text = el.textContent ?? '';
    expect(text).toMatch(/book/i);
    expect(text).toMatch(/condo|void deck|HDB/i);
    expect(text).toMatch(/setup and teardown/i);
    expect(text).toMatch(/deposit/i);
    expect(text).toMatch(/cancellation/i);
    expect(text).toMatch(/rain/i);

    // Guardrail: FAQ answers stay general — no unconfirmed numbers invented.
    const faqText = Array.from(el.querySelectorAll('.faq__answer'))
      .map((p) => p.textContent ?? '')
      .join(' ');
    expect(faqText).not.toMatch(/\d+\s*(%|percent|days?|weeks?)/i);
  });
});
