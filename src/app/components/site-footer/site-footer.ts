import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ENQUIRY_EMAIL,
  INSTAGRAM_URL,
  NAV_LINKS,
  TIKTOK_URL,
  WHATSAPP_HREF,
} from '../../shared/contact';

/** Shared site footer: logo, contact, socials, region. */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly navLinks = NAV_LINKS;
  protected readonly whatsappHref = WHATSAPP_HREF;
  protected readonly enquiryEmail = ENQUIRY_EMAIL;
  protected readonly instagramUrl = INSTAGRAM_URL;
  protected readonly tiktokUrl = TIKTOK_URL;
  protected readonly year = new Date().getFullYear();
}
