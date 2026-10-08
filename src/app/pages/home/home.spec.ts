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

  it('shows the three service lines (with Corporate Events, not Setup-Only Labour)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Custom Backdrops');
    expect(text).toContain('Floral Services');
    expect(text).toContain('Corporate Events');
    expect(text).not.toContain('Setup-Only Labour');
  });

  it('has WhatsApp CTAs using the canonical link', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(el.querySelectorAll('a[href*="wa.me/6588090600"]'));
    expect(waLinks.length).toBeGreaterThan(0);
  });

  it('uses the Minecraft backdrop photo as the hero cover image', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hero = el.querySelector('.hero__img') as HTMLImageElement;
    expect(hero).toBeTruthy();
    expect(hero.getAttribute('src')).toBe('/backdrops/hero-minecraft.jpg');
    expect((hero.getAttribute('alt') ?? '').toLowerCase()).toContain('minecraft');
    // The old hydrangea cut-out is gone.
    expect(el.querySelector('.hero__flower')).toBeNull();
  });

  it('renders real décor images in the service cards and the retail portfolio teaser', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const serviceImgs = Array.from(el.querySelectorAll('.service__img')) as HTMLImageElement[];
    expect(serviceImgs.length).toBe(3);
    expect(serviceImgs[0].getAttribute('src')).toBe('/backdrops/backdrop-07.jpg');
    expect(serviceImgs[1].getAttribute('src')).toBe('/flowers/custom-arrangement-hero.jpg');
    expect(serviceImgs[2].getAttribute('src')).toBe('/backdrops/backdrop-09.jpg');

    const tiles = Array.from(el.querySelectorAll('.portfolio__img')) as HTMLImageElement[];
    expect(tiles.length).toBe(2);
    for (const img of tiles) {
      expect(img.getAttribute('src')).toMatch(/^\/backdrops\//);
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
    // No leftover placeholder panels.
    expect(el.querySelector('.ph')).toBeNull();
  });

  it('splits "Recent work" vertically into Retail customers (left) and Corporate & organisations (right)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Recent work');
    const groups = Array.from(el.querySelectorAll('.portfolio-group'));
    expect(groups.length).toBe(2);
    const labels = groups.map((g) => g.querySelector('h3')?.textContent?.trim());
    expect(labels).toEqual(['Retail customers', 'Corporate & organisations']);
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

  it('links the Corporate Events service card to /corporate', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const card = el.querySelector('a.service--link[href="/corporate"]') as HTMLAnchorElement;
    expect(card).toBeTruthy();
    expect(card.textContent ?? '').toContain('Corporate Events');
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
