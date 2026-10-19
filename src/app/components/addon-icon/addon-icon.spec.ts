import { TestBed } from '@angular/core/testing';
import { AddonIcon } from './addon-icon';
import { AddOnIcon } from '../../shared/addons';

describe('AddonIcon', () => {
  const icons: AddOnIcon[] = [
    'popcorn',
    'candyfloss',
    'icecream',
    'buffet',
    'castle',
    'balloon',
    'microphone',
  ];

  it('renders exactly one svg for every known icon name', () => {
    for (const icon of icons) {
      const fixture = TestBed.createComponent(AddonIcon);
      fixture.componentRef.setInput('icon', icon);
      fixture.detectChanges();
      const svgs = (fixture.nativeElement as HTMLElement).querySelectorAll('svg');
      expect(svgs.length).toBe(1);
    }
  });

  it('defaults to a 28px icon and respects the size input', () => {
    const fixture = TestBed.createComponent(AddonIcon);
    fixture.componentRef.setInput('icon', 'popcorn');
    fixture.detectChanges();
    let svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('28');

    fixture.componentRef.setInput('size', 40);
    fixture.detectChanges();
    svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('40');
  });
});
