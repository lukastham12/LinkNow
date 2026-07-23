import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AnalyticsService } from './analytics';
import { GA_MEASUREMENT_ID } from './site';

describe('AnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  afterEach(() => {
    document.querySelectorAll('script[src*="googletagmanager"]').forEach((s) => s.remove());
  });

  it('ships with no GA4 id configured (analytics opt-in via one constant)', () => {
    // The repo default must be empty so nothing tracks until the owner sets it.
    expect(GA_MEASUREMENT_ID).toBe('');
  });

  it('does not load gtag or track when no GA4 id is set', () => {
    const service = TestBed.inject(AnalyticsService);
    service.init();
    const loaded = document.querySelector('script[src*="googletagmanager"]');
    expect(loaded).toBeNull();
    expect((window as unknown as { dataLayer?: unknown[] }).dataLayer).toBeUndefined();
  });
});
