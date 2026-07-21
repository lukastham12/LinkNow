import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';

interface Service {
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
}

interface PortfolioTile {
  image: string;
  alt: string;
}

/** Homepage (route ''). Sections: hero, services, portfolio teaser,
 *  testimonials, enquiry strip. WhatsApp is the only enquiry channel — no
 *  contact/quote links. */
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
      image: '/backdrops/backdrop-07.jpg',
      imageAlt: 'A custom pink-and-gold birthday backdrop by Linknow Events Co.',
    },
    {
      name: 'Floral Services',
      blurb: 'Fresh and styled florals — arches, installations and arrangements for any occasion.',
      image: '/flowers/hydrangea-china.jpg',
      imageAlt: 'A fresh pink hydrangea, representative of our floral services',
    },
    {
      name: 'Corporate Events',
      blurb:
        'Styling and décor for company celebrations, launches and formal occasions — polished ' +
        'setups your guests will remember.',
      image: '/backdrops/backdrop-09.jpg',
      imageAlt: 'A corporate in-store event styled by Linknow Events Co.',
    },
  ];

  // A varied teaser set of real backdrop builds; the full set lives on /backdrops.
  protected readonly portfolio: PortfolioTile[] = [
    { image: '/backdrops/backdrop-02.jpg', alt: 'Custom event backdrop by Linknow Events Co.' },
    { image: '/backdrops/backdrop-07.jpg', alt: 'Custom event backdrop by Linknow Events Co.' },
    { image: '/backdrops/backdrop-10.jpg', alt: 'Custom event backdrop by Linknow Events Co.' },
    { image: '/backdrops/backdrop-04.jpg', alt: 'Custom event backdrop by Linknow Events Co.' },
    { image: '/backdrops/backdrop-12.jpg', alt: 'Custom event backdrop by Linknow Events Co.' },
    { image: '/backdrops/backdrop-03.jpg', alt: 'Custom event backdrop by Linknow Events Co.' },
  ];
}
