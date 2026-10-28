import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(SiteFooter).componentInstance).toBeTruthy();
  });

  it('shows "Event Decoration · Singapore" (26 Oct 2026 — changed from "Event Decor" for keyword consistency)', () => {
    const fixture = TestBed.createComponent(SiteFooter);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const place = el.querySelector('.footer__place');
    expect(place?.textContent?.trim()).toBe('Event Decoration · Singapore');
  });

  it('deep-links to /party-decorations-singapore as "Party Decorations" (28 Oct 2026 — swapped from the /event-decoration-singapore link so the real portfolio page, not the thinner SEO landing page, gets the footer-wide internal link)', () => {
    const fixture = TestBed.createComponent(SiteFooter);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('.footer__link')) as HTMLAnchorElement[];
    const partyLink = links.find((a) => a.getAttribute('href') === '/party-decorations-singapore');
    expect(partyLink).toBeTruthy();
    expect(partyLink?.textContent?.trim()).toBe('Party Decorations');
    expect(links.some((a) => a.getAttribute('href') === '/event-decoration-singapore')).toBeFalse();
  });
});
