import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './components/site-header/site-header';
import { SiteFooter } from './components/site-footer/site-footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';

/** Root shell: shared header + routed page + footer + floating WhatsApp CTA. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, WhatsappButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
