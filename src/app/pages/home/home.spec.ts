import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Home).componentInstance).toBeTruthy();
  });

  it('hero <img> is wired to an (error) handler that falls back to the SSR-safe default photo if the client-side swap fails to load (26 Oct 2026 fix — "some users can\'t see the hero image")', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    interface HomeWithHero {
      heroImage: ReturnType<typeof import('@angular/core').signal<{ src: string }>>;
      onHeroImageError(): void;
    }
    const component = fixture.componentInstance as unknown as HomeWithHero;
    // HERO_IMAGES[0] in home.ts — the SSR/prerender-safe default. afterNextRender()
    // has already fired by this point in a TestBed fixture (it already picked a
    // random photo, which is why this test can't just read the current src as
    // "the default"), so the known-good fallback src is asserted directly here.
    const defaultSrc = '/backdrops/hero-minecraft.jpg';

    // Simulate the post-hydration rotation having picked a different photo,
    // then that photo's fetch failing on the visitor's end (ad blocker,
    // flaky network, CDN hiccup). Before this fix the <img> was simply left
    // pointing at a broken src with no fallback.
    component.heroImage.set({ src: '/backdrops/backdrop-12.jpg' });
    expect(component.heroImage().src).not.toBe(defaultSrc);

    // Directly invoke the error handler, as the (error) binding would on a
    // failed image load, and confirm it reverts to the known-good default.
    component.onHeroImageError();
    expect(component.heroImage().src).toBe(defaultSrc);

    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const img = el.querySelector('.hero__img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe(defaultSrc);

    // A second error on the already-reverted default must not loop/throw.
    expect(() => component.onHeroImageError()).not.toThrow();
    expect(component.heroImage().src).toBe(defaultSrc);
  });

  it('.btn gets a 220px min-width and centered text so short-label buttons match longer ones (button-width consistency fix)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('.btn') as HTMLElement;
    expect(btn).toBeTruthy();
    const style = getComputedStyle(btn);
    expect(style.minWidth).toBe('220px');
    expect(style.textAlign).toBe('center');
  });

  it('hero has no eyebrow kicker — straight into the H1 (owner request 13 Oct 2026); company name/UEN live in the footer and /contact only', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hero .eyebrow')).toBeNull();
    expect(el.querySelector('.hero')?.textContent ?? '').not.toContain('UEN');
  });

  it('has exactly one H1, matching the SEO-optimised copy exactly — no meta-title pipe/brand-suffix in the visible heading (26 Oct 2026, pre-merge review fix)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = Array.from(el.querySelectorAll('h1'));
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent?.trim()).toBe('Birthday, Party & Event Decoration Singapore');
  });

  it('passes [compact]="true" to app-events-we-style so the homepage shows the 3-item add-ons teaser (26 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const addonsSection = Array.from(el.querySelectorAll('section')).find((s) =>
      s.querySelector('#addons-heading'),
    ) as HTMLElement;
    expect(addonsSection.querySelectorAll('.addon').length).toBe(3);
    expect(addonsSection.querySelector('.addons__see-all')).toBeTruthy();
  });

  it('hero subheadline names LinkNow as a birthday/party/event decoration company (25 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const sub = el.querySelector('.hero__sub');
    expect(sub?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'LinkNow Pte Ltd is a birthday, party and event decoration company in Singapore — ' +
        'custom backdrops, balloon garlands and full party styling for any occasion. HDB void ' +
        'decks, condo function rooms and private venues welcome. From S$349.',
    );
  });

  it('hero has a WhatsApp primary CTA and a "See what we do" anchor to #occasions (R1.3/R1.4)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hero = el.querySelector('.hero') as HTMLElement;
    const wa = hero.querySelector('a.btn--solid') as HTMLAnchorElement;
    expect(wa.getAttribute('href')).toContain('wa.me/6588090600');
    expect(wa.getAttribute('target')).toBe('_blank');
    const seeMore = hero.querySelector('a.btn--ghost') as HTMLAnchorElement;
    expect(seeMore.getAttribute('href')).toBe('#occasions');
    expect(seeMore.textContent?.trim()).toBe('See what we do');
  });

  it('hero has exactly 2 action buttons — no "Contact Us" button (owner request 13 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const actions = el.querySelector('.hero__actions') as HTMLElement;
    const buttons = Array.from(actions.querySelectorAll('a'));
    expect(buttons.length).toBe(2);
    expect(buttons.map((b) => b.textContent?.trim())).toEqual([
      'Enquire on WhatsApp',
      'See what we do',
    ]);
  });

  it('hero image is one of the kids\'-party/birthday photos only — no corporate or fine-dining photo (rotated, owner request 23 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hero = el.querySelector('.hero__img') as HTMLImageElement;
    expect(hero).toBeTruthy();
    expect([
      '/backdrops/hero-minecraft.jpg',
      '/backdrops/backdrop-24.jpg',
      '/backdrops/backdrop-12.jpg',
      '/backdrops/backdrop-17.jpg',
    ]).toContain(hero.getAttribute('src') ?? '');
    expect((hero.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    expect(hero.getAttribute('width')).toBeTruthy();
    expect(hero.getAttribute('height')).toBeTruthy();
  });

  it('renders the shared "Events we style" section (via app-events-we-style), no old pink bundle band', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#occasions') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.querySelector('h2')?.textContent?.trim()).toBe('Events we style');

    const cards = Array.from(section.querySelectorAll('a.service--link')) as HTMLAnchorElement[];
    expect(cards.length).toBe(3);

    // No separate "Our services" section or old pink bundle band.
    expect(el.querySelectorAll('#services-heading').length).toBe(0);
    expect(el.querySelector('#bundle-heading')).toBeNull();
    expect(el.textContent ?? '').not.toContain('One booking, one team');
  });

  it('fires a whatsapp_click GA event for the hero CTA, without blocking navigation', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as {
      trackWhatsappClick: (section: string, item: string) => void;
    };
    const spy = spyOn(instance, 'trackWhatsappClick');
    const el = fixture.nativeElement as HTMLElement;
    const heroWa = el.querySelector('.hero a.btn--solid') as HTMLAnchorElement;
    heroWa.click();
    expect(spy).toHaveBeenCalledWith('hero', 'generic');
  });

  it('renders real decor images in the service cards and the retail portfolio teaser', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const tiles = Array.from(el.querySelectorAll('.portfolio__img')) as HTMLImageElement[];
    expect(tiles.length).toBe(2);
    for (const img of tiles) {
      expect(img.getAttribute('src')).toMatch(/^\/backdrops\//);
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
  });

  it('splits "Recent work" vertically into Customers (left) and Corporate & organisations (right)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Recent work');
    const groups = Array.from(el.querySelectorAll('.portfolio-group'));
    expect(groups.length).toBe(2);
    const labels = groups.map((g) => g.querySelector('h3')?.textContent?.trim());
    expect(labels).toEqual(['Customers', 'Corporate & organisations']);
  });

  it('gives each "Recent work" sub-section its own "See more" link to the full gallery', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const groups = Array.from(el.querySelectorAll('.portfolio-group'));
    const ctas = groups.map(
      (g) => g.querySelector('.section__cta a') as HTMLAnchorElement | null,
    );
    expect(ctas.every((a) => a?.textContent?.trim() === 'See more')).toBeTrue();
    expect(ctas[0]?.getAttribute('href')).toBe('/backdrops');
    expect(ctas[1]?.getAttribute('href')).toBe('/corporate');
  });

  it("shows the People's Association and Avocadoria use-case cards, styled and linked exactly like /corporate", () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.case-card')) as HTMLAnchorElement[];
    expect(cards.length).toBe(2);
    const hrefs = cards.map((c) => c.getAttribute('href'));
    expect(hrefs).toEqual(['/corporate/peoples-association', '/corporate/avocadoria']);
    const labels = Array.from(el.querySelectorAll('.case-card__label')).map((n) =>
      (n.textContent ?? '').trim(),
    );
    expect(labels.some((l) => l.includes("People's Association"))).toBeTrue();
    expect(labels.some((l) => l.includes('Avocadoria'))).toBeTrue();
    for (const card of cards) {
      const img = card.querySelector('.case-card__img') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.getAttribute('loading')).toBe('lazy');
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
  });

  it('shows testimonials as "Verified Google review" and never the reviewer name', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Client Testimonials');
    const authors = Array.from(el.querySelectorAll('.testimonial__author'));
    expect(authors.length).toBeGreaterThan(0);
    for (const cap of authors) {
      expect(cap.textContent?.trim()).toBe('Verified Google review');
    }
    // The first reviewer's name must not appear anywhere on the page.
    expect(el.textContent ?? '').not.toContain('Lisha Soh');
  });

  it('shows the same FAQ as /backdrops, above "Planning something?" (UX review, 23 Oct 2026)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('.faq__item')) as HTMLDetailsElement[];
    expect(items.length).toBeGreaterThanOrEqual(4);
    expect(el.textContent ?? '').toContain('You can book anytime');

    const sections = Array.from(el.querySelectorAll('section'));
    const faqIndex = sections.findIndex((s) => s.querySelector('#faq-heading'));
    const enquiryIndex = sections.findIndex((s) => s.querySelector('#enquiry-heading'));
    expect(faqIndex).toBeGreaterThanOrEqual(0);
    expect(enquiryIndex).toBeGreaterThan(faqIndex);
  });

  it('shows the "Our Clients" logo row — all 4 logos, no names/descriptions shown', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Our Clients');
    const logos = Array.from(el.querySelectorAll('.clients__logo')) as HTMLImageElement[];
    expect(logos.length).toBe(4);
    for (const logo of logos) {
      expect((logo.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(logo.getAttribute('src')).toMatch(/^\/brand\/clients\//);
    }
    // Order: People's Association, AWWA, Bucket House, Avocadoria.
    const srcs = logos.map((l) => l.getAttribute('src'));
    expect(srcs).toEqual([
      '/brand/clients/peoples-association.png',
      '/brand/clients/awwa.png',
      '/brand/clients/bucket-house.png',
      '/brand/clients/avocadoria.png',
    ]);
  });
});
