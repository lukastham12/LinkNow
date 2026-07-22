import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';

interface Expertise {
  name: string;
  blurb: string;
}

interface Value {
  title: string;
  blurb: string;
}

interface Step {
  step: string;
  title: string;
  blurb: string;
}

/**
 * About page (route '/about').
 *
 * Industry-standard about page: who we are, what we do (balloons, backdrops,
 * florals, parties and corporate events), our values, and how we work. Purely
 * informational — WhatsApp is the only enquiry path (no form, email, or
 * pricing), and we do not fabricate business data (no founding year, event
 * counts, or awards we cannot substantiate).
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
      blurb:
        'Organic balloon garlands, arches and feature installs in your colour story — the ' +
        'signature look behind our party and celebration setups.',
    },
    {
      name: 'Custom backdrops',
      blurb:
        'Bespoke backdrops designed and built for the occasion, from birthdays and baby ' +
        'celebrations to branded corporate stages.',
    },
    {
      name: 'Floral styling',
      blurb:
        'Fresh and styled florals — arrangements, accents and installations that finish a ' +
        'space beautifully.',
    },
    {
      name: 'Parties & celebrations',
      blurb:
        'Birthdays, baby showers, weddings and personal milestones — styled end to end so the ' +
        'day feels effortless.',
    },
    {
      name: 'Corporate & formal events',
      blurb:
        'Product launches, grand openings, dinner & dance and festive décor — polished, ' +
        'on-brand setups for companies and formal occasions.',
    },
  ];

  protected readonly values: Value[] = [
    {
      title: 'Bespoke to your event',
      blurb:
        'Every setup is designed around your theme, colours and space — never a template off ' +
        'a shelf.',
    },
    {
      title: 'Designed, built & styled',
      blurb:
        'We handle it end to end — concept, build and on-site styling — so the finished look ' +
        'matches the plan.',
    },
    {
      title: 'Retail & corporate',
      blurb:
        'From intimate personal celebrations to company events, we scale the same care to the ' +
        'occasion.',
    },
    {
      title: 'Proudly Singapore-based',
      blurb: 'A local studio serving events across Singapore, close to every venue we style.',
    },
  ];

  protected readonly steps: Step[] = [
    {
      step: '01',
      title: 'Tell us about it',
      blurb: 'Message us on WhatsApp with your date, venue, theme and any inspiration.',
    },
    {
      step: '02',
      title: 'We design',
      blurb: 'We propose a concept and colour story tailored to your event and space.',
    },
    {
      step: '03',
      title: 'We build & style',
      blurb: 'We set everything up on-site so it looks its best when your guests arrive.',
    },
  ];
}
