import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Flowers } from './pages/flowers/flowers';
import { Backdrops } from './pages/backdrops/backdrops';
import { Corporate } from './pages/corporate/corporate';

export const routes: Routes = [
  { path: '', component: Home, title: 'Linknow Events Co. — Singapore Event Décor' },
  { path: 'services', component: Services, title: 'Services — Linknow Events Co.' },
  // Floral Showcase is its own page, reachable via the Services dropdown and
  // the Floral Services card (not a top-level nav tab).
  { path: 'flowers', component: Flowers, title: 'Floral Showcase — Linknow Events Co.' },
  // Custom Backdrops portfolio — reachable via the Services dropdown and the
  // Custom Backdrops service card.
  { path: 'backdrops', component: Backdrops, title: 'Custom Backdrops — Linknow Events Co.' },
  // Corporate Events — informational page reachable via the Services dropdown
  // and the Corporate Events service card. Registered before the wildcard.
  { path: 'corporate', component: Corporate, title: 'Corporate Events — Linknow Events Co.' },
  // Remaining pages (About) are added in later tickets. Unknown paths fall
  // back to the homepage for now.
  { path: '**', redirectTo: '' },
];
