import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AddonCard } from './addon-card';
import { ADDONS } from '../../shared/addons';

describe('AddonCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddonCard],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a routerLink when the add-on has a detailSlug', () => {
    const popcorn = ADDONS.find((a) => a.id === 'popcorn-station')!;
    const fixture = TestBed.createComponent(AddonCard);
    fixture.componentRef.setInput('addon', popcorn);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const link = el.querySelector('a.addon') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/services/popcorn-station');
    expect(el.querySelector('h3')?.textContent?.trim()).toBe('Popcorn Station');
    expect(el.querySelector('.addon__price')?.textContent?.trim()).toBe('From $220');
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders a plain card (no link) when the add-on has no detailSlug', () => {
    const partyHosting = ADDONS.find((a) => a.id === 'party-hosting')!;
    const fixture = TestBed.createComponent(AddonCard);
    fixture.componentRef.setInput('addon', partyHosting);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a.addon')).toBeNull();
    expect(el.querySelector('article.addon')).toBeTruthy();
    expect(el.querySelector('h3')?.textContent?.trim()).toBe('Party Hosting');
  });
});
