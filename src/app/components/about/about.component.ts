import { Component, inject } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <section class="about-section section section-alt" id="about">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-subtitle">
            <i class="fa-regular fa-id-card"></i>
            {{ state.t().about.subtitle }}
          </span>
          <h2>{{ state.t().about.title }}</h2>
          <div class="title-bar"></div>
        </div>

        <div class="about-grid">
          <div class="about-visual" appScrollReveal>
            <div class="about-image-card glass-card">
              <img [src]="state.profileImg" alt="Mama Fadel DIAWARA" />
              <div class="about-card-overlay">
                <span class="tag">
                  <i class="fa-solid fa-location-dot"></i>
                  {{ state.t().about.info.cityValue }}
                </span>
              </div>
            </div>
          </div>

          <div class="about-body" appScrollReveal [revealDelay]="150">
            <h3>{{ state.t().about.headline }}</h3>
            <p>{{ state.t().about.p1 }}</p>
            <p>{{ state.t().about.p2 }}</p>

            <div class="info-cards-grid">
              <div class="info-box glass-card">
                <div class="info-icon"><i class="fa-solid fa-user"></i></div>
                <div>
                  <span class="info-label">{{ state.t().about.info.nameLabel }}</span>
                  <strong class="info-value">Mama Fadel DIAWARA</strong>
                </div>
              </div>

              <div class="info-box glass-card">
                <div class="info-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                <div>
                  <span class="info-label">{{ state.t().about.info.degreeLabel }}</span>
                  <strong class="info-value">{{ state.t().about.info.degreeValue }}</strong>
                </div>
              </div>

              <div class="info-box glass-card">
                <div class="info-icon"><i class="fa-solid fa-envelope"></i></div>
                <div>
                  <span class="info-label">{{ state.t().about.info.emailLabel }}</span>
                  <a
                    class="info-value"
                    [href]="'mailto:' + state.emailAddress"
                    (click)="state.openDirectMailModal($event)"
                  >
                    {{ state.emailAddress }}
                  </a>
                </div>
              </div>

              <div class="info-box glass-card">
                <div class="info-icon"><i class="fa-solid fa-phone"></i></div>
                <div>
                  <span class="info-label">{{ state.t().about.info.phoneLabel }}</span>
                  <a class="info-value" [href]="'tel:' + state.phoneRaw">
                    {{ state.phoneDisplay }}
                  </a>
                </div>
              </div>

              <div class="info-box glass-card">
                <div class="info-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div>
                  <span class="info-label">{{ state.t().about.info.cityLabel }}</span>
                  <strong class="info-value">{{ state.t().about.info.cityValue }}</strong>
                </div>
              </div>

              <div class="info-box glass-card">
                <div class="info-icon"><i class="fa-brands fa-linkedin-in"></i></div>
                <div>
                  <span class="info-label">{{ state.t().about.info.linkedinLabel }}</span>
                  <a
                    class="info-value"
                    [href]="state.linkedinUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mama Fadel DIAWARA
                  </a>
                </div>
              </div>
            </div>

            <div class="about-cta">
              <a
                [href]="state.cvUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                <i class="fa-solid fa-download"></i>
                {{ state.t().about.downloadCvBtn }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly state = inject(PortfolioStateService);
}

