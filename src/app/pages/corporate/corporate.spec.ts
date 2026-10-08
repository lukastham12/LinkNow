import { TestBed } from '@angular/core/testing';
import { Corporate } from './corporate';

describe('Corporate (Corporate Events page)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corporate],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Corporate).componentInstance).toBeTruthy();
  });

  it('has a single "Corporate Events" h1', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = el.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  it('describes the range of corporate occasions (incl. weddings, described only)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Weddings');
    expect(text).toContain('Corporate backdrops');
    expect(text).toContain('Product launches');
    expect(text).toContain('Grand openings');
    expect(text).toMatch(/Dinner\s*&\s*dance/i);
    expect(text).toContain('Roadshows');
    expect(text).toMatch(/festive/i);
  });

  it('shows a 4-card use-case grid (People\'s Association, AWWA, Bucket House, Avocadoria)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.case-card')) as HTMLAnchorElement[];
    expect(cards.length).toBe(4);
    const labels = Array.from(el.querySelectorAll('.case-card__label')).map((n) =>
      (n.textContent ?? '').trim(),
    );
    expect(labels.some((l) => l.includes("People's Association"))).toBeTrue();
    expect(labels.some((l) => l.includes('AWWA'))).toBeTrue();
    expect(labels.some((l) => l.includes('Bucket House'))).toBeTrue();
    expect(labels.some((l) => l.includes('Avocadoria'))).toBeTrue();
    for (const card of cards) {
      const href = card.getAttribute('href') ?? '';
      expect(href.startsWith('#')).toBeTrue();
      const img = card.querySelector('.case-card__img') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });

  it('shows a brief/build/result case study section for each of the 4 clients', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';
    expect(text).toContain("People's Association");
    expect(text).toContain('AWWA');
    expect(text).toContain('Bucket House Preschool');
    expect(text).toContain('Avocadoria');

    const sections = Array.from(el.querySelectorAll('.showcase')) as HTMLElement[];
    expect(sections.length).toBe(4);
    for (const section of sections) {
      expect(section.querySelector('.case-study__item:nth-child(1)')?.textContent).toContain(
        'The brief',
      );
      const items = section.querySelectorAll('.case-study__item');
      expect(items.length).toBe(3);
      const itemText = Array.from(items)
        .map((i) => i.textContent)
        .join(' ');
      expect(itemText).toContain('The brief');
      expect(itemText).toContain('What we built');
      expect(itemText).toContain('The result');
    }
  });

  it('shows the Avocadoria case study with its two in-store photos', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#avocadoria') as HTMLElement;
    expect(section).toBeTruthy();
    const imgs = Array.from(section.querySelectorAll('.showcase__img')) as HTMLImageElement[];
    expect(imgs.length).toBe(2);
    const srcs = imgs.map((i) => i.getAttribute('src'));
    expect(srcs).toContain('/backdrops/backdrop-08.jpg');
    expect(srcs).toContain('/backdrops/backdrop-09.jpg');
    for (const img of imgs) {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
  });

  it('shows the People\'s Association case study referencing the Open House ribbon-cutting', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#peoples-association') as HTMLElement;
    expect(section).toBeTruthy();
    const text = section.textContent ?? '';
    expect(text).toMatch(/open house/i);
    expect(text).toMatch(/ribbon/i);
    expect(text).toMatch(/balloon/i);
  });

  it('shows the AWWA case study referencing the Children\'s Day bouncy castle', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#awwa') as HTMLElement;
    expect(section).toBeTruthy();
    const text = section.textContent ?? '';
    expect(text).toMatch(/children's day/i);
    expect(text).toMatch(/bouncy castle/i);
  });

  it('shows the Bucket House case study referencing balloon twisting for Children\'s Day', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#bucket-house') as HTMLElement;
    expect(section).toBeTruthy();
    const text = section.textContent ?? '';
    expect(text).toMatch(/children's day/i);
    expect(text).toMatch(/balloon.twisting/i);
  });

  it('states scope covers any custom corporate or formal event, not just the listed types', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text.toLowerCase()).toContain('any custom corporate or formal');
  });

  it('uses the canonical generic WhatsApp link only (no email/quote/contact/form)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const waLinks = Array.from(
      el.querySelectorAll('a[href*="wa.me/6588090600"]'),
    ) as HTMLAnchorElement[];
    expect(waLinks.length).toBeGreaterThan(0);
    for (const a of waLinks) {
      expect(a.href).toContain('enquire%20about%20your%20services');
    }
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('a[href="/contact"]')).toBeNull();
    expect(el.querySelector('form, input, button[type="submit"]')).toBeNull();
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/request a quote|contact us/i);
  });

  it('shows NO price, currency or quantity language anywhere (guardrail)', () => {
    const fixture = TestBed.createComponent(Corporate);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toMatch(/\$|SGD|price|from\s*\$/i);
    expect(text).not.toMatch(/\bstems?\b|\bstalks?\b|\bqty\b|\bquantity\b/i);
  });
});
