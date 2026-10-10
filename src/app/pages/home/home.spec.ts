import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

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
    expect(h1s[0].textContent?.trim()).toBe("Event decorations for anything you're planning in Singapore");
  });

  it('hero subheadline says what we do (incl. custom requests) and why to engage us', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const sub = el.querySelector('.hero__sub');
    expect(sub?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      "Balloon decor, custom backdrops, florals and corporate styling — and if your event " +
        "isn't on the list, we'll still make it happen. Premium craftsmanship, honest " +
        'pricing and a team you can rely on.',
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

  it('"Events we style" shows exactly 3 cards — no duplicate "Our services", no "Other Services" card', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('#occasions') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.querySelector('h2')?.textContent?.trim()).toBe('Events we style');

    // Shout-out copy: lists examples but is explicit that it's not limited to them.
    expect(section.textContent ?? '').toContain('Birthdays, naming ceremonies, 100 days');
    expect(section.textContent ?? '').toContain('open to styling any celebration or custom request');

    const cards = Array.from(section.querySelectorAll('a.service--link')) as HTMLAnchorElement[];
    expect(cards.length).toBe(3);

    const names = cards.map((c) => c.querySelector('h3')?.textContent?.trim());
    expect(names).toEqual(['Birthdays & Celebrations', 'Weddings & ROM', 'Corporate Events']);
    expect(names).not.toContain('Other Services');

    const links = cards.map((c) => c.getAttribute('href'));
    expect(links).toEqual(['/backdrops', '/flowers', '/corporate']);

    for (const card of cards) {
      const img = card.querySelector('img');
      expect(img).toBeTruthy();
      expect((img?.getAttribute('alt') ?? '').length).toBeGreaterThan(0);
      expect(img?.getAttribute('loading')).toBe('lazy');
    }

    // No separate "Our services" section or old pink bundle band.
    expect(el.querySelectorAll('#services-heading').length).toBe(0);
    expect(el.querySelector('#bundle-heading')).toBeNull();
    expect(el.textContent ?? '').not.toContain('One booking, one team');
  });

  it('"Other Services We Provide" sits directly below "Events we style", with all 4 items as plain cards (not individual WhatsApp links)', () => {
    const fixture = TestBed.createComponent(Home);
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

    // Cards are informational only — no per-card WhatsApp link.
    const items = Array.from(addonsSection.querySelectorAll('.addon'));
    expect(items.length).toBe(4);
    expect(addonsSection.querySelectorAll('a.addon').length).toBe(0);
    const titles = items.map((item) => item.querySelector('h3')?.textContent?.trim());
    expect(titles).toEqual(['Food Station', 'Bouncy Castle', 'Balloon Sculpting', 'Party Hosting']);

    for (const item of items) {
      expect(item.querySelector('svg')).toBeTruthy();
    }

    // The one WhatsApp CTA for the whole section, at the bottom.
    const addonsButton = Array.from(addonsSection.querySelectorAll('a.btn--ghost')).find(
      (a) => a.textContent?.trim() === 'Ask about add-ons on WhatsApp',
    ) as HTMLAnchorElement | undefined;
    expect(addonsButton).toBeTruthy();
    expect(addonsButton?.getAttribute('href')).toContain('wa.me/6588090600');
    expect(addonsButton?.getAttribute('target')).toBe('_blank');
  });

  it('fires a whatsapp_click GA event for the hero CTA and the add-ons button, without blocking navigation', () => {
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

    const addonsButton = Array.from(el.querySelectorAll('a.btn--ghost')).find(
      (a) => a.textContent?.trim() === 'Ask about add-ons on WhatsApp',
    ) as HTMLAnchorElement;
    addonsButton.click();
    expect(spy).toHaveBeenCalledWith('addons', 'generic');
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
