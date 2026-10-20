import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddonIcon } from '../addon-icon/addon-icon';
import { AddOn } from '../../shared/addons';

/**
 * One "Other Services We Provide" card — extracted from events-we-style.html
 * (19 Oct 2026) so the same markup renders both there (the homepage/
 * /services teaser) and on the new /services/add-ons hub page
 * (pages/addons-overview) without duplicating it a third time. Renders as a
 * routerLink when the add-on has its own detail page (`detailSlug`),
 * otherwise as a plain card.
 */
@Component({
  selector: 'app-addon-card',
  imports: [RouterLink, AddonIcon, NgTemplateOutlet],
  templateUrl: './addon-card.html',
  styleUrl: './addon-card.scss',
})
export class AddonCard {
  readonly addon = input.required<AddOn>();
}
