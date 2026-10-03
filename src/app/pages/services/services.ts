import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';

interface ServiceCard {
  id: string;
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  // Present only when the card navigates somewhere. Custom Backdrops links to
  // the /backdrops portfolio, Floral to the /flowers showcase and Corporate
  // Events to the /corporate page.
  link?: string;
  isPlaceholderImage: boolean;
  // Floral cut-outs sit on white and must show whole (object-fit: contain);
  // real backdrop scene photos fill the tile (object-fit: cover).
  isCutout: boolean;
}

/**
 * Services overview page (route '/services').
 *
 * A modern card grid (image + title + one-line blurb) for the three service
 * lines from BRIEF.md §2: Custom Backdrops, Floral Services and Corporate
 * Events. Custom Backdrops links to the /backdrops portfolio, Floral to the
 * /flowers showcase and Corporate Events to the /corporate page. WhatsApp is
 * the only enquiry path — no forms, email, quote button, or pricing.
 */
@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly whatsappHref = WHATSAPP_HREF;

  protected readonly cards: ServiceCard[] = [
    {
      id: 'backdrops',
      name: 'Custom Backdrops',
      blurb: 'Bespoke backdrops designed and built for birthdays, weddings and corporate events.',
      image: '/backdrops/backdrop-07.jpg',
      imageAlt: 'A custom pink-and-gold birthday backdrop by LinkNow Events Co.',
      link: '/backdrops',
      isPlaceholderImage: false,
      isCutout: false,
    },
    {
      id: 'floral',
      name: 'Floral Services',
      blurb: 'Custom floral arrangements — any flower, any palette, styled for any occasion.',
      image: '/flowers/custom-arrangement-hero.jpg',
      imageAlt: 'A bespoke floral centrepiece styled along a fine-dining table by LinkNow Events Co.',
      link: '/flowers',
      isPlaceholderImage: false,
      isCutout: false,
    },
    {
      id: 'corporate',
      name: 'Corporate Events',
      blurb:
        'Styling and décor for company celebrations, launches and formal occasions — polished ' +
        'setups your guests will remember.',
      image: '/backdrops/backdrop-09.jpg',
      imageAlt: 'A corporate in-store event styled by LinkNow Events Co.',
      link: '/corporate',
      isPlaceholderImage: false,
      isCutout: false,
    },
  ];
}
