import { Component } from '@angular/core';
import { AddonCard } from '../../components/addon-card/addon-card';
import { ADDONS, ADDONS_WA_LINK } from '../../shared/addons';

/**
 * Party Add-Ons & Catering hub page (route '/services/add-ons') — added
 * 19 Oct 2026, owner request: "instead of having it as a sub-section,
 * create an entirely new section... Food Station then candy floss, buffet
 * etc, then entertainment like bouncy castle hosting etc. So you have an
 * entire new services page for this." The same two categories (`category`
 * on shared/addons.ts) are used here as in the "Other Services We Provide"
 * teaser on the homepage/`/services` (components/events-we-style), which
 * links out to this page — one source of truth (ADDONS) for both.
 */
@Component({
  selector: 'app-addons-overview',
  imports: [AddonCard],
  templateUrl: './addons-overview.html',
  styleUrl: './addons-overview.scss',
})
export class AddonsOverviewPage {
  protected readonly foodAddons = ADDONS.filter((a) => a.category === 'food');
  protected readonly entertainmentAddons = ADDONS.filter((a) => a.category === 'entertainment');
  protected readonly addonsWaLink = ADDONS_WA_LINK;
}
