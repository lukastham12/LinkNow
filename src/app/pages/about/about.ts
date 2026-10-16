import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pageWhatsappLink } from '../../shared/contact';

interface Expertise {
  name: string;
  blurb: string;
}

/**
 * About page (route '/about').
 *
 * Who we are, a short story, what we do, and a call to action. Names Novi
 * Tham as the person running LinkNow (UX review, 16 Oct 2026 — reviews on
 * the site already name her directly as the one doing the work, so this is
 * surfacing existing public info, not inventing a bio); no founding year,
 * event counts, awards, or photo — none of that is verified, so none of it
 * is claimed. A real photo of Novi should replace this text-only mention
 * once the owner supplies one.
 */
@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly whatsappHref = pageWhatsappLink('About');

  protected readonly expertise: Expertise[] = [
    {
      name: 'Balloon garlands & installations',
      blurb: 'Organic balloon garlands, arches and feature installs in your colour story.',
    },
    {
      name: 'Custom backdrops',
      blurb: 'Bespoke backdrops designed and built for the occasion.',
    },
    {
      name: 'Floral styling',
      blurb: 'Fresh and styled florals — arrangements, accents and installations.',
    },
    {
      name: 'Full event styling',
      blurb: 'Complete setups for birthdays, weddings, parties and corporate events.',
    },
  ];
}
