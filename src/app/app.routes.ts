import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Linknow Events Co. — Singapore Event Décor' },
  // Remaining pages (Services, Portfolio, Testimonials, About, Contact) are
  // added in later tickets. Unknown paths fall back to the homepage for now.
  { path: '**', redirectTo: '' },
];
