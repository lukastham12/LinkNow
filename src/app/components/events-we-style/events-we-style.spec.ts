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
    expect(names).toEqual(['Birthdays & Celebrations', 'Weddings & ROM', 'For Businesses']);

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

  it('"Other Services We Provide" sits directly below, grouped into Food & Drink Stations / Entertainment', () => {
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

    const groupTitles = Array.from(addonsSection.querySelectorAll('.addons__group-title')).map(
      (h) => h.textContent?.trim(),
    );
    expect(groupTitles).toEqual(['Food & Drink Stations', 'Entertainment']);

    const items = Array.from(addonsSection.querySelectorAll('.addon'));
    expect(items.length).toBe(7);
    // 6 items have their own detail page (Popcorn Station, Candy Floss, Soft
    // Serve Ice Cream, Buffet Catering, Bouncy Castle, Balloon Sculpting);
    // Party Hosting stays a plain card (no detail page).
    const links = Array.from(addonsSection.querySelectorAll('a.addon')) as HTMLAnchorElement[];
    expect(links.length).toBe(6);
    const titles = items.map((item) => item.querySelector('h3')?.textContent?.trim());
    expect(titles).toEqual([
      'Popcorn Station',
      'Candy Floss',
      'Soft Serve Ice Cream',
      'Buffet Catering',
      'Bouncy Castle',
      'Balloon Sculpting',
      'Party Hosting',
    ]);

    const linkHrefs = links.map((a) => a.getAttribute('href'));
    expect(linkHrefs).toEqual([
      '/services/popcorn-station',
      '/services/candy-floss',
      '/services/soft-serve-ice-cream',
      '/services/buffet-catering',
      '/services/bouncy-castle',
      '/services/balloon-sculpting',
    ]);

    for (const item of items) {
      expect(item.querySelector('svg')).toBeTruthy();
    }

    const prices = items.map((item) => item.querySelector('.addon__price')?.textContent?.trim());
    expect(prices).toEqual([
      'From $220',
      'From $220',
      'From $420',
      'From $18.90 / pax',
      'From $95',
      'From $120',
      'From $90 / hour',
    ]);

    const seeAllLink = addonsSection.querySelector('a.btn--solid') as HTMLAnchorElement;
    expect(seeAllLink.textContent?.trim()).toBe('See all add-ons & full pricing');
    expect(seeAllLink.getAttribute('href')).toBe('/services/add-ons');

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
