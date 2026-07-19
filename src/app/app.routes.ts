import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', component: Home, title: 'Linknow Events Co. — Singapore Event Décor' },
  { path: 'services', component: Services, title: 'Services — Linknow Events Co.' },
  // Floral now lives under Services; keep the old /flowers link working.
  { path: 'flowers', redirectTo: 'services', pathMatch: 'full' },
  // Remaining pages (Portfolio, Testimonials, About) are added in later
  // tickets. Unknown paths fall back to the homepage for now.
  { path: '**', redirectTo: '' },
];
