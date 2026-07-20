import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS } from '../../shared/contact';

/**
 * Shared site header: logo + primary navigation.
 *
 * Collapses to a toggled menu at phone widths. Nav items that carry `children`
 * (currently "Services") render an accessible dropdown:
 *  - Desktop: opens on hover OR keyboard focus; the label itself still
 *    navigates. Closes on mouse-leave, focus-leave, or Escape.
 *  - Mobile: the caret button toggles an inline submenu.
 * The button exposes aria-haspopup / aria-expanded and the submenu is fully
 * keyboard navigable (not hover-only).
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly navLinks = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  // Label of the nav item whose dropdown is currently open (only one at a time).
  protected readonly openDropdown = signal<string | null>(null);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    if (!this.menuOpen()) this.openDropdown.set(null);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.openDropdown.set(null);
  }

  isDropdownOpen(label: string): boolean {
    return this.openDropdown() === label;
  }

  openDropdownFor(label: string): void {
    this.openDropdown.set(label);
  }

  toggleDropdown(label: string): void {
    this.openDropdown.update((cur) => (cur === label ? null : label));
  }

  closeDropdown(): void {
    this.openDropdown.set(null);
  }

  // Close the dropdown when keyboard focus leaves the whole nav item.
  onItemFocusOut(event: FocusEvent, itemEl: HTMLElement): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !itemEl.contains(next)) {
      this.closeDropdown();
    }
  }
}
