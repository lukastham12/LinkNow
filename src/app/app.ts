import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Canonical contact value from BRIEF.md — WhatsApp is the primary CTA.
  protected readonly whatsappMessage =
    "Hi LinkNow, I'd like to enquire about your services";
  protected readonly whatsappHref =
    `https://wa.me/6588090600?text=${encodeURIComponent(this.whatsappMessage)}`;
}
