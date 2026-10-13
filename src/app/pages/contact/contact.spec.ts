import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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

  it('has a Name, Phone, Event Type, Event Date and Message form that submits to Web3Forms', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as {
      name: string;
      phone: string;
      eventType: string;
      eventDate: string;
      message: string;
    };
    instance.name = 'Jane Tan';
    instance.phone = '+65 9123 4567';
    instance.eventType = 'Corporate event';
    instance.eventDate = '2026-12-01';
    instance.message = '50 guests at an office';
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const form = el.querySelector('form.form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const req = httpMock.expectOne('https://api.web3forms.com/submit');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.access_key).toBe('3e1dbb4e-f13e-45c5-9ab6-ec9219c374b0');
    expect(req.request.body.name).toBe('Jane Tan');
    expect(req.request.body.phone).toBe('+65 9123 4567');
    expect(req.request.body.event_type).toBe('Corporate event');
    expect(req.request.body.event_date).toBe('2026-12-01');
    expect(req.request.body.message).toBe('50 guests at an office');
    req.flush({ success: true });
  });

  it('shows a success message and clears the form after a successful submit', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as {
      name: string;
      phone: string;
      eventType: string;
    };
    instance.name = 'Jane Tan';
    instance.phone = '+65 9123 4567';
    instance.eventType = 'Birthday';
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    (el.querySelector('form.form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const req = httpMock.expectOne('https://api.web3forms.com/submit');
    req.flush({ success: true });
    fixture.detectChanges();

    expect(el.textContent ?? '').toContain("Thanks! Your message has been sent");
    expect(instance.name).toBe('');
  });

  it('shows an error message and keeps the form data if the submit fails', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as {
      name: string;
      phone: string;
      eventType: string;
    };
    instance.name = 'Jane Tan';
    instance.phone = '+65 9123 4567';
    instance.eventType = 'Birthday';
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    (el.querySelector('form.form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const req = httpMock.expectOne('https://api.web3forms.com/submit');
    req.flush({ success: false }, { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(el.textContent ?? '').toContain('Something went wrong');
    expect(instance.name).toBe('Jane Tan');
  });

  it('has an urgency section pointing time-sensitive enquiries to WhatsApp', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';
    expect(text).toContain('faster reply');
    const waLink = Array.from(el.querySelectorAll('a[href*="wa.me/6588090600"]')) as HTMLAnchorElement[];
    expect(waLink.length).toBeGreaterThan(0);
  });

  it('shows the UEN, no fabricated address, hours or "studio by appointment" line', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('202608341G');
    expect(text).not.toContain('by appointment');
  });

  it('has no mailto link (submits directly, does not open the mail app)', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it('shows no price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\bfrom\s*\$\d/i);
  });
});
