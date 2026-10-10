import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';
import { OCCASIONS } from '../../shared/occasions';
import { ADDONS } from '../../shared/addons';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(Home).componentInstance).toBeTruthy();
  });

  it('has exactly one H1, matching the Homepage redesign copy exactly (R1.1)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1s = Array.from(el.querySelectorAll('h1'));
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent?.trim()).toBe('Event decorations for every celebration in Singapore');
  });

  it('hero subheadline matches R1.2 exactly', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const sub = el.querySelector('.hero__sub');
    expect(sub?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      "Birthdays, baby showers, weddings, festive open houses and corporate events — balloons, " +
        'backdrops and party add-ons, all designed, set up and taken down by one team.',
    );
  });

  it('hero has a WhatsApp primary CTA and a "See what we do" anchor to #occasions (R1.3/R1.4)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hero = el.querySelector('.hero') as HTMLElement;
    const wa = hero.querySelector('a.btn--solid') as HTMLAnchorElement;
    expect(wa.getAttribute('href')).toContain('wa.me/6588090600');
    expect(wa.getAttribute('target')).toBe('_blank');
    const seeMore = hero.querySelector('a.btn--ghost') as HTMLAnchorElement;
    expect(seeMore.getAttribute('href')).toBe('#occasions');
    expect(seeMore.textContent?.trim()).toBe('See what we do');
  });

  it('uses the Minecraft backdrop photo as the hero cover image, unchanged (R1.5)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hero = el.querySelector('.hero__img') as HTMLImageElement;
    expect(hero).toBeTruthy();
    expect(hero.getAttribute('src')).toBe('/backdrops/hero-minecraft.jpg');
  });

  it('"Events we style" renders all 9 occasion tiles (8 + "Something else?"), each a WhatsApp link (R2)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#occasions') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.querySelector('h2')?.textContent?.trim()).toBe('Events we style');

    const tiles = Array.from(section.querySelectorAll('.occasion')) as HTMLAnchorElement[];
    expect(tiles.length).toBe(OCCASIONS.length);
    expect(tiles.length).toBe(9);

    for (const [i, tile] of tiles.entries()) {
      expect(tile.getAttribute('target')).toBe('_blank');
      expect(tile.getAttribute('rel')).toBe('noopener noreferrer');
      expect(tile.getAttribute('href')).toContain('wa.me/6588090600');
      expect(tile.querySelector('h3')?.textContent?.trim()).toBe(OCCASIONS[i].title);
    }

    // The "other" tile has no photo — falls back to a placeholder, never a broken <img>.
    const otherTile = tiles[tiles.length - 1];
    expect(otherTile.querySelector('h3')?.textContent?.trim()).toBe('Something else?');
    expect(otherTile.querySelector('img')).toBeNull();
    expect(otherTile.querySelector('.service__img')).toBeTruthy();

    // Every other tile has a real <img> with alt text — no broken images.
    for (const tile of tiles.slice(0, -1)) {
      const img = tile.querySelector('img');
      expect(img).toBeTruthy();
      expect((img?.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img?.getAttribute('loading')).toBe('lazy');
    }

    expect(section.textContent ?? '').toContain('anniversaries, proposals, graduations');
  });

  it('"Our services" shows exactly the 4 R3 cards, in order, with the right links — no ROM & Wedding Services', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('a.service--link')) as HTMLAnchorElement[];
    expect(cards.length).toBe(4);

    const names = cards.map((c) => c.querySelector('h3')?.textContent?.trim());
    expect(names).toEqual([
      'Balloon Decorations',
      'Backdrops & Party Styling',
      'Floral Styling & Bouquets',
      'Corporate & Community Events',
    ]);

    const links = cards.map((c) => c.getAttribute('href'));
    expect(links).toEqual(['/backdrops', '/backdrops', '/flowers', '/corporate']);

    expect(el.textContent ?? '').not.toContain('ROM & Wedding Services');

    const imgs = cards.map((c) => c.querySelector('img')?.getAttribute('src'));
    expect(imgs).toEqual([
      '/backdrops/backdrop-18.jpg',
      '/backdrops/backdrop-22.jpg',
      '/flowers/custom-arrangement-hero.jpg',
      '/corporate/awwa-01.jpg',
    ]);
  });

  it('"Add to your event" shows all 5 add-ons with icons and working WhatsApp links, plus the button (R4)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Add to your event');

    const items = Array.from(el.querySelectorAll('a.addon')) as HTMLAnchorElement[];
    expect(items.length).toBe(ADDONS.length);
    expect(items.length).toBe(5);

    for (const [i, item] of items.entries()) {
      expect(item.getAttribute('target')).toBe('_blank');
      expect(item.getAttribute('href')).toContain('wa.me/6588090600');
      expect(item.querySelector('svg')).toBeTruthy();
      expect(item.querySelector('h3')?.textContent?.trim()).toBe(ADDONS[i].title);
    }

    const addonsButton = Array.from(el.querySelectorAll('a.btn--ghost')).find(
      (a) => a.textContent?.trim() === 'Ask about add-ons on WhatsApp',
    ) as HTMLAnchorElement | undefined;
    expect(addonsButton).toBeTruthy();
    expect(addonsButton?.getAttribute('href')).toContain('wa.me/6588090600');
    expect(decodeURIComponent(addonsButton?.getAttribute('href') ?? '')).toContain('popcorn, candy floss, bouncy castle, balloon sculpting, party hosting');
  });

  it('shows the "One booking, one team" band after the add-ons, with its own WhatsApp button (R5)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const bundle = el.querySelector('#bundle-heading')?.closest('section');
    expect(bundle).toBeTruthy();
    expect(bundle?.textContent ?? '').toContain('One booking, one team.');
    const btn = bundle?.querySelector('a.btn--solid') as HTMLAnchorElement;
    expect(btn.textContent?.trim()).toBe('Plan my event on WhatsApp');
    expect(btn.getAttribute('href')).toContain('wa.me/6588090600');

    // Comes after the add-ons section and before "Our Clients" in document order.
    const sections = Array.from(el.querySelectorAll('section'));
    const addonsIndex = sections.findIndex((s) => s.querySelector('#addons-heading'));
    const bundleIndex = sections.indexOf(bundle as HTMLElement);
    const clientsIndex = sections.findIndex((s) => s.querySelector('#clients-heading'));
    expect(addonsIndex).toBeGreaterThanOrEqual(0);
    expect(bundleIndex).toBeGreaterThan(addonsIndex);
    expect(clientsIndex).toBeGreaterThan(bundleIndex);
  });

  it('fires a whatsapp_click GA event (section + item) when a new WhatsApp link is clicked, without blocking navigation', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const instance = fixture.componentInstance as unknown as {
      trackWhatsappClick: (section: string, item: string) => void;
    };
    const spy = spyOn(instance, 'trackWhatsappClick');
    const el = fixture.nativeElement as HTMLElement;
    const heroWa = el.querySelector('.hero a.btn--solid') as HTMLAnchorElement;
    heroWa.click();
    expect(spy).toHaveBeenCalledWith('hero', 'generic');

    const bundleWa = el
      .querySelector('#bundle-heading')
      ?.closest('section')
      ?.querySelector('a.btn--solid') as HTMLAnchorElement;
    bundleWa.click();
    expect(spy).toHaveBeenCalledWith('bundle', 'generic');

    const occasionTile = el.querySelector('.occasion') as HTMLAnchorElement;
    occasionTile.click();
    expect(spy).toHaveBeenCalledWith('occasions', OCCASIONS[0].id);

    const addonItem = el.querySelector('a.addon') as HTMLAnchorElement;
    addonItem.click();
    expect(spy).toHaveBeenCalledWith('addons', ADDONS[0].id);
  });

  it('renders real decor images in the service cards and the retail portfolio teaser', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const tiles = Array.from(el.querySelectorAll('.portfolio__img')) as HTMLImageElement[];
    expect(tiles.length).toBe(2);
    for (const img of tiles) {
      expect(img.getAttribute('src')).toMatch(/^\/backdrops\//);
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
  });

  it('splits "Recent work" vertically into Customers (left) and Corporate & organisations (right)', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Recent work');
    const groups = Array.from(el.querySelectorAll('.portfolio-group'));
    expect(groups.length).toBe(2);
    const labels = groups.map((g) => g.querySelector('h3')?.textContent?.trim());
    expect(labels).toEqual(['Customers', 'Corporate & organisations']);
  });

  it('gives each "Recent work" sub-section its own "See more" link to the full gallery', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const groups = Array.from(el.querySelectorAll('.portfolio-group'));
    const ctas = groups.map(
      (g) => g.querySelector('.section__cta a') as HTMLAnchorElement | null,
    );
    expect(ctas.every((a) => a?.textContent?.trim() === 'See more')).toBeTrue();
    expect(ctas[0]?.getAttribute('href')).toBe('/backdrops');
    expect(ctas[1]?.getAttribute('href')).toBe('/corporate');
  });

  it("shows the People's Association and Avocadoria use-case cards, styled and linked exactly like /corporate", () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.case-card')) as HTMLAnchorElement[];
    expect(cards.length).toBe(2);
    const hrefs = cards.map((c) => c.getAttribute('href'));
    expect(hrefs).toEqual(['/corporate/peoples-association', '/corporate/avocadoria']);
    const labels = Array.from(el.querySelectorAll('.case-card__label')).map((n) =>
      (n.textContent ?? '').trim(),
    );
    expect(labels.some((l) => l.includes("People's Association"))).toBeTrue();
    expect(labels.some((l) => l.includes('Avocadoria'))).toBeTrue();
    for (const card of cards) {
      const img = card.querySelector('.case-card__img') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.getAttribute('loading')).toBe('lazy');
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
    }
  });

  it('shows testimonials as "Verified Google review" and never the reviewer name', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Client Testimonials');
    const authors = Array.from(el.querySelectorAll('.testimonial__author'));
    expect(authors.length).toBeGreaterThan(0);
    for (const cap of authors) {
      expect(cap.textContent?.trim()).toBe('Verified Google review');
    }
    // The first reviewer's name must not appear anywhere on the page.
    expect(el.textContent ?? '').not.toContain('Lisha Soh');
  });

  it('shows the "Our Clients" logo row — all 4 logos, no names/descriptions shown', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('Our Clients');
    const logos = Array.from(el.querySelectorAll('.clients__logo')) as HTMLImageElement[];
    expect(logos.length).toBe(4);
    for (const logo of logos) {
      expect((logo.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(logo.getAttribute('src')).toMatch(/^\/brand\/clients\//);
    }
    // Order: People's Association, AWWA, Bucket House, Avocadoria.
    const srcs = logos.map((l) => l.getAttribute('src'));
    expect(srcs).toEqual([
      '/brand/clients/peoples-association.png',
      '/brand/clients/awwa.png',
      '/brand/clients/bucket-house.png',
      '/brand/clients/avocadoria.png',
    ]);
  });
});
