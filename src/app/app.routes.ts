import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Flowers } from './pages/flowers/flowers';
import { Backdrops } from './pages/backdrops/backdrops';
import { Corporate } from './pages/corporate/corporate';
import { CorporateCaseStudyPage } from './pages/corporate-case-study/corporate-case-study';
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
        title: 'Event Decorations & Balloon Decor Singapore | LinkNow Events Co.',
        description:
          'Balloon decorations, backdrops and party add-ons for birthdays, baby showers, ' +
          'weddings, festive and corporate events across Singapore. Enquire on WhatsApp.',
        path: '/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'services',
    component: Services,
    data: {
      seo: {
        title: 'Event Decor Services in Singapore | LinkNow Pte Ltd',
        description:
          'Explore our Singapore event decor services: custom backdrops, floral services and ' +
          'corporate event styling for celebrations and formal occasions.',
        path: '/services/',
      } satisfies PageSeo,
    },
  },
  // Floral Services is its own page, reachable via the Services dropdown and
  // the Floral Services card (not a top-level nav tab).
  {
    path: 'flowers',
    component: Flowers,
    data: {
      seo: {
        title: 'Custom Floral Arrangements in Singapore | LinkNow Pte Ltd',
        description:
          'Bespoke floral arrangements in Singapore for any occasion — any flower, any palette, ' +
          'styled for weddings, corporate events, birthdays and celebrations.',
        path: '/flowers/',
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
        title: 'Custom Event Backdrops in Singapore | LinkNow Pte Ltd',
        description:
          'A portfolio of custom event backdrops built in Singapore for birthdays, weddings, ' +
          'corporate events and formal occasions. See our work and enquire on WhatsApp.',
        path: '/backdrops/',
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
        title: 'Corporate Event Decor in Singapore | LinkNow Pte Ltd',
        description:
          'Corporate event decor in Singapore — backdrops, product launches, grand openings, ' +
          'D&D and festive styling for companies and formal occasions.',
        path: '/corporate/',
      } satisfies PageSeo,
    },
  },
  // Corporate case-study pages — one static route per client use-case shown
  // on the /corporate grid. Registered before the wildcard.
  {
    path: 'corporate/peoples-association',
    component: CorporateCaseStudyPage,
    data: {
      slug: 'peoples-association',
      seo: {
        title: "People's Association Open House Decor | LinkNow Pte Ltd",
        description:
          "A case study on styling People's Association's Open House — balloon pillars, " +
          'ribbon-cutting and on-site balloon art, by LinkNow Events Co.',
        path: '/corporate/peoples-association/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'corporate/awwa',
    component: CorporateCaseStudyPage,
    data: {
      slug: 'awwa',
      seo: {
        title: "AWWA Children's Day Bouncy Castle | LinkNow Pte Ltd",
        description:
          "A case study on AWWA's Children's Day engagement — a themed bouncy castle delivered " +
          'end-to-end by LinkNow Events Co.',
        path: '/corporate/awwa/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'corporate/bucket-house',
    component: CorporateCaseStudyPage,
    data: {
      slug: 'bucket-house',
      seo: {
        title: "Bucket House Preschool Children's Day Styling | LinkNow Pte Ltd",
        description:
          "A case study on Bucket House Preschool's Children's Day celebration — balloon " +
          'twisting and floral styling by LinkNow Events Co.',
        path: '/corporate/bucket-house/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'corporate/avocadoria',
    component: CorporateCaseStudyPage,
    data: {
      slug: 'avocadoria',
      seo: {
        title: 'Avocadoria Easter Storefront Styling | LinkNow Pte Ltd',
        description:
          "A case study on Avocadoria's in-store Easter event — a pastel balloon installation " +
          'styled by LinkNow Events Co.',
        path: '/corporate/avocadoria/',
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
        title: 'About LinkNow Pte Ltd — Event & Party Decor in Singapore',
        description:
          'Meet LinkNow Events Co., a Singapore event decor studio specialising in balloon ' +
          'garlands, custom backdrops, floral styling and corporate event decor for parties and ' +
          'celebrations.',
        path: '/about/',
      } satisfies PageSeo,
    },
  },
  // Unknown paths fall back to the homepage.
  { path: '**', redirectTo: '' },
];
