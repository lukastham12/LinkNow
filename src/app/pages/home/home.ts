import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';

interface Service {
  name: string;
  blurb: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

/** Homepage (route ''). Sections: hero, services, portfolio teaser,
 *  testimonials, enquiry strip. Photography is placeholder for now. */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly whatsappHref = WHATSAPP_HREF;

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

  // TODO: replace with real client testimonials (BRIEF.md §12).
  protected readonly testimonials: Testimonial[] = [
    {
      quote: 'Placeholder testimonial — the backdrop was absolutely stunning and set up on time.',
      author: 'Client name, event type',
    },
    {
      quote: 'Placeholder testimonial — professional, responsive, and the florals were gorgeous.',
      author: 'Client name, event type',
    },
    {
      quote: 'Placeholder testimonial — made our corporate launch look world-class.',
      author: 'Company name, corporate event',
    },
  ];
}
