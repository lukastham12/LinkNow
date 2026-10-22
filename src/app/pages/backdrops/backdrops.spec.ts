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

  it('.btn gets a 220px min-width and centered text so short-label buttons match longer ones (button-width consistency fix)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('.btn') as HTMLElement;
    expect(btn).toBeTruthy();
    const style = getComputedStyle(btn);
    expect(style.minWidth).toBe('220px');
    expect(style.textAlign).toBe('center');
  });

  it('has a single benefit-driven h1 (owner feedback, 22 Oct 2026 — "Birthdays & Celebrations" read as a category label, not a promise) and an accurate eyebrow', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toContain('Birthday setups your kid will remember');
    expect(el.querySelector('.eyebrow')?.textContent).toContain('Birthday Decor & Add-ons');
  });

  it('explains near the top that any theme is customisable, with examples (owner feedback, 22 Oct 2026; shortened to 22 Oct 2026, same day, for length)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const theme = el.querySelector('.intro__theme')?.textContent ?? '';
    expect(theme).toMatch(/any theme/i);
    expect(theme).toMatch(/pok[eé]mon/i);
    expect(theme).toMatch(/roblox/i);
    expect(theme).toMatch(/football/i);
  });

  it('shows no hero CTA button in mobile-only markup (keeps the hero compact so the gallery starts above the fold) but a desktop-only one exists, and no hero photo or trust line (owner spec, 22 Oct 2026 — both dropped the same day)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const desktopActions = el.querySelector('.intro__actions--desktop-only');
    expect(desktopActions).toBeTruthy();
    expect(desktopActions?.querySelector('a.btn--solid')).toBeTruthy();

    expect(el.querySelector('.intro__photo')).toBeNull();
    expect(el.querySelector('.intro__trust')).toBeNull();
    expect(el.textContent ?? '').not.toContain('Real 5-star reviews');
  });

  it('shows a chip-filtered gallery defaulting to "Kids\' Birthdays", with chips as an accessible tablist', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const tablist = el.querySelector('[role="tablist"]');
    expect(tablist).toBeTruthy();

    const chips = Array.from(el.querySelectorAll('.chip')) as HTMLButtonElement[];
    expect(chips.map((c) => c.textContent?.trim())).toEqual([
      "Kids' Birthdays",
      'Grown-Up',
      '100 Days & Naming',
      'Baby Shower',
    ]);
    expect(chips[0].getAttribute('aria-selected')).toBe('true');
    expect(chips[1].getAttribute('aria-selected')).toBe('false');
    expect(chips[0].classList).toContain('chip--active');
  });

  it('switching chips swaps the visible carousel photos to the selected category', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const birthdayGroup = BACKDROP_GROUPS.find((g) => g.category === 'Birthday')!;
    const babyGroup = BACKDROP_GROUPS.find((g) => g.category === 'Baby Shower & Gender Reveal')!;

    let visibleImgs = Array.from(el.querySelectorAll('.carousel__img')) as HTMLImageElement[];
    expect(visibleImgs.length).toBe(birthdayGroup.photos.length);

    const chips = Array.from(el.querySelectorAll('.chip')) as HTMLButtonElement[];
    chips[3].click();
    fixture.detectChanges();

    visibleImgs = Array.from(el.querySelectorAll('.carousel__img')) as HTMLImageElement[];
    expect(visibleImgs.length).toBe(babyGroup.photos.length);
    expect(visibleImgs[0].getAttribute('src')).toBe(babyGroup.photos[0].src);
    expect(chips[3].getAttribute('aria-selected')).toBe('true');
    expect(chips[0].getAttribute('aria-selected')).toBe('false');
  });

  it('keeps every category\'s photos in the DOM (not just the active one) so the whole gallery stays crawlable', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const allImgSrcs = Array.from(el.querySelectorAll('img'))
      .map((img) => img.getAttribute('src'))
      .filter((src) => src?.startsWith('/backdrops/backdrop-'));
    for (const photo of BACKDROPS) {
      expect(allImgSrcs).toContain(photo.src);
    }
  });

  it('shows the "Make It a Full Party" add-on card strip after the gallery, linking to /services/add-ons (owner spec, 22 Oct 2026, restored same day in place of the single-line redirect)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const sections = Array.from(el.querySelectorAll('section'));
    const galleryIndex = sections.findIndex((s) => s.classList.contains('gallery'));
    const fullPartyIndex = sections.findIndex((s) => s.querySelector('#full-party-heading'));
    expect(fullPartyIndex).toBe(galleryIndex + 1);

    const fullPartySection = sections[fullPartyIndex];
    const addonTitles = Array.from(fullPartySection.querySelectorAll('h3')).map((h) =>
      h.textContent?.trim(),
    );
    expect(addonTitles).toEqual(['Bouncy Castle', 'Candy Floss', 'Popcorn Station', 'Party Hosting']);

    const seeAllLink = fullPartySection.querySelector('a.btn--ghost') as HTMLAnchorElement;
    expect(seeAllLink).toBeTruthy();
    expect(seeAllLink.getAttribute('href')).toBe('/services/add-ons');
  });

  it('shows a 4-step "How It Works" section between the gallery and testimonials', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const items = Array.from(el.querySelectorAll('.steps__item'));
    expect(items.length).toBe(4);
    const titles = items.map((i) => i.querySelector('.steps__item-title')?.textContent?.trim());
    expect(titles).toEqual(['Send us your theme', 'We send a mock-up', 'You confirm', 'We set up and clear']);
  });

  it('lists all 19 backdrop photos across the gallery with descriptive alt text', () => {
    expect(BACKDROPS.length).toBe(19);
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(
      el.querySelectorAll('.gallery img[src^="/backdrops/backdrop-"]'),
    ) as HTMLImageElement[];
    expect(imgs.length).toBe(19);
    for (const img of imgs) {
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
  });

  it('excludes the Avocadoria corporate photos (backdrop-08, backdrop-09) — now on /corporate', () => {
    const srcs = BACKDROPS.map((b) => b.src);
    expect(srcs).not.toContain('/backdrops/backdrop-08.jpg');
    expect(srcs).not.toContain('/backdrops/backdrop-09.jpg');
  });

  it('excludes backdrop-16 — a duplicate of the backdrop-25 gender-reveal photo', () => {
    const srcs = BACKDROPS.map((b) => b.src);
    expect(srcs).not.toContain('/backdrops/backdrop-16.jpg');
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

  it('no caption or alt text names a child (theme-only captions)', () => {
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

  it('renders a visible caption under each active-category photo', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const captions = Array.from(el.querySelectorAll('.carousel__caption'));
    const birthdayGroup = BACKDROP_GROUPS.find((g) => g.category === 'Birthday')!;
    expect(captions.length).toBe(birthdayGroup.photos.length);
    for (const caption of captions) {
      expect((caption.textContent ?? '').trim().length).toBeGreaterThan(0);
    }
  });

  it('each carousel scrolls horizontally rather than wrapping into a grid', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.carousel').length).toBe(1);
  });

  it('every WhatsApp button (hero, final CTA) uses the page-specific birthday-party prefill (owner spec, 22 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThanOrEqual(2);
    for (const a of waLinks) {
      const decoded = decodeURIComponent(a.href);
      expect(decoded).toContain("I'm planning a birthday party");
      expect(decoded).toContain('Date:');
      expect(decoded).toContain('Venue (HDB / condo / other):');
      expect(decoded).toContain('Theme:');
      expect(decoded).toContain("Add-ons I'm interested in:");
    }
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
  });

  it('shows a bold "Backdrop starts at S$349" price anchor in the intro (owner override, 22 Oct 2026 — explicit, acknowledged exception to decor staying quote-only on this page only) and no price anywhere else outside it and the "Make It a Full Party" add-ons', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);

    const priceEl = el.querySelector('.intro__price');
    expect(priceEl?.textContent?.trim()).toBe('Backdrop starts at S$349');
    expect(priceEl?.querySelector('strong')?.textContent).toContain('S$349');

    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelector('.full-party')?.remove();
    clone.querySelector('.intro')?.remove();
    expect(clone.textContent).not.toMatch(/\$|SGD|from\s*s?\$/i);
  });

  it('shows real testimonials minus the two bouquet reviews (owner spec, 22 Oct 2026 — this page only, shared/testimonials.ts is unchanged)', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('What our clients say');
    expect(el.querySelector('app-reviews-carousel')).toBeTruthy();

    const component = fixture.componentInstance;
    expect(component['testimonials'].length).toBe(TESTIMONIALS.length - 2);
    expect(
      component['testimonials'].some((t: { quote: string }) =>
        t.quote.includes('the big and beautiful bouquet'),
      ),
    ).toBeFalse();
    expect(
      component['testimonials'].some((t: { quote: string }) =>
        t.quote.includes('soap flower bouquets'),
      ),
    ).toBeFalse();
  });

  it('shows a short FAQ covering lead time, venues, inclusions, deposit/cancellation and rain backup', () => {
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
  });

  it('final CTA text is unchanged ("Ready to plan the party...")', () => {
    const fixture = TestBed.createComponent(Backdrops);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Ready to plan the party? Tell us your date and theme.');
  });
});
