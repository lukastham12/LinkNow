import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { Testimonial } from '../../shared/testimonials';

/** How long each review stays on screen before auto-advancing. */
const AUTOPLAY_MS = 6000;

/**
 * Auto-advancing testimonial carousel (BRIEF.md §6 — Google reviews section).
 * Shows one review at a time, looping; pauses on hover/focus and is inert
 * (first slide only, no timer) when the visitor prefers reduced motion.
 * Browser-only autoplay — SSR/prerender renders the first slide statically.
 */
@Component({
  selector: 'app-reviews-carousel',
  imports: [],
  templateUrl: './reviews-carousel.html',
  styleUrl: './reviews-carousel.scss',
})
export class ReviewsCarousel implements OnChanges, OnDestroy {
  @Input({ required: true }) reviews!: readonly Testimonial[];

  private readonly platformId = inject(PLATFORM_ID);
  private timer: ReturnType<typeof setInterval> | undefined;

  protected activeIndex = 0;

  ngOnChanges(): void {
    this.activeIndex = 0;
    this.restartAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  protected goTo(index: number): void {
    this.activeIndex = index;
    this.restartAutoplay();
  }

  protected next(): void {
    this.goTo((this.activeIndex + 1) % this.reviews.length);
  }

  protected previous(): void {
    this.goTo((this.activeIndex - 1 + this.reviews.length) % this.reviews.length);
  }

  protected pauseAutoplay(): void {
    this.stopAutoplay();
  }

  protected resumeAutoplay(): void {
    this.restartAutoplay();
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    if (!isPlatformBrowser(this.platformId) || this.reviews.length <= 1) {
      return;
    }
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.timer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
    }, AUTOPLAY_MS);
  }

  private stopAutoplay(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
