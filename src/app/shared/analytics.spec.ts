import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { AnalyticsService } from './analytics';
import { GA_MEASUREMENT_ID } from './site';

@Component({ selector: 'app-test-stub', template: '' })
class TestStubComponent {}

describe('AnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: TestStubComponent }])],
    });
  });

  afterEach(() => {
    document.querySelectorAll('script[src*="googletagmanager"]').forEach((s) => s.remove());
    delete (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  });

  it('is configured with a real GA4 id (format G-XXXXXXXXXX)', () => {
    expect(GA_MEASUREMENT_ID).toMatch(/^G-[A-Z0-9]+$/i);
  });

  it('loads gtag and starts the dataLayer when a real GA4 id is set', () => {
    const service = TestBed.inject(AnalyticsService);
    service.init();
    const loaded = document.querySelector('script[src*="googletagmanager"]');
    expect(loaded).toBeTruthy();
    expect(loaded?.getAttribute('src')).toContain(GA_MEASUREMENT_ID);
    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    expect(Array.isArray(dataLayer)).toBeTrue();
  });

  it('fires a page_view event on route changes, not just the initial load', async () => {
    const service = TestBed.inject(AnalyticsService);
    const router = TestBed.inject(Router);
    service.init();
    const dataLayer = (window as unknown as { dataLayer: unknown[][] }).dataLayer;
    const before = dataLayer.length;
    await router.navigateByUrl('/services');
    const pageViewEvents = dataLayer
      .slice(before)
      .filter((args) => args[0] === 'event' && args[1] === 'page_view');
    expect(pageViewEvents.length).toBeGreaterThan(0);
  });
});
