import { Component, Input, OnChanges } from '@angular/core';
import { Testimonial } from '../../shared/testimonials';

/** Seconds of scroll time per card — lower is faster. Tuned to feel slow/ambient. */
const SECONDS_PER_CARD = 9;

/**
 * Continuously-scrolling testimonial marquee (BRIEF.md §6 — Google reviews
 * section). Shows several reviews at once (4 on desktop, fewer on narrower
 * screens — see reviews-carousel.scss) and drifts sideways on its own, no
 * interaction required. Pure CSS animation: runs identically with or without
 * JS, pauses on hover/focus, and is disabled for prefers-reduced-motion —
 * all in the stylesheet, so there is nothing to do during SSR/prerender.
 */
@Component({
  selector: 'app-reviews-carousel',
  imports: [],
  templateUrl: './reviews-carousel.html',
  styleUrl: './reviews-carousel.scss',
})
export class ReviewsCarousel implements OnChanges {
  @Input({ required: true }) reviews!: readonly Testimonial[];

  /** The track renders two back-to-back copies so the loop is seamless. */
  protected loopedReviews: Testimonial[] = [];
  /** How long one full loop (one copy's worth of scrolling) takes. */
  protected animationSeconds = 0;

  ngOnChanges(): void {
    this.loopedReviews = [...this.reviews, ...this.reviews];
    this.animationSeconds = this.reviews.length * SECONDS_PER_CARD;
  }
}
