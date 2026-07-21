import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(SiteHeader).componentInstance).toBeTruthy();
  });

  it('renders the top-level nav (Home, Services, About) with no Flowers tab', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const topLevel = Array.from(el.querySelectorAll('.header__nav > .header__link, .header__item')).map(
      (n) => (n.querySelector('.header__link') ?? n).textContent?.trim(),
    );
    expect(topLevel).toEqual(['Home', 'Services', 'About']);
    // Floral is only reachable under the Services dropdown, never a top tab.
    const flowersTopTab = Array.from(el.querySelectorAll('.header__nav > .header__link')).find((a) =>
      /flowers|floral/i.test(a.textContent ?? ''),
    );
    expect(flowersTopTab).toBeUndefined();
  });

  it('the Services label still navigates to /services', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const servicesLink = el.querySelector('.header__item .header__link') as HTMLAnchorElement;
    expect(servicesLink.getAttribute('href')).toBe('/services');
  });

  it('exposes an accessible dropdown toggle (aria-haspopup, aria-expanded, aria-controls)', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const caret = el.querySelector('.header__caret') as HTMLButtonElement;
    expect(caret).toBeTruthy();
    expect(caret.getAttribute('aria-haspopup')).toBe('true');
    expect(caret.getAttribute('aria-expanded')).toBe('false');
    const submenu = el.querySelector('.submenu') as HTMLElement;
    expect(caret.getAttribute('aria-controls')).toBe(submenu.id);
  });

  it('lists the three service children linking to /backdrops, /flowers and /corporate', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('.submenu__link')) as HTMLAnchorElement[];
    const labels = links.map((a) => a.textContent?.trim());
    expect(labels).toEqual(['Custom Backdrops', 'Floral Services', 'Corporate Events']);
    const floral = links.find((a) => a.textContent?.includes('Floral Services'));
    expect(floral?.getAttribute('href')).toBe('/flowers');
    const backdrops = links.find((a) => a.textContent?.includes('Custom Backdrops'));
    expect(backdrops?.getAttribute('href')).toBe('/backdrops');
    const corporate = links.find((a) => a.textContent?.includes('Corporate Events'));
    expect(corporate?.getAttribute('href')).toBe('/corporate');
  });

  it('opens the dropdown on keyboard focus (focusin) and reflects it in aria-expanded', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const item = el.querySelector('.header__item') as HTMLElement;
    item.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    const caret = el.querySelector('.header__caret') as HTMLButtonElement;
    expect(caret.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.submenu--open')).toBeTruthy();
  });

  it('closes the dropdown on Escape', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const caret = el.querySelector('.header__caret') as HTMLButtonElement;
    caret.click();
    fixture.detectChanges();
    expect(caret.getAttribute('aria-expanded')).toBe('true');
    caret.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(caret.getAttribute('aria-expanded')).toBe('false');
    expect(el.querySelector('.submenu--open')).toBeNull();
  });
});
