import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';

interface Service {
  name: string;
  blurb: string;
}

/** Homepage (route ''). Sections: hero, services, portfolio teaser,
 *  testimonials, enquiry strip. Photography is placeholder for now.
 *  WhatsApp is the only enquiry channel — no contact/quote links. */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly whatsappHref = WHATSAPP_HREF;

  // Real 5-star Google reviews only; empty until the owner supplies them.
  protected readonly testimonials = TESTIMONIALS;

  protected readonly services: Service[] = [
    {
      name: 'Custom Backdrops',
      blurb: 'Bespoke backdrops designed and built for birthdays, weddings and corporate events.',
    },
    {
      name: 'Floral Services',
      blurb: 'Fresh and styled florals — arches, installations and arrangements for any occasion.',
    },
    {
      name: 'Setup-Only Labour',
      blurb: 'Already have your materials? We supply the manpower and skill to bring your vision to life.',
    },
  ];

  // TODO: replace with real portfolio photos (BRIEF.md §12).
  protected readonly portfolio: number[] = [1, 2, 3, 4, 5, 6];
}
