import { TestBed } from '@angular/core/testing';
import { Testimonial } from '../../shared/testimonials';
import { ReviewsCarousel } from './reviews-carousel';

const REVIEWS: readonly Testimonial[] = [
  { quote: 'First review', rating: 5 },
  { quote: 'Second review', rating: 5 },
  { quote: 'Third review', rating: 5 },
];

describe('ReviewsCarousel', () => {
  function create(reviews: readonly Testimonial[] = REVIEWS) {
    const fixture = TestBed.createComponent(ReviewsCarousel);
    fixture.componentInstance.reviews = reviews;
    fixture.componentInstance.ngOnChanges();
    fixture.detectChanges();
    return fixture;
  }

  it('renders every review (no interaction needed to see them all)', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('First review');
    expect(el.textContent ?? '').toContain('Second review');
    expect(el.textContent ?? '').toContain('Third review');
  });

  it('duplicates the track so the scroll loops seamlessly', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.testimonial').length).toBe(REVIEWS.length * 2);
  });

  it('marks the duplicated second half as aria-hidden, not the originals', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('.testimonial'));
    const hidden = cards.filter((c) => c.getAttribute('aria-hidden') === 'true');
    const visible = cards.filter((c) => c.getAttribute('aria-hidden') !== 'true');
    expect(hidden.length).toBe(REVIEWS.length);
    expect(visible.length).toBe(REVIEWS.length);
  });

  it('runs the scroll automatically — no buttons required', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('button')).toBeNull();
    const track = el.querySelector<HTMLElement>('.marquee__track');
    expect(track?.classList.contains('marquee__track--static')).toBeFalse();
  });

  it('scales the animation duration with the number of reviews (slow, not fast)', () => {
    const shortFixture = create(REVIEWS.slice(0, 1));
    const longFixture = create([...REVIEWS, ...REVIEWS]);
    const shortTrack = (shortFixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.marquee__track',
    );
    const longTrack = (longFixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.marquee__track',
    );
    const shortDuration = parseFloat(shortTrack?.style.animationDuration ?? '0');
    const longDuration = parseFloat(longTrack?.style.animationDuration ?? '0');
    expect(longDuration).toBeGreaterThan(shortDuration);
  });

  it('disables the scrolling animation entirely for a single review', () => {
    const fixture = create([{ quote: 'Only one', rating: 5 }]);
    const el = fixture.nativeElement as HTMLElement;
    const track = el.querySelector<HTMLElement>('.marquee__track');
    expect(track?.classList.contains('marquee__track--static')).toBeTrue();
  });
});
