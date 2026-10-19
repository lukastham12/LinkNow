import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { AddonDetailPage } from './addon-detail';
import { ADDON_DETAILS } from '../../shared/addon-details';

function configure(slug: string) {
  return TestBed.configureTestingModule({
    imports: [AddonDetailPage],
    providers: [
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { data: { slug } } },
      },
    ],
  }).compileComponents();
}

describe('AddonDetailPage', () => {
  it('should create for each known add-on slug', async () => {
    for (const addon of ADDON_DETAILS) {
      await configure(addon.slug);
      const fixture = TestBed.createComponent(AddonDetailPage);
      expect(fixture.componentInstance).toBeTruthy();
      TestBed.resetTestingModule();
    }
  });

  it('renders the Popcorn Station page with its h1, tagline, pricing tiers and extra-hour note', async () => {
    await configure('popcorn-station');
    const fixture = TestBed.createComponent(AddonDetailPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent?.trim()).toBe('Popcorn Station');

    const rows = Array.from(el.querySelectorAll('.pricing__row')).map((r) => r.textContent?.trim());
    expect(rows).toEqual(['2 hrs$220', '3 hrs$320', '4 hrs$420', 'Extra hour+$100 / hour']);

    const back = el.querySelector('a.back') as HTMLAnchorElement;
    expect(back).toBeTruthy();
    expect(back.getAttribute('href')).toBe('/services#addons-heading');
  });

  it('renders the Bouncy Castle page with no extra-hour row (none supplied)', async () => {
    await configure('bouncy-castle');
    const fixture = TestBed.createComponent(AddonDetailPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const rows = Array.from(el.querySelectorAll('.pricing__row')).map((r) => r.textContent?.trim());
    expect(rows).toEqual(['2 hrs$95', '3 hrs$120', '4 hrs$140']);
  });

  it('renders the Balloon Sculpting page with its 4 hourly tiers starting at 1 hour', async () => {
    await configure('balloon-sculpting');
    const fixture = TestBed.createComponent(AddonDetailPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const rows = Array.from(el.querySelectorAll('.pricing__row')).map((r) => r.textContent?.trim());
    expect(rows).toEqual(['1 hr$120', '2 hrs$220', '3 hrs$320', '4 hrs$420', 'Extra hour+$100 / hour']);
  });

  it('CTA is WhatsApp + email only — no vendor contact details, no "Add to Cart"', async () => {
    await configure('candy-floss');
    const fixture = TestBed.createComponent(AddonDetailPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';

    expect(text).not.toMatch(/add to cart/i);
    expect(text).not.toMatch(/dotxevents|dot\s*&\s*events|8085\s*4682/i);

    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      const decoded = decodeURIComponent(a.href);
      expect(decoded).toContain('Candy Floss');
    }

    const mailtoLinks = Array.from(el.querySelectorAll('a[href^="mailto:"]')) as HTMLAnchorElement[];
    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const a of mailtoLinks) {
      expect(a.getAttribute('href')).toBe('mailto:novestelatham@linknow-singapore.com');
    }

    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
  });

  it('shows "What\'s included" and an "About this service" description for every add-on', async () => {
    for (const addon of ADDON_DETAILS) {
      await configure(addon.slug);
      const fixture = TestBed.createComponent(AddonDetailPage);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      const text = el.textContent ?? '';
      expect(text).toContain('About this service');
      expect(text).toContain("What's included");
      expect(el.querySelectorAll('.details__list-item').length).toBeGreaterThan(0);
      TestBed.resetTestingModule();
    }
  });

  it('shows a price-area disclaimer and no unverified certification/attendant claims (guardrail)', async () => {
    for (const addon of ADDON_DETAILS) {
      await configure(addon.slug);
      const fixture = TestBed.createComponent(AddonDetailPage);
      fixture.detectChanges();
      const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
      expect(text).toMatch(/surcharge/i);
      expect(text).not.toMatch(/halal.certified|costumed attendant/i);
      TestBed.resetTestingModule();
    }
  });
});
