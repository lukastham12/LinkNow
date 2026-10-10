import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Services } from './services';

describe('Services', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Services).componentInstance).toBeTruthy();
  });

  it('has a single h1', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('invites a no-obligation WhatsApp quote without quoting any price (no $/SGD figure)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text.toLowerCase()).toContain('message us for a quick, no-obligation quote');
    expect(text).not.toMatch(/\$|SGD/);
  });

  it('shows the same "Events we style" section as the homepage, linking to /backdrops, /flowers and /corporate', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#occasions') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.querySelector('h2')?.textContent?.trim()).toBe('Events we style');

    const cards = Array.from(section.querySelectorAll('a.service--link')) as HTMLAnchorElement[];
    expect(cards.length).toBe(3);
    const hrefs = cards.map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/backdrops', '/flowers', '/corporate']);
  });

  it('shows the same "Other Services We Provide" section as the homepage, as plain unclickable cards', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('.addon'));
    expect(items.length).toBe(4);
    expect(el.querySelectorAll('a.addon').length).toBe(0);
    const titles = items.map((item) => item.querySelector('h3')?.textContent?.trim());
    expect(titles).toEqual(['Food Station', 'Bouncy Castle', 'Balloon Sculpting', 'Party Hosting']);
  });

  it('does not embed the floral gallery (it now lives on /flowers)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-floral-showcase')).toBeNull();
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    // No contact route, no mailto, no forms.
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/request a quote|contact us/i);
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });
});
