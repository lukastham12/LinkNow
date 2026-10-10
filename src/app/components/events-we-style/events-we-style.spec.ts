import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventsWeStyle } from './events-we-style';

describe('EventsWeStyle', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsWeStyle],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(EventsWeStyle).componentInstance).toBeTruthy();
  });

  it('"Events we style" shows exactly 3 cards linking to the right pages', () => {
    const fixture = TestBed.createComponent(EventsWeStyle);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#occasions') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.querySelector('h2')?.textContent?.trim()).toBe('Events we style');

    const cards = Array.from(section.querySelectorAll('a.service--link')) as HTMLAnchorElement[];
    expect(cards.length).toBe(3);

    const names = cards.map((c) => c.querySelector('h3')?.textContent?.trim());
    expect(names).toEqual(['Birthdays & Celebrations', 'Weddings & ROM', 'Corporate Events']);

    const links = cards.map((c) => c.getAttribute('href'));
    expect(links).toEqual(['/backdrops', '/flowers', '/corporate']);

    const birthdayImg = cards[0].querySelector('img');
    expect(birthdayImg?.getAttribute('src')).toBe('/backdrops/backdrop-25.jpg');

    for (const card of cards) {
      const img = card.querySelector('img');
      expect(img).toBeTruthy();
      expect((img?.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img?.getAttribute('loading')).toBe('lazy');
    }
  });

  it('"Other Services We Provide" sits directly below, with all 4 items as plain cards (not individual WhatsApp links)', () => {
    const fixture = TestBed.createComponent(EventsWeStyle);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const sections = Array.from(el.querySelectorAll('section'));
    const occasionsIndex = sections.findIndex((s) => s.id === 'occasions');
    const addonsIndex = sections.findIndex((s) => s.querySelector('#addons-heading'));
    expect(occasionsIndex).toBeGreaterThanOrEqual(0);
    expect(addonsIndex).toBe(occasionsIndex + 1);

    const addonsSection = sections[addonsIndex];
    expect(addonsSection.querySelector('h2')?.textContent?.trim()).toBe(
      'Other Services We Provide',
    );

    const items = Array.from(addonsSection.querySelectorAll('.addon'));
    expect(items.length).toBe(4);
    expect(addonsSection.querySelectorAll('a.addon').length).toBe(0);
    const titles = items.map((item) => item.querySelector('h3')?.textContent?.trim());
    expect(titles).toEqual(['Food Station', 'Bouncy Castle', 'Balloon Sculpting', 'Party Hosting']);

    for (const item of items) {
      expect(item.querySelector('svg')).toBeTruthy();
    }

    const addonsButton = Array.from(addonsSection.querySelectorAll('a.btn--ghost')).find(
      (a) => a.textContent?.trim() === 'Ask about these services on WhatsApp',
    ) as HTMLAnchorElement | undefined;
    expect(addonsButton).toBeTruthy();
    expect(addonsButton?.getAttribute('href')).toContain('wa.me/6588090600');
    expect(addonsButton?.getAttribute('target')).toBe('_blank');
  });

  it('fires a whatsapp_click GA event for the add-ons button, without blocking navigation', () => {
    const fixture = TestBed.createComponent(EventsWeStyle);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as {
      trackWhatsappClick: (section: string, item: string) => void;
    };
    const spy = spyOn(instance, 'trackWhatsappClick');
    const el = fixture.nativeElement as HTMLElement;
    const addonsButton = Array.from(el.querySelectorAll('a.btn--ghost')).find(
      (a) => a.textContent?.trim() === 'Ask about these services on WhatsApp',
    ) as HTMLAnchorElement;
    addonsButton.click();
    expect(spy).toHaveBeenCalledWith('addons', 'generic');
  });
});
