import { Component, input } from '@angular/core';
import { AddOnIcon } from '../../shared/addons';

/**
 * Renders one of the "Other Services We Provide" icons by name. Extracted
 * from events-we-style.html (19 Oct 2026) so the same SVGs can be reused on
 * the per-add-on detail pages (pages/addon-detail) without duplicating the
 * markup in two templates.
 */
@Component({
  selector: 'app-addon-icon',
  templateUrl: './addon-icon.html',
})
export class AddonIcon {
  readonly icon = input.required<AddOnIcon>();
  readonly size = input(28);
}
