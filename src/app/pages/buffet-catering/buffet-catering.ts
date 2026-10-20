import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddonIcon } from '../../components/addon-icon/addon-icon';
import { BUFFET_LINES, EXTRA_CHARGES } from '../../shared/buffet-menu';
import { EMAIL_ADDRESS, whatsappLink } from '../../shared/contact';

/**
 * Buffet Catering detail page (route '/services/buffet-catering') — added
 * 19 Oct 2026. Bespoke rather than the generic AddonDetailPage/
 * shared/addon-details.ts pattern used by the other 5 add-ons, because this
 * vendor's catalogue has a genuinely different shape: several buffet
 * *lines* (Classic, Healthier Menu, Build-Your-Own, two Mini Buffet lines,
 * a Lite Breakfast), each with its own tiers and per-tier menus, instead of
 * one flat set of hourly pricing tiers. See shared/buffet-menu.ts for the
 * full sourcing note (second, separate vendor from the other 5 add-ons).
 */
@Component({
  selector: 'app-buffet-catering',
  imports: [RouterLink, AddonIcon],
  templateUrl: './buffet-catering.html',
  styleUrl: './buffet-catering.scss',
})
export class BuffetCateringPage {
  protected readonly emailAddress = EMAIL_ADDRESS;
  protected readonly lines = BUFFET_LINES;
  protected readonly extraCharges = EXTRA_CHARGES;

  protected readonly whatsappHref = whatsappLink(
    "Hi LinkNow, I saw your Buffet Catering page and I'd like to enquire about an event.\n" +
      'Event: \nDate: \nGuests: \nBuffet line & tier: ',
  );
}
