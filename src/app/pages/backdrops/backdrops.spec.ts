import { TestBed } from '@angular/core/testing';
import { Backdrops } from './backdrops';
import { BACKDROPS } from './backdrops.data';

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
    const imgs = Array.from(el.querySelectorAll('.grid__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(23);
    for (const img of imgs) {
      expect(img.getAttribute('src')).toMatch(/\/backdrops\/backdrop-\d{2}\.jpg$/);
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });

  it('excludes the Avocaderia corporate photos (backdrop-08, backdrop-09) — now on /corporate', () => {
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
    const captions = Array.from(el.querySelectorAll('.grid__caption'));
    expect(captions.length).toBe(23);
    for (const caption of captions) {
      expect((caption.textContent ?? '').trim().length).toBeGreaterThan(0);
    }
  });

  it('filters the gallery by category', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const birthdayCount = BACKDROPS.filter((b) => b.category === 'Birthday').length;
    const filterButtons = Array.from(el.querySelectorAll('.filter')) as HTMLButtonElement[];
    const birthdayButton = filterButtons.find((b) => b.textContent?.trim() === 'Birthday');
    expect(birthdayButton).toBeTruthy();
    birthdayButton?.click();
    fixture.detectChanges();

    const imgs = el.querySelectorAll('.grid__img');
    expect(imgs.length).toBe(birthdayCount);
    expect(imgs.length).toBeLessThan(23);

    const allButton = filterButtons.find((b) => b.textContent?.trim() === 'All');
    allButton?.click();
    fixture.detectChanges();
    expect(el.querySelectorAll('.grid__img').length).toBe(23);
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
});
