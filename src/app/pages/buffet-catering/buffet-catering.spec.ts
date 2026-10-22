import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BuffetCateringPage } from './buffet-catering';
import { BUFFET_LINES } from '../../shared/buffet-menu';

describe('BuffetCateringPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffetCateringPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(BuffetCateringPage).componentInstance).toBeTruthy();
  });

  it('.btn gets a 220px min-width and centered text so short-label buttons match longer ones (button-width consistency fix)', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('.btn') as HTMLElement;
    expect(btn).toBeTruthy();
    const style = getComputedStyle(btn);
    expect(style.minWidth).toBe('220px');
    expect(style.textAlign).toBe('center');
  });

  it('has a single h1 and a back link to /services', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent?.trim()).toBe('Buffet Catering');
    const back = el.querySelector('a.back') as HTMLAnchorElement;
    expect(back.getAttribute('href')).toBe('/services#addons-heading');
  });

  it('renders every buffet line as a section with its tiers as accordions', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const lineTitles = Array.from(el.querySelectorAll('.line__title')).map((h) =>
      h.textContent?.trim(),
    );
    expect(lineTitles).toEqual(BUFFET_LINES.map((l) => l.title));

    const totalTiers = BUFFET_LINES.reduce((sum, line) => sum + line.tiers.length, 0);
    expect(el.querySelectorAll('.tier').length).toBe(totalTiers);
  });

  it('shows the Classic Buffet Standard tier with its price, pax and 3 cuisine stations', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';

    expect(text).toContain('$18.90 / pax');
    expect(text).toContain('$20.60 / pax incl. GST');
    expect(text).toContain('Min 40 pax');
    expect(text).toContain('Local Taste Buffet');
    expect(text).toContain('Modern Asian Buffet');
    expect(text).toContain('International Buffet');
    expect(text).toMatch(/Sweet and Sour Fish/i);
  });

  it('shows the Mini Buffet Fusion tiers A/B/C and the International Lite Breakfast', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('$21.90 / pax');
    expect(text).toContain('$23.90 / pax');
    expect(text).toContain('$26.90 / pax');
    expect(text).toContain('International Lite Breakfast');
    expect(text).toContain('$12.90 / pax');
  });

  it('shows the extra-charges table (service staff, transport/delivery, setup)', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const rows = Array.from(el.querySelectorAll('.extras__row')).map((r) => r.textContent?.trim());
    expect(rows.length).toBeGreaterThan(0);
    const text = el.textContent ?? '';
    expect(text).toMatch(/service staff/i);
    expect(text).toMatch(/transport/i);
    expect(text).toMatch(/delivery/i);
  });

  it('CTA is WhatsApp + email only — no vendor name/contact details, no cart/checkout', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';

    expect(text).not.toMatch(/yea!?\s*mama|yeamama/i);
    expect(text).not.toMatch(/6964\s*7088|9099\s*7675/);
    expect(text).not.toMatch(/add to cart/i);

    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      const decoded = decodeURIComponent(a.href);
      expect(decoded).toContain('Buffet Catering');
    }

    const mailtoLinks = Array.from(el.querySelectorAll('a[href^="mailto:"]')) as HTMLAnchorElement[];
    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const a of mailtoLinks) {
      expect(a.getAttribute('href')).toBe('mailto:novestelatham@linknow-singapore.com');
    }

    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
  });

  it('does not show the vendor’s detailed cancellation/booking terms (owner only asked for pricing/offerings)', () => {
    const fixture = TestBed.createComponent(BuffetCateringPage);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/cancellation/i);
    expect(text).not.toMatch(/sales@yeamama/i);
  });
});
