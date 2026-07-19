import { Component } from '@angular/core';
import { FloralShowcase } from '../../components/floral-showcase/floral-showcase';
import { WHATSAPP_HREF } from '../../shared/contact';

interface ServiceOffering {
  id: string;
  name: string;
  blurb: string;
}

/**
 * Services page (route '/services').
 *
 * Explains the three service lines from BRIEF.md §2: Custom Backdrops, Floral
 * Services (which embeds the reusable floral showcase gallery), and Setup-Only
 * Labour. WhatsApp is the only enquiry path — no forms, email, or quote button.
 */
@Component({
  selector: 'app-services',
  imports: [FloralShowcase],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly whatsappHref = WHATSAPP_HREF;

  protected readonly offerings: ServiceOffering[] = [
    {
      id: 'custom-backdrops',
      name: 'Custom Backdrops',
      blurb:
        'Bespoke backdrops designed and built for birthdays, weddings and corporate events — ' +
        'conceived around your theme, space and colours, then fabricated and installed by our team.',
    },
    {
      id: 'floral-services',
      name: 'Floral Services',
      blurb:
        'Fresh and styled florals — arches, installations and arrangements for any occasion. ' +
        'Browse the blooms we love to work with below; every arrangement is bespoke to your event.',
    },
    {
      id: 'setup-only-labour',
      name: 'Setup-Only Labour',
      blurb:
        'Already have your materials? We supply the manpower and skill to execute your vision — ' +
        'you provide the pieces, we bring the hands and the craft to set it all up.',
    },
  ];
}
