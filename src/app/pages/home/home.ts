import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';
import { TESTIMONIALS } from '../../shared/testimonials';
import { CLIENTS } from '../../shared/clients';
import { CORPORATE_CASE_STUDIES } from '../../shared/corporate-case-studies';

interface Service {
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  // Present when the card navigates somewhere (e.g. Corporate Events → /corporate).
  link?: string;
  // Cut-out/product photos on white show whole (object-fit: contain); real
  // scene photos fill the tile (object-fit: cover).
  isCutout?: boolean;
}

interface PortfolioTile {
  image: string;
  alt: string;
}

interface PortfolioGroup {
  label: string;
  ctaLink: string;
  items: PortfolioTile[];
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

  // Organisations we've worked with — logo row only.
  protected readonly clients = CLIENTS;

  protected readonly services: Service[] = [
    {
      name: 'Custom Backdrops',
      blurb: 'Bespoke backdrops designed and built for birthdays, weddings and corporate events.',
      image: '/backdrops/backdrop-07.jpg',
      imageAlt: 'A custom pink-and-gold event backdrop built by LinkNow Events Co.',
      link: '/backdrops',
    },
    {
      name: 'Floral Services',
      blurb: 'Custom floral arrangements — any flower, any palette, styled for any occasion.',
      image: '/flowers/custom-arrangement-hero.jpg',
      imageAlt: 'A bespoke floral centrepiece styled along a fine-dining table by LinkNow Events Co.',
      link: '/flowers',
    },
    {
      name: 'Corporate Events',
      blurb:
        'Styling and décor for company celebrations, launches and formal occasions — polished ' +
        'setups your guests will remember.',
      image: '/backdrops/backdrop-09.jpg',
      imageAlt: 'A corporate in-store event styled by LinkNow Events Co.',
      link: '/corporate',
    },
  ];

  // Recent work, split by audience — a retail teaser (plain gallery tiles,
  // linking to the full /backdrops gallery) and a corporate teaser (the same
  // use-case cards shown on /corporate, linking straight to each client's
  // case-study page).
  protected readonly retail: PortfolioGroup = {
    label: 'Retail customers',
    ctaLink: '/backdrops',
    items: [
      {
        image: '/backdrops/backdrop-20.jpg',
        alt: "A Minecraft-themed birthday backdrop built by LinkNow Events Co. for Enzo's 8th birthday",
      },
      {
        image: '/backdrops/backdrop-02.jpg',
        alt: "A balloon-garland celebration setup styled by LinkNow Events Co. for Daxton's 100 Days",
      },
    ],
  };

  // Same client case studies shown on /corporate — People's Association and
  // Avocadoria — reused here so the card style and link target match exactly.
  protected readonly corporateCases = CORPORATE_CASE_STUDIES.filter(
    (c) => c.slug === 'peoples-association' || c.slug === 'avocadoria',
  );
}
