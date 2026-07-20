import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';

interface ServiceCard {
  id: string;
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  // Present only when the card navigates somewhere. The Floral card links to the
  // /flowers showcase; Backdrops/Setup have no dedicated page yet, so they are
  // informational cards (the Services-nav dropdown scrolls to them via #id).
  link?: string;
  isPlaceholderImage: boolean;
}

/**
 * Services overview page (route '/services').
 *
 * A modern card grid (image + title + one-line blurb) for the three service
 * lines from BRIEF.md §2: Custom Backdrops, Floral Services and Setup-Only
 * Labour. The Floral card links to the /flowers showcase; the other two are
 * informational (photos TODO) and are the scroll targets for the Services
 * dropdown's #backdrops / #setup anchors. WhatsApp is the only enquiry path —
 * no forms, email, quote button, or pricing.
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
      // TODO (BRIEF.md §12): replace with a real custom-backdrop photo.
      image: '/placeholders/backdrops.svg',
      imageAlt: 'Custom Backdrops — photo coming soon (placeholder)',
      isPlaceholderImage: true,
    },
    {
      id: 'floral',
      name: 'Floral Services',
      blurb: 'Fresh, styled florals — arches, installations and arrangements for any occasion.',
      image: '/flowers/rose-ecuador.jpg',
      imageAlt: 'A single fresh rose, representative of our floral services',
      link: '/flowers',
      isPlaceholderImage: false,
    },
    {
      id: 'setup',
      name: 'Setup-Only Labour',
      blurb: 'Your materials, our hands — a skilled crew to set up your vision.',
      // TODO (BRIEF.md §12): replace with a real setup/install photo.
      image: '/placeholders/setup.svg',
      imageAlt: 'Setup-Only Labour — photo coming soon (placeholder)',
      isPlaceholderImage: true,
    },
  ];
}
