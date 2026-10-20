import { TestBed } from '@angular/core/testing';
import { FaqAccordion } from './faq-accordion';

describe('FaqAccordion', () => {
  const faqs = [
    { question: 'Question one?', answer: 'Answer one.' },
    { question: 'Question two?', answer: 'Answer two.' },
  ];

  function create(eyebrow = 'Good to Know', title = 'Frequently Asked Questions') {
    const fixture = TestBed.createComponent(FaqAccordion);
    fixture.componentRef.setInput('eyebrow', eyebrow);
    fixture.componentRef.setInput('title', title);
    fixture.componentRef.setInput('faqs', faqs);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the eyebrow, title and every FAQ as a collapsed <details> item', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.eyebrow')?.textContent?.trim()).toBe('Good to Know');
    expect(el.querySelector('h2')?.textContent?.trim()).toBe('Frequently Asked Questions');

    const items = Array.from(el.querySelectorAll('.faq__item')) as HTMLDetailsElement[];
    expect(items.length).toBe(2);
    for (const item of items) {
      expect(item.open).toBeFalse();
      expect(item.querySelector('.faq__icon')).toBeTruthy();
    }

    const questions = items.map((i) => i.querySelector('.faq__question-text')?.textContent?.trim());
    expect(questions).toEqual(['Question one?', 'Question two?']);
    const answers = items.map((i) => i.querySelector('.faq__answer')?.textContent?.trim());
    expect(answers).toEqual(['Answer one.', 'Answer two.']);
  });

  it('opens on click, like a native <details> element', () => {
    const fixture = create();
    const el = fixture.nativeElement as HTMLElement;
    const first = el.querySelector('.faq__item') as HTMLDetailsElement;
    const summary = first.querySelector('summary') as HTMLElement;

    expect(first.open).toBeFalse();
    summary.click();
    fixture.detectChanges();
    expect(first.open).toBeTrue();
  });

  it('accepts different eyebrow/title text per page', () => {
    const fixture = create('For Businesses FAQ', 'Frequently asked questions');
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.eyebrow')?.textContent?.trim()).toBe('For Businesses FAQ');
    expect(el.querySelector('h2')?.textContent?.trim()).toBe('Frequently asked questions');
  });
});
