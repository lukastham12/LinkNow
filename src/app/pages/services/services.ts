import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';

interface ServiceCard {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  image: string;
  imageAlt: string;
  // Card target. Floral routes to its own page (/flowers); the others scroll to
  // an in-page detail block via a fragment on this route.
  path: string;
  fragment?: string;
  isPlaceholderImage: boolean;
}

/**
 * Services overview page (route '/services').
 *
 * A modern card grid (image + title + one-line blurb + "Explore" affordance)
 * for the three service lines from BRIEF.md §2: Custom Backdrops, Floral
 * Services and Setup-Only Labour. The Floral card links to the /flowers
 * showcase; the other two scroll to detail blocks below the grid. WhatsApp is
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
      blurb: 'Bespoke backdrops designed and built around your theme.',
      detail:
        'Bespoke backdrops designed and built for birthdays, weddings and corporate events — ' +
        'conceived around your theme, space and colours, then fabricated and installed by our team.',
      // TODO (BRIEF.md §12): replace with a real custom-backdrop photo.
      image: '/placeholders/backdrops.svg',
      imageAlt: 'Custom Backdrops — photo coming soon (placeholder)',
      path: '/services',
      fragment: 'backdrops',
      isPlaceholderImage: true,
    },
    {
      id: 'floral',
      name: 'Floral Services',
      blurb: 'Fresh, styled florals — arches, installations and arrangements.',
      detail:
        'Fresh and styled florals — arches, installations and arrangements for any occasion. ' +
        'Explore the full range of blooms we love to work with; every arrangement is bespoke to your event.',
      image: '/flowers/rose-ecuador.jpg',
      imageAlt: 'A single fresh rose, representative of our floral services',
      path: '/flowers',
      isPlaceholderImage: false,
    },
    {
      id: 'setup',
      name: 'Setup-Only Labour',
      blurb: 'Your materials, our hands — skilled setup crew for your vision.',
      detail:
        'Already have your materials? We supply the manpower and skill to execute your vision — ' +
        'you provide the pieces, we bring the hands and the craft to set it all up.',
      // TODO (BRIEF.md §12): replace with a real setup/install photo.
      image: '/placeholders/setup.svg',
      imageAlt: 'Setup-Only Labour — photo coming soon (placeholder)',
      path: '/services',
      fragment: 'setup',
      isPlaceholderImage: true,
    },
  ];
}
