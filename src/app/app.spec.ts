import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the shared header, footer and floating WhatsApp button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-site-header')).toBeTruthy();
    expect(el.querySelector('app-site-footer')).toBeTruthy();
    expect(el.querySelector('app-whatsapp-button')).toBeTruthy();
  });

  it('floating WhatsApp button uses the canonical link', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const wa = el.querySelector('app-whatsapp-button a') as HTMLAnchorElement | null;
    expect(wa?.getAttribute('href')).toContain('wa.me/6588090600');
  });
});
