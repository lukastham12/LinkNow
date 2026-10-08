import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CorporateCaseStudyPage } from './corporate-case-study';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';

function configure(slug: string) {
  return TestBed.configureTestingModule({
    imports: [CorporateCaseStudyPage],
    providers: [
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { data: { slug } } },
      },
    ],
  }).compileComponents();
}

describe('CorporateCaseStudyPage', () => {
  it('should create for each known client slug', async () => {
    for (const study of CORPORATE_CASE_STUDIES) {
      await configure(study.slug);
      const fixture = TestBed.createComponent(CorporateCaseStudyPage);
      expect(fixture.componentInstance).toBeTruthy();
      TestBed.resetTestingModule();
    }
  });

  it("renders the People's Association case study with its h1, brief/build/result and a back link", async () => {
    await configure('peoples-association');
    const fixture = TestBed.createComponent(CorporateCaseStudyPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toContain("People's Association");

    const text = el.textContent ?? '';
    expect(text).toContain('The brief');
    expect(text).toContain('What we built');
    expect(text).toContain('The result');
    expect(text).toMatch(/open house/i);
    expect(text).toMatch(/ribbon/i);

    const back = el.querySelector('a.back') as HTMLAnchorElement;
    expect(back).toBeTruthy();
    expect(back.getAttribute('href')).toBe('/corporate');

    const imgs = Array.from(el.querySelectorAll('.showcase__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(2);
    expect(imgs.map((i) => i.getAttribute('src'))).toEqual([
      '/corporate/peoples-association-01.jpg',
      '/corporate/peoples-association-02.jpg',
    ]);
  });

  it('renders the AWWA case study referencing the bouncy castle', async () => {
    await configure('awwa');
    const fixture = TestBed.createComponent(CorporateCaseStudyPage);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toMatch(/children's day/i);
    expect(text).toMatch(/bouncy castle/i);
  });

  it('renders the Bucket House case study with its two photos', async () => {
    await configure('bucket-house');
    const fixture = TestBed.createComponent(CorporateCaseStudyPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.showcase__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(2);
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
    // The floral/balloon display photo now shows first, the entertainer shot second.
    expect(imgs.map((i) => i.getAttribute('src'))).toEqual([
      '/corporate/bucket-house-02.jpg',
      '/corporate/bucket-house-01.jpg',
    ]);
  });

  it('renders the Avocadoria case study with its two in-store photos', async () => {
    await configure('avocadoria');
    const fixture = TestBed.createComponent(CorporateCaseStudyPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const imgs = Array.from(el.querySelectorAll('.showcase__img')) as HTMLImageElement[];
    const srcs = imgs.map((i) => i.getAttribute('src'));
    expect(srcs).toContain('/backdrops/backdrop-08.jpg');
    expect(srcs).toContain('/backdrops/backdrop-09.jpg');
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact/form)', async () => {
    await configure('avocadoria');
    const fixture = TestBed.createComponent(CorporateCaseStudyPage);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', async () => {
    for (const study of CORPORATE_CASE_STUDIES) {
      await configure(study.slug);
      const fixture = TestBed.createComponent(CorporateCaseStudyPage);
      fixture.detectChanges();
      const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
      expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
      expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
      TestBed.resetTestingModule();
    }
  });
});
