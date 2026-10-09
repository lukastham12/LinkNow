import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CaseCardPhoto {
  src: string;
  alt: string;
}

/**
 * Photo card + bottom-left name overlay, used for the corporate use-case
 * grid (/corporate) and reused as-is for the homepage corporate teaser.
 * `compact` renders the smaller square variant used on the homepage.
 */
@Component({
  selector: 'app-case-card',
  imports: [RouterLink],
  templateUrl: './case-card.html',
  styleUrl: './case-card.scss',
})
export class CaseCard {
  @Input({ required: true }) photo!: CaseCardPhoto;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) link!: string | readonly (string | number)[];
  @Input() compact = false;
}
