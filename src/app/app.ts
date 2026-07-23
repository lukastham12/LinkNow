import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './components/site-header/site-header';
import { SiteFooter } from './components/site-footer/site-footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';
import { SeoService } from './shared/seo';
import { AnalyticsService } from './shared/analytics';

/** Root shell: shared header + routed page + footer + floating WhatsApp CTA. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, WhatsappButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);

  ngOnInit(): void {
    // Runs during SSR/prerender so per-page meta + JSON-LD land in the static
    // HTML (BRIEF.md §10/§11).
    this.seo.injectStructuredData();
    this.seo.init();
    // Browser-only; inert until a real GA4 id is set in site.ts (BRIEF.md §6).
    this.analytics.init();
  }
}
