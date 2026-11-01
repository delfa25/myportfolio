import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <section class="hero-section" id="home">
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>

      <div class="container">
        <div class="hero-grid">
          <div class="hero-content" appScrollReveal>
            <div class="availability-pill">
              <span class="pulse-dot"></span>
              <span>{{ state.t().hero.availabilityBadge }}</span>
            </div>

            <p class="hero-greeting">{{ state.t().hero.greeting }}</p>

            <h1 class="hero-name">
              {{ state.t().hero.firstName }}
              <span class="gradient-name">{{ state.t().hero.lastName }}</span>
            </h1>

            <div class="hero-role-box">
              <i class="fa-solid fa-terminal role-icon"></i>
              <p class="hero-role">{{ state.t().hero.roles[currentRoleIndex()] }}</p>
            </div>

            <p class="hero-desc">
              {{ state.t().hero.description }}
            </p>

            <div class="hero-actions">
              <a href="#contact" class="btn btn-primary">
                <i class="fa-regular fa-paper-plane"></i>
                {{ state.t().hero.contactBtn }}
              </a>
              <a
                [href]="state.cvUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline"
              >
                <i class="fa-solid fa-download"></i>
                {{ state.t().hero.downloadCvBtn }}
              </a>
            </div>

            <div class="hero-socials">
              <a
                [href]="state.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <i class="fa-brands fa-github"></i>
              </a>
              <a
                [href]="state.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                [href]="'mailto:' + state.emailAddress"
                (click)="state.openDirectMailModal($event)"
                aria-label="Email"
                title="Email"
              >
                <i class="fa-solid fa-envelope"></i>
              </a>
              <a
                [href]="'tel:' + state.phoneRaw"
                aria-label="Téléphone"
                title="Téléphone"
              >
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>

          <div class="hero-visual" appScrollReveal [revealDelay]="150">
            <div class="visual-card-wrapper">
              <div class="glow-ring"></div>
              <div class="image-frame">
                <img
                  [src]="state.profileImg"
                  alt="Photo de profil de Mama Fadel DIAWARA"
                  loading="eager"
                />
              </div>

              <div class="floating-badge badge-top-left glass-card">
                <div class="badge-icon">
                  <i class="fa-solid fa-code"></i>
                </div>
                <div>
                  <strong>{{ state.t().hero.floatingBadge1 }}</strong>
                  <span>Angular • React • Flutter</span>
                </div>
              </div>

              <div class="floating-badge badge-bottom-right glass-card">
                <div class="badge-icon accent">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <strong>{{ state.t().hero.floatingBadge2 }}</strong>
                  <span>Systèmes, Réseaux & IA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="stats-strip glass-card" appScrollReveal [revealDelay]="250">
          @for (stat of state.t().hero.stats; track stat.label) {
            <div class="stat-item">
              <div class="stat-icon">
                <i [class]="stat.icon"></i>
              </div>
              <div class="stat-details">
                <span class="stat-number">{{ stat.value }}{{ stat.suffix }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly state = inject(PortfolioStateService);
  readonly currentRoleIndex = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const total = this.state.t().hero.roles.length;
      this.currentRoleIndex.update((idx) => (idx + 1) % total);
    }, 3400);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

