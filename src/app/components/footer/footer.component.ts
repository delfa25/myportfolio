import { Component, inject } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="main-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <a href="#home" class="footer-logo">
              <span class="logo-mark">MAMA FADEL</span>&nbsp;<strong>DIAWARA</strong>
              <span class="logo-dot"></span>
            </a>
            <p class="footer-tagline">{{ state.t().footer.tagline }}</p>
          </div>

          <div class="footer-socials">
            <a
              [href]="state.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              [href]="state.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              [href]="'mailto:' + state.emailAddress"
              (click)="state.openDirectMailModal($event)"
              aria-label="Email"
            >
              <i class="fa-solid fa-envelope"></i>
            </a>
            <a [href]="'tel:' + state.phoneRaw" aria-label="Téléphone">
              <i class="fa-solid fa-phone"></i>
            </a>
          </div>

          <a
            href="#home"
            class="back-to-top"
            [attr.aria-label]="state.t().footer.backToTop"
            [title]="state.t().footer.backToTop"
          >
            <i class="fa-solid fa-arrow-up"></i>
          </a>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Mama Fadel DIAWARA. {{ state.t().footer.rights }}</p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly state = inject(PortfolioStateService);
  readonly currentYear = 2026;
}

