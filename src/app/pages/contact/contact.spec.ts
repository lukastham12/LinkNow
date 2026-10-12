import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Contact).componentInstance).toBeTruthy();
  });

  it('has a single h1', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('offers both WhatsApp and email as contact channels', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const wa = el.querySelector('a[href*="wa.me/6588090600"]') as HTMLAnchorElement;
    expect(wa).toBeTruthy();
    const email = el.querySelector('a[href^="mailto:"]') as HTMLAnchorElement;
    expect(email).toBeTruthy();
    expect(email.getAttribute('href')).toContain('novestelatham@linknow-singapore.com');
  });

  it('shows the UEN and "studio by appointment", no fabricated address or hours', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('202608341G');
    expect(text).toContain('by appointment');
  });

  it('the mini enquiry form writes the entered details into the WhatsApp link', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const instance = fixture.componentInstance;
    (instance as unknown as { occasion: string }).occasion = 'Corporate event';
    (instance as unknown as { date: string }).date = '2026-12-01';
    (instance as unknown as { venue: string }).venue = 'Marina Bay Sands';
    (instance as unknown as { budget: string }).budget = '$1,000 – $2,500';
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const submit = el.querySelector('.form__submit') as HTMLAnchorElement;
    const href = decodeURIComponent(submit.getAttribute('href') ?? '');
    expect(href).toContain('Corporate event');
    expect(href).toContain('2026-12-01');
    expect(href).toContain('Marina Bay Sands');
    expect(href).toContain('$1,000');
  });

  it('shows no price/availability promises we cannot keep (guardrail)', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\bfrom\s*\$\d/i);
  });
});
