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

  it('links the portfolio teaser to /backdrops', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const link = el.querySelector('a[href="/backdrops"]');
    expect(link).toBeTruthy();
  });

  it('renders real backdrop images in the service cards and portfolio teaser', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const serviceImgs = Array.from(el.querySelectorAll('.service__img')) as HTMLImageElement[];
    expect(serviceImgs.length).toBe(3);
    expect(serviceImgs[0].getAttribute('src')).toBe('/backdrops/backdrop-07.jpg');
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
