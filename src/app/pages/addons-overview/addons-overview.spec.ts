import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AddonsOverviewPage } from './addons-overview';

describe('AddonsOverviewPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddonsOverviewPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(AddonsOverviewPage).componentInstance).toBeTruthy();
  });

  it('.btn gets a 220px min-width and centered text so short-label buttons match longer ones (button-width consistency fix)', () => {
    const fixture = TestBed.createComponent(AddonsOverviewPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const btn = el.querySelector('.btn') as HTMLElement;
    expect(btn).toBeTruthy();
    const style = getComputedStyle(btn);
    expect(style.minWidth).toBe('220px');
    expect(style.textAlign).toBe('center');
  });

  it('has a single h1', () => {
    const fixture = TestBed.createComponent(AddonsOverviewPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('groups all 7 add-ons into Food & Drink Stations (4) and Entertainment (3)', () => {
    const fixture = TestBed.createComponent(AddonsOverviewPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const foodSection = el.querySelector('#food-heading')?.closest('section') as HTMLElement;
    const entertainmentSection = el
      .querySelector('#entertainment-heading')
      ?.closest('section') as HTMLElement;
    expect(foodSection).toBeTruthy();
    expect(entertainmentSection).toBeTruthy();

    const foodTitles = Array.from(foodSection.querySelectorAll('h3')).map((h) =>
      h.textContent?.trim(),
    );
    expect(foodTitles).toEqual([
      'Popcorn Station',
      'Candy Floss',
      'Soft Serve Ice Cream',
      'Buffet Catering',
    ]);

    const entertainmentTitles = Array.from(entertainmentSection.querySelectorAll('h3')).map(
      (h) => h.textContent?.trim(),
    );
    expect(entertainmentTitles).toEqual(['Bouncy Castle', 'Balloon Sculpting', 'Party Hosting']);
  });

  it('links each priced add-on to its own detail page', () => {
    const fixture = TestBed.createComponent(AddonsOverviewPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a.addon')) as HTMLAnchorElement[];
    const hrefs = links.map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      '/services/popcorn-station',
      '/services/candy-floss',
      '/services/soft-serve-ice-cream',
      '/services/buffet-catering',
      '/services/bouncy-castle',
      '/services/balloon-sculpting',
    ]);
  });

  it('has a generic WhatsApp CTA — no mailto, no forms', () => {
    const fixture = TestBed.createComponent(AddonsOverviewPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
  });
});
