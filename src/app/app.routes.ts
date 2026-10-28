import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Flowers } from './pages/flowers/flowers';
import { Backdrops } from './pages/backdrops/backdrops';
import { Corporate } from './pages/corporate/corporate';
import { CorporateCaseStudyPage } from './pages/corporate-case-study/corporate-case-study';
import { AddonDetailPage } from './pages/addon-detail/addon-detail';
import { AddonsOverviewPage } from './pages/addons-overview/addons-overview';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
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
        title: 'Birthday, Party & Event Decoration Singapore | LinkNow Pte Ltd',
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
  // Wedding & ROM Styling is its own page, reachable via the Services
  // dropdown and the matching card (not a top-level nav tab).
  {
    path: 'flowers',
    component: Flowers,
    data: {
      seo: {
        title: 'Wedding & ROM Styling in Singapore | LinkNow Pte Ltd',
        description:
          'Full wedding and ROM styling in Singapore — florals, backdrops, balloon accents and ' +
          'table styling, all designed around your day. Enquire on WhatsApp.',
        path: '/flowers/',
      } satisfies PageSeo,
    },
  },
  // Party Decorations portfolio (renamed from "Birthdays & Celebrations" and
  // from URL /backdrops to /party-decorations-singapore, 28 Oct 2026, owner
  // request — keyword-aligned URL/H1/nav label, same pattern as the other
  // "...-singapore" SEO pages) — reachable via the Services dropdown and the
  // Party Decorations service card. The /backdrops path below redirects here
  // so any existing bookmarks/backlinks still resolve.
  {
    path: 'party-decorations-singapore',
    component: Backdrops,
    data: {
      seo: {
        title: 'Party Decorations Singapore | LinkNow Pte Ltd',
        description:
          'A portfolio of custom event backdrops built in Singapore for birthdays, weddings, ' +
          'corporate events and formal occasions. See our work and enquire on WhatsApp.',
        path: '/party-decorations-singapore/',
      } satisfies PageSeo,
    },
  },
  { path: 'backdrops', redirectTo: 'party-decorations-singapore' },
  // For Businesses (renamed from "Corporate Events" 23 Oct 2026, URL kept
  // unchanged) — informational page reachable via the Services dropdown and
  // the For Businesses service card. Registered before the wildcard.
  {
    path: 'corporate',
    component: Corporate,
    data: {
      seo: {
        title: 'Decor for Businesses in Singapore | LinkNow Pte Ltd',
        description:
          'Corporate event decor in Singapore — backdrops, product launches, grand openings, ' +
          'D&D and festive styling for companies and formal occasions.',
        path: '/corporate/',
      } satisfies PageSeo,
    },
  },
  // Corporate case-study pages — one static route per client use-case shown
  // on the /corporate grid. Registered before the wildcard.
  // (Sparkle & Co. added 23 Oct 2026.)
  {
    path: 'corporate/peoples-association',
    component: CorporateCaseStudyPage,
    data: {
      slug: 'peoples-association',
      seo: {
        title: "People's Association Open House Decor | LinkNow Pte Ltd",
        description:
          "A case study on styling People's Association's Open House — balloon pillars, " +
          'ribbon-cutting and on-site balloon art, by LinkNow',
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
          'end-to-end by LinkNow',
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
          'twisting and floral styling by LinkNow',
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
          'styled by LinkNow',
        path: '/corporate/avocadoria/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'corporate/sparkle-and-co',
    component: CorporateCaseStudyPage,
    data: {
      slug: 'sparkle-and-co',
      seo: {
        title: 'Sparkle & Co. Flea & Feast Booth Styling | LinkNow Pte Ltd',
        description:
          "A case study on Sparkle & Co.'s booth at The Twilight: Flea & Feast, Suntec Singapore " +
          '— full booth styling by LinkNow',
        path: '/corporate/sparkle-and-co/',
      } satisfies PageSeo,
    },
  },
  // Add-on detail pages — one static route per add-on LinkNow's third-party
  // vendor supplies, shown as "Other Services We Provide" on the homepage
  // and /services (owner request, 19 Oct 2026; see shared/addon-details.ts
  // for sourcing). Registered before the wildcard.
  {
    path: 'services/popcorn-station',
    component: AddonDetailPage,
    data: {
      slug: 'popcorn-station',
      seo: {
        title: 'Popcorn Station Add-On for Events | LinkNow Pte Ltd',
        description:
          'Add a fresh-popped popcorn station to your event in Singapore — flavour options, ' +
          'pricing and booking via LinkNow.',
        path: '/services/popcorn-station/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'services/candy-floss',
    component: AddonDetailPage,
    data: {
      slug: 'candy-floss',
      seo: {
        title: 'Candy Floss Add-On for Events | LinkNow Pte Ltd',
        description:
          'Add a fresh-spun candy floss station to your event in Singapore — custom colours, ' +
          'pricing and booking via LinkNow.',
        path: '/services/candy-floss/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'services/soft-serve-ice-cream',
    component: AddonDetailPage,
    data: {
      slug: 'soft-serve-ice-cream',
      seo: {
        title: 'Soft Serve Ice Cream Add-On for Events | LinkNow Pte Ltd',
        description:
          'Add a soft serve ice cream station to your event in Singapore — flavours, toppings ' +
          'bar, pricing and booking via LinkNow.',
        path: '/services/soft-serve-ice-cream/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'services/bouncy-castle',
    component: AddonDetailPage,
    data: {
      slug: 'bouncy-castle',
      seo: {
        title: 'Bouncy Castle Add-On for Events | LinkNow Pte Ltd',
        description:
          'Add a bouncy castle to your event in Singapore — delivery, setup, pricing and ' +
          'booking via LinkNow.',
        path: '/services/bouncy-castle/',
      } satisfies PageSeo,
    },
  },
  {
    path: 'services/balloon-sculpting',
    component: AddonDetailPage,
    data: {
      slug: 'balloon-sculpting',
      seo: {
        title: 'Balloon Sculpting Add-On for Events | LinkNow Pte Ltd',
        description:
          'Add a roving balloon sculpting artist to your event in Singapore — pricing and ' +
          'booking via LinkNow.',
        path: '/services/balloon-sculpting/',
      } satisfies PageSeo,
    },
  },
  // Buffet Catering — bespoke page (not the generic AddonDetailPage), since
  // this vendor's catalogue has several buffet lines/tiers rather than one
  // flat set of hourly pricing. See shared/buffet-menu.ts. Registered
  // before the wildcard.
  {
    path: 'services/buffet-catering',
    // Lazy-loaded (unlike every other route here): the buffet catalogue
    // data (shared/buffet-menu.ts) is large enough on its own to push the
    // site's initial bundle over budget if bundled eagerly with every other
    // page. Still prerendered at build time like the rest of the site —
    // RenderMode.Prerender in app.routes.server.ts applies regardless of
    // whether a route is eager or lazy.
    loadComponent: () =>
      import('./pages/buffet-catering/buffet-catering').then((m) => m.BuffetCateringPage),
    data: {
      seo: {
        title: 'Buffet Catering Add-On for Events | LinkNow Pte Ltd',
        description:
          'Add buffet catering to your event in Singapore — menus, pricing and booking via ' +
          'LinkNow.',
        path: '/services/buffet-catering/',
      } satisfies PageSeo,
    },
  },
  // Party Add-Ons & Catering hub — lists every add-on grouped into Food &
  // Drink Stations / Entertainment (owner request, 19 Oct 2026). Registered
  // before the wildcard.
  {
    path: 'services/add-ons',
    component: AddonsOverviewPage,
    data: {
      seo: {
        title: 'Party Add-Ons & Catering in Singapore | LinkNow Pte Ltd',
        description:
          'Food stations, buffet catering and entertainment add-ons for your event in Singapore ' +
          '— pricing and booking via LinkNow.',
        path: '/services/add-ons/',
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
          'Meet LinkNow, a Singapore event decor studio specialising in balloon ' +
          'garlands, custom backdrops, floral styling and corporate event decor for parties and ' +
          'celebrations.',
        path: '/about/',
      } satisfies PageSeo,
    },
  },
  // Contact — email + WhatsApp, UEN and the mini enquiry form. Registered
  // before the wildcard.
  {
    path: 'contact',
    component: Contact,
    data: {
      seo: {
        title: 'Contact LinkNow Pte Ltd — Event Decor Singapore',
        description:
          'Get in touch with LinkNow Pte Ltd (UEN 202608341G) — WhatsApp or email us about your ' +
          'event, or fill in a few quick details and we will open WhatsApp for you.',
        path: '/contact/',
      } satisfies PageSeo,
    },
  },
  // SEO landing pages — 3 standalone pages targeting organic Google/AI
  // search (owner request, 24 Oct 2026), one shared component rendering
  // from shared/seo-landing-pages.ts by slug (see SeoLandingPageComponent's
  // own doc comment). Registered before the wildcard.
  {
    path: 'birthday-decoration-singapore',
    loadComponent: () =>
      import('./pages/seo-landing/seo-landing').then((m) => m.SeoLandingPageComponent),
    data: {
      slug: 'birthday-decoration-singapore',
      seo: {
        title: 'Birthday Decoration Singapore | From S$349 | LinkNow Pte Ltd',
        description:
          'LinkNow Pte Ltd offers birthday decoration services in Singapore. Custom backdrops, ' +
          'balloon garlands and full party styling. HDB void decks, condo function rooms and ' +
          'private venues. From S$349.',
        path: '/birthday-decoration-singapore/',
      } satisfies PageSeo,
    },
  },
  // The generic 'party-decoration-singapore' (singular) SEO landing page was
  // removed 28 Oct 2026, owner request — it was keyword-cannibalizing
  // against the richer, real portfolio page at '/party-decorations-singapore'
  // (plural, the renamed /backdrops). Redirects there instead of 404ing any
  // existing bookmark/backlink/search-index entry; see server.ts for the
  // matching real HTTP 301.
  { path: 'party-decoration-singapore', redirectTo: 'party-decorations-singapore' },
  // Event Decoration Singapore — rebuilt 25 Oct 2026 (owner spec) as its own
  // bespoke page (EventDecorationSingaporePage), replacing the simpler entry
  // this slug used to render via the generic SeoLandingPageComponent (see
  // shared/seo-landing-pages.ts, which no longer carries this slug). Richer
  // structure: personal/business split, dedicated FAQ, dual WhatsApp/email
  // CTAs — see the component's own doc comment.
  {
    path: 'event-decoration-singapore',
    // Lazy-loaded, same precedent as Buffet Catering and the SEO landing
    // pages: bundling this page's component eagerly pushed the initial
    // bundle over its 500kB budget. Still prerendered at build time like
    // every other route (RenderMode.Prerender in app.routes.server.ts).
    loadComponent: () =>
      import('./pages/event-decoration-singapore/event-decoration-singapore').then(
        (m) => m.EventDecorationSingaporePage,
      ),
    data: {
      seo: {
        title: 'Event Decoration Singapore | LinkNow Pte Ltd',
        description:
          'LinkNow Pte Ltd is an event decoration company in Singapore offering custom ' +
          'backdrops, balloon installations and full party styling for birthdays, corporate ' +
          'events, store openings and private celebrations. Setup and teardown included. ' +
          'From S$349.',
        path: '/event-decoration-singapore/',
      } satisfies PageSeo,
    },
  },
  // Unknown paths fall back to the homepage.
  { path: '**', redirectTo: '' },
];
