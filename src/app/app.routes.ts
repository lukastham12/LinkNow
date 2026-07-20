import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Flowers } from './pages/flowers/flowers';

export const routes: Routes = [
  { path: '', component: Home, title: 'Linknow Events Co. — Singapore Event Décor' },
  { path: 'services', component: Services, title: 'Services — Linknow Events Co.' },
  // Floral Showcase is its own page, reachable via the Services dropdown and
  // the Floral Services card (not a top-level nav tab).
  { path: 'flowers', component: Flowers, title: 'Floral Showcase — Linknow Events Co.' },
  // Remaining pages (Portfolio, Testimonials, About) are added in later
  // tickets. Unknown paths fall back to the homepage for now.
  { path: '**', redirectTo: '' },
];
