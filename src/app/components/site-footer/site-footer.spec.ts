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
});
