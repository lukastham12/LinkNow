import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Flowers } from './pages/flowers/flowers';
import { Backdrops } from './pages/backdrops/backdrops';
import { Corporate } from './pages/corporate/corporate';
import { About } from './pages/about/about';
import { PageSeo } from './shared/seo';

// Per-page SEO (BRIEF.md §10) is carried on `data.seo` and applied during
// SSR/prerender by SeoService (see src/app/shared/seo.ts), which also sets the
// document title. Every title/description carries Singapore-local relevance.
export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: {
      seo: {
        title: 'Linknow Events Co. — Event & Party Décor in Singapore',
        description:
          'Singapore event décor studio crafting custom backdrops, floral styling and ' +
          'corporate event décor for birthdays, weddings and celebrations. Enquire on WhatsApp.',
        path: '/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'services',
    component: Services,
    data: {
      seo: {
        title: 'Services — Event Décor, Backdrops & Florals in Singapore | Linknow Events Co.',
        description:
          'Explore our Singapore event décor services: custom backdrops, floral services and ' +
          'corporate event styling for celebrations and formal occasions.',
        path: '/services',
      } satisfies PageSeo,
    },
  },
  // Floral Showcase is its own page, reachable via the Services dropdown and
  // the Floral Services card (not a top-level nav tab).
  {
    path: 'flowers',
    component: Flowers,
    data: {
      seo: {
        title: 'Floral Services & Arrangements in Singapore | Linknow Events Co.',
        description:
          'Browse our Singapore floral showcase — bespoke arrangements and floral styling for ' +
          'weddings, birthdays, corporate events and personal celebrations.',
        path: '/flowers',
      } satisfies PageSeo,
    },
  },
  // Custom Backdrops portfolio — reachable via the Services dropdown and the
  // Custom Backdrops service card.
  {
    path: 'backdrops',
    component: Backdrops,
    data: {
      seo: {
        title: 'Custom Event Backdrops in Singapore | Linknow Events Co.',
        description:
          'A portfolio of custom event backdrops built in Singapore for birthdays, weddings, ' +
          'corporate events and formal occasions. See our work and enquire on WhatsApp.',
        path: '/backdrops',
      } satisfies PageSeo,
    },
  },
  // Corporate Events — informational page reachable via the Services dropdown
  // and the Corporate Events service card. Registered before the wildcard.
  {
    path: 'corporate',
    component: Corporate,
    data: {
      seo: {
        title: 'Corporate Event Décor & Styling in Singapore | Linknow Events Co.',
        description:
          'Corporate event décor in Singapore — backdrops, product launches, grand openings, ' +
          'D&D and festive styling for companies and formal occasions.',
        path: '/corporate',
      } satisfies PageSeo,
    },
  },
  // About — who we are, what we do (balloons, backdrops, florals, parties and
  // corporate events). Registered before the wildcard.
  {
    path: 'about',
    component: About,
    data: {
      seo: {
        title: 'About Linknow Events Co. — Event, Balloon & Party Décor in Singapore',
        description:
          'Meet Linknow Events Co., a Singapore event décor studio specialising in balloon ' +
          'garlands, custom backdrops, floral styling and corporate event décor for parties and ' +
          'celebrations.',
        path: '/about',
      } satisfies PageSeo,
    },
  },
  // Unknown paths fall back to the homepage.
  { path: '**', redirectTo: '' },
];
