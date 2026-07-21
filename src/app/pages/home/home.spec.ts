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

  it('links the "Recent work" teaser to /services', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Recent work');
    const cta = el.querySelector('.section__cta a[href="/services"]');
    expect(cta).toBeTruthy();
    // The teaser no longer points at the /backdrops portfolio.
    expect(el.querySelector('.section__cta a[href="/backdrops"]')).toBeNull();
  });

  it('uses the hero backdrop photo (backdrop-07) as a cover image', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hero = el.querySelector('.hero__img') as HTMLImageElement;
    expect(hero).toBeTruthy();
    expect(hero.getAttribute('src')).toBe('/backdrops/backdrop-07.jpg');
    // The old hydrangea cut-out is gone.
    expect(el.querySelector('.hero__flower')).toBeNull();
  });

  it('renders real décor images in the service cards and portfolio teaser', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const serviceImgs = Array.from(el.querySelectorAll('.service__img')) as HTMLImageElement[];
    expect(serviceImgs.length).toBe(3);
    // Custom Backdrops card uses backdrop-02 (differs from the hero, backdrop-07).
    expect(serviceImgs[0].getAttribute('src')).toBe('/backdrops/backdrop-02.jpg');
    // Floral card uses the lush wrapped bouquet, shown whole.
    expect(serviceImgs[1].getAttribute('src')).toBe('/flowers/floral-feature.jpg');
    expect(serviceImgs[2].getAttribute('src')).toBe('/backdrops/backdrop-09.jpg');
    const tiles = Array.from(el.querySelectorAll('.portfolio__img')) as HTMLImageElement[];
    expect(tiles.length).toBe(6);
    for (const img of tiles) {
      expect(img.getAttribute('src')).toMatch(/\/backdrops\/backdrop-\d{2}\.jpg$/);
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
    // No leftover placeholder panels.
    expect(el.querySelector('.ph')).toBeNull();
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
});
