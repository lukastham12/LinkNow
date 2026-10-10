// Google Analytics 4 (gtag) wiring — BRIEF.md §6. Analytics is browser-only
// and stays completely inert until a real GA4 Measurement ID is set in
// GA_MEASUREMENT_ID (site.ts). Nothing loads, and no requests are made, while
// the id is empty/placeholder — so no tracking runs in dev, in prerender/SSR,
// or before the owner opts in with their real id.

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { GA_MEASUREMENT_ID } from './site';

// gtag pushes arguments onto a global dataLayer; keep the typing loose.
type GtagArgs = unknown[];

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  /** True only when we're in the browser AND a real GA4 id is configured. */
  private get enabled(): boolean {
    return isPlatformBrowser(this.platformId) && /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);
  }

  /**
   * Build a gtag()-shaped function bound to this window's dataLayer. gtag.js
   * only dispatches hits for entries shaped like a real `arguments` object
   * (what the classic `function(){ dataLayer.push(arguments); }` snippet
   * produces) — an arrow function with a rest parameter pushes a plain Array
   * instead, which gtag.js silently accepts into the dataLayer but never
   * turns into a hit. Each call below gets its own `arguments` object, so
   * this factory is safe to share across call sites without reintroducing
   * that bug.
   */
  private makeGtag(win: Window & { dataLayer?: GtagArgs[] }): (...args: GtagArgs) => void {
    win.dataLayer = win.dataLayer ?? [];
    const dataLayer = win.dataLayer;
    // Signature only exists to type call sites; real values come from
    // `arguments` at runtime (see note above).
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function gtag(..._args: GtagArgs): void {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments as unknown as GtagArgs);
    };
  }

  /**
   * Load gtag once and start reporting SPA page views. No-op unless enabled,
   * so it is safe to call unconditionally from the root component.
   */
  init(): void {
    if (!this.enabled) {
      return;
    }

    const win = this.doc.defaultView as (Window & { dataLayer?: GtagArgs[] }) | null;
    if (!win) {
      return;
    }

    // Inject the official gtag loader.
    const loader = this.doc.createElement('script');
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    this.doc.head.appendChild(loader);

    const gtag = this.makeGtag(win);
    gtag('js', new Date());
    // send_page_view: false — we emit page_view ourselves on each route change
    // so client-side navigations are counted, not just the first load.
    gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        gtag('event', 'page_view', {
          page_path: e.urlAfterRedirects,
          page_location: win.location?.href,
          page_title: this.doc.title,
        });
      });
  }

  /**
   * Fire a custom GA4 event (e.g. `whatsapp_click`). No-op if analytics isn't
   * enabled (no real GA4 id configured) or we're not in the browser — never
   * throws, never awaits anything, so callers can fire-and-forget this from a
   * click handler without delaying the action the click itself performs.
   */
  trackEvent(name: string, params: Record<string, string>): void {
    if (!this.enabled) {
      return;
    }
    const win = this.doc.defaultView as (Window & { dataLayer?: GtagArgs[] }) | null;
    if (!win) {
      return;
    }
    this.makeGtag(win)('event', name, params);
  }
}
