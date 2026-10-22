import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Backdrops } from './backdrops';
import { BACKDROP_GROUPS, BACKDROPS } from './backdrops.data';
import { TESTIMONIALS } from '../../shared/testimonials';

describe('Backdrops (Birthdays & Celebrations portfolio page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Backdrops],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Backdrops).componentInstance).toBeTruthy();
  });

  it('has a single "Birthdays & Celebrations" h1 (renamed from "Custom Backdrops" 23 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toContain('Birthdays & Celebrations');
  });

  it('puts "Birthday" first, ahead of the baby/newborn-stage categories (owner request, 22 Oct 2026)', () => {
    expect(BACKDROP_GROUPS[0].category).toBe('Birthday');
    const order = BACKDROP_GROUPS.map((g) => g.category);
    expect(order.indexOf('Birthday')).toBeLessThan(order.indexOf('100 Days & Naming'));
    expect(order.indexOf('Birthday')).toBeLessThan(order.indexOf('Baby Shower & Gender Reveal'));
  });

  it('shows a 4-step "How It Works" section between the intro and the gallery', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const sections = Array.from(el.querySelectorAll('section'));
    const introIndex = sections.findIndex((s) => s.querySelector('h1'));
    const stepsIndex = sections.findIndex((s) => s.querySelector('#steps-heading'));
    const galleryIndex = sections.findIndex((s) => s.classList.contains('gallery'));
    expect(stepsIndex).toBe(introIndex + 1);
    expect(stepsIndex).toBeLessThan(galleryIndex);

    const items = Array.from(el.querySelectorAll('.steps__item'));
    expect(items.length).toBe(4);
    const titles = items.map((i) => i.querySelector('.steps__item-title')?.textContent?.trim());
    expect(titles).toEqual(['Send us your theme', 'We send a mock-up', 'You confirm', 'We set up and clear']);
  });

  it('shows a "Make It a Full Party" strip with 4 add-on cards linking to /services/add-ons (owner feedback, 22 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const sections = Array.from(el.querySelectorAll('section'));
    const stepsIndex = sections.findIndex((s) => s.querySelector('#steps-heading'));
    const fullPartyIndex = sections.findIndex((s) => s.querySelector('#full-party-heading'));
    const galleryIndex = sections.findIndex((s) => s.classList.contains('gallery'));
    expect(fullPartyIndex).toBe(stepsIndex + 1);
    expect(fullPartyIndex).toBeLessThan(galleryIndex);

    const fullPartySection = sections[fullPartyIndex];
    const addonTitles = Array.from(fullPartySection.querySelectorAll('h3')).map((h) =>
      h.textContent?.trim(),
    );
    expect(addonTitles).toEqual(['Bouncy Castle', 'Candy Floss', 'Popcorn Station', 'Party Hosting']);

    const seeAllLink = fullPartySection.querySelector('a.btn--ghost') as HTMLAnchorElement;
    expect(seeAllLink.getAttribute('href')).toBe('/services/add-ons');
  });

  it('lists all 19 backdrop photos with descriptive alt text, lazy-loaded', () => {
    expect(BACKDROPS.length).toBe(19);
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.carousel__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(19);
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

  it('excludes backdrop-16 — a duplicate of the backdrop-25 gender-reveal photo (owner request, 23 Oct 2026)', () => {
    const srcs = BACKDROPS.map((b) => b.src);
    expect(srcs).not.toContain('/backdrops/backdrop-16.jpg');
    const hunnyPhotos = BACKDROPS.filter((b) => b.caption.includes('Our Little Hunny'));
    expect(hunnyPhotos.length).toBe(1);
  });

  it('every photo has a non-empty caption and a valid category', () => {
    const validCategories = [
      'Birthday',
      'Grown-Up Celebrations',
      '100 Days & Naming',
      'Baby Shower & Gender Reveal',
    ];
    for (const photo of BACKDROPS) {
      expect(photo.caption.length).toBeGreaterThan(0);
      expect(validCategories).toContain(photo.category);
    }
  });

  it('drops the "Other" category entirely (Easter/Ganesh/Sparkle & Co. — owner request, 22 Oct 2026)', () => {
    const categories: string[] = BACKDROP_GROUPS.map((g) => g.category);
    expect(categories).not.toContain('Other');
    const srcs = BACKDROPS.map((b) => b.src);
    expect(srcs).not.toContain('/backdrops/backdrop-04.jpg');
    expect(srcs).not.toContain('/backdrops/backdrop-06.jpg');
    expect(srcs).not.toContain('/backdrops/backdrop-23.jpg');
  });

  it('no caption or alt text names a child (owner request, 22 Oct 2026 — theme-only captions)', () => {
    const names = [
      'Sharan',
      'Nikitharan',
      'Raphael',
      'Enzo',
      'Elakiya',
      'Lady Julie',
      'Herman Keh',
      'Vishal',
      'Azkayra',
      'Daxton',
      'Farzanah',
      'Iymran',
      'Leia',
      'Aarav',
    ];
    for (const photo of BACKDROPS) {
      for (const name of names) {
        expect(photo.caption).not.toContain(name);
        expect(photo.alt).not.toContain(name);
      }
    }
  });

  it('moves 21st/28th/30th/55th birthdays into a separate "Grown-Up Celebrations" row (owner request, 23 Oct 2026)', () => {
    const grownUp = BACKDROPS.filter((b) => b.category === 'Grown-Up Celebrations');
    expect(grownUp.length).toBe(4);
    const captions = grownUp.map((b) => b.caption);
    expect(captions).toContain('28th birthday, Stitch-themed');
    expect(captions).toContain('55th birthday soirée');
    expect(captions).toContain('30th birthday');
    expect(captions).toContain('21st birthday');
  });

  it('renders a visible caption under each photo', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const captions = Array.from(el.querySelectorAll('.carousel__caption'));
    expect(captions.length).toBe(19);
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

  it('uses a page-specific WhatsApp link naming "Birthdays & Celebrations" (no email/quote/contact/form on this page)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      expect(decodeURIComponent(a.href)).toContain('Birthdays & Celebrations');
    }
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/request a quote|contact us/i);
  });

  it('shows no quantity language, and no price outside the "Make It a Full Party" add-ons (guardrail)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);

    // Backdrops/decor itself stays quote-only — no price anywhere outside
    // the add-on cards (shared/addons.ts, approved pricing — 19 Oct 2026).
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelector('.full-party')?.remove();
    expect(clone.textContent).not.toMatch(/\$|SGD|price|from\s*\$/i);
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

    // Lead time (owner request, 23 Oct 2026) — book anytime, including
    // last-minute, no preferred window pushed.
    expect(text).toContain('You can book anytime');
    expect(text).toMatch(/last-minute/i);
  });
});
