import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Extras } from './extras';
import { ADDONS } from '../../shared/addons';

describe('Extras', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Extras],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Extras).componentInstance).toBeTruthy();
  });

  it('has exactly one H1', () => {
    const fixture = TestBed.createComponent(Extras);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('shows all 4 add-ons, including the combined Food Station, each a WhatsApp link', () => {
    const fixture = TestBed.createComponent(Extras);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('a.addon')) as HTMLAnchorElement[];
    expect(items.length).toBe(ADDONS.length);
    expect(items.length).toBe(4);

    const titles = items.map((item) => item.querySelector('h3')?.textContent?.trim());
    expect(titles).toEqual(['Food Station', 'Bouncy Castle', 'Balloon Sculpting', 'Party Hosting']);

    for (const item of items) {
      expect(item.getAttribute('target')).toBe('_blank');
      expect(item.getAttribute('rel')).toBe('noopener noreferrer');
      expect(item.getAttribute('href')).toContain('wa.me/6588090600');
      expect(item.querySelector('svg')).toBeTruthy();
    }
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact/form)', () => {
    const fixture = TestBed.createComponent(Extras);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a[href^="http"]')) as HTMLAnchorElement[];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href')).toContain('wa.me/6588090600');
    }
    expect(el.textContent ?? '').not.toContain('mailto:');
  });
});
