import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  it('shows the first review initially', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('First review');
    expect(el.textContent ?? '').not.toContain('Second review');
  });

  it('advances to the next review on the next button, wrapping around', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    const next = el.querySelector<HTMLButtonElement>('.carousel__arrow--next')!;

    next.click();
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('Second review');

    next.click();
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('Third review');

    next.click();
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('First review');
  });

  it('goes to the previous review, wrapping around to the last one', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    const prev = el.querySelector<HTMLButtonElement>('.carousel__arrow--prev')!;

    prev.click();
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('Third review');
  });

  it('jumps to a review when its dot is clicked', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    const dots = el.querySelectorAll<HTMLButtonElement>('.carousel__dot');
    expect(dots.length).toBe(3);

    dots[2].click();
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('Third review');
  });

  it('auto-advances to the next review after the autoplay interval', fakeAsync(() => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent ?? '').toContain('First review');

    tick(6000);
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('Second review');

    fixture.destroy();
  }));

  it('pauses autoplay on hover and resumes on mouse leave', fakeAsync(() => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    const root = el.querySelector('.carousel')!;

    root.dispatchEvent(new Event('mouseenter'));
    tick(6000);
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('First review');

    root.dispatchEvent(new Event('mouseleave'));
    tick(6000);
    fixture.detectChanges();
    expect(el.textContent ?? '').toContain('Second review');

    fixture.destroy();
  }));

  it('does not render dots for a single review', () => {
    const fixture = create([{ quote: 'Only review', rating: 5 }]);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.carousel__dot').length).toBe(0);
  });
});
