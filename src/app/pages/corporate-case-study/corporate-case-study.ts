import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WHATSAPP_HREF } from '../../shared/contact';
import { CORPORATE_CASE_STUDIES, CorporateCaseStudy } from '../../shared/corporate-case-studies';

/**
 * Individual corporate case-study page (route '/corporate/:slug').
 *
 * One page per client use-case shown on the /corporate grid (People's
 * Association, AWWA, Bucket House Preschool, Avocadoria) — the grid card
 * links through to this page instead of an in-page anchor. The slug is
 * carried on route `data`, one static route per client (see app.routes.ts),
 * so every page is prerendered like the rest of the site.
 */
@Component({
  selector: 'app-corporate-case-study',
  imports: [RouterLink],
  templateUrl: './corporate-case-study.html',
  styleUrl: './corporate-case-study.scss',
})
export class CorporateCaseStudyPage {
  protected readonly whatsappHref = WHATSAPP_HREF;

  protected readonly study: CorporateCaseStudy = (() => {
    const slug = inject(ActivatedRoute).snapshot.data['slug'] as string;
    const found = CORPORATE_CASE_STUDIES.find((c) => c.slug === slug);
    if (!found) {
      throw new Error(`No corporate case study found for slug "${slug}"`);
    }
    return found;
  })();
}
