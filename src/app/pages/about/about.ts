import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';

interface Expertise {
  name: string;
  blurb: string;
}

/**
 * About page (route '/about').
 *
 * Deliberately generic, simple and professional: who we are, a short story,
 * what we do, and a call to action. WhatsApp is the only enquiry path (no
 * form, email, or pricing), and we do not fabricate business data (no founding
 * year, event counts, or awards we cannot substantiate).
 */
@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly whatsappHref = WHATSAPP_HREF;

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
