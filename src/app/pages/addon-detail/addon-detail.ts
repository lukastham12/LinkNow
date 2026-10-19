import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddonIcon } from '../../components/addon-icon/addon-icon';
import { ADDON_DETAILS, AddOnDetail } from '../../shared/addon-details';
import { ADDONS, AddOnIcon as AddOnIconName } from '../../shared/addons';
import { EMAIL_ADDRESS, whatsappLink } from '../../shared/contact';

/**
 * Individual add-on detail page (route '/services/:slug') — added 19 Oct
 * 2026. One page per add-on LinkNow's third-party vendor supplies (Popcorn
 * Station, Candy Floss, Soft Serve Ice Cream, Bouncy Castle, Balloon
 * Sculpting — see shared/addon-details.ts for sourcing). The slug is carried
 * on route `data` (see app.routes.ts), one static route per add-on, so every
 * page is prerendered like the rest of the site. Mirrors the
 * corporate-case-study page's pattern (ActivatedRoute snapshot data -> find
 * in a shared array) with a pricing table in place of a photo grid — no
 * real on-site photos of these add-ons exist yet.
 */
@Component({
  selector: 'app-addon-detail',
  imports: [RouterLink, AddonIcon],
  templateUrl: './addon-detail.html',
  styleUrl: './addon-detail.scss',
})
export class AddonDetailPage {
  protected readonly emailAddress = EMAIL_ADDRESS;

  protected readonly addon: AddOnDetail = (() => {
    const slug = inject(ActivatedRoute).snapshot.data['slug'] as string;
    const found = ADDON_DETAILS.find((a) => a.slug === slug);
    if (!found) {
      throw new Error(`No add-on detail found for slug "${slug}"`);
    }
    return found;
  })();

  protected readonly icon: AddOnIconName = (() => {
    const match = ADDONS.find((a) => a.detailSlug === this.addon.slug);
    return match?.icon ?? 'popcorn';
  })();

  protected readonly whatsappHref = whatsappLink(
    `Hi LinkNow, I saw your ${this.addon.title} page and I'd like to enquire about an event.\n` +
      'Event: \nDate: \nVenue: \nGuests: ',
  );
}
