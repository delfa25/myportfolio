import { Component, inject } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience-education',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <!-- ========== EXPÉRIENCE PROFESSIONNELLE ========== -->
    <section class="experience-section section section-alt" id="experience">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-subtitle">
            <i class="fa-solid fa-briefcase"></i>
            {{ state.t().experience.subtitle }}
          </span>
          <h2>{{ state.t().experience.title }}</h2>
          <div class="title-bar"></div>
          <p>{{ state.t().experience.description }}</p>
        </div>

        <div class="timeline-wrapper">
          @for (item of state.t().experience.items; track item.date; let i = $index) {
            <div class="timeline-entry" appScrollReveal [revealDelay]="i * 120">
              <div class="timeline-node">
                <i class="fa-solid fa-code-branch"></i>
              </div>
              <div class="timeline-card glass-card">
                <div class="timeline-top">
                  <div>
                    @if (item.badge) {
                      <span class="entry-badge">{{ item.badge }}</span>
                    }
                    <h3>{{ item.title }}</h3>
                    <div class="organization-row">
                      <span class="org-name">
                        <i class="fa-regular fa-building"></i>
                        {{ item.organization }}
                      </span>
                      @if (item.location) {
                        <span class="org-loc">
                          <i class="fa-solid fa-location-dot"></i>
                          {{ item.location }}
                        </span>
                      }
                    </div>
                  </div>
                  <span class="date-pill">
                    <i class="fa-regular fa-calendar"></i>
                    {{ item.date }}
                  </span>
                </div>

                @if (item.tasks && item.tasks.length) {
                  <ul class="task-list">
                    @for (task of item.tasks; track task) {
                      <li>
                        <i class="fa-solid fa-check-circle"></i>
                        <span>{{ task }}</span>
                      </li>
                    }
                  </ul>
                }

                @if (item.tags && item.tags.length) {
                  <div class="entry-tags">
                    @for (tag of item.tags; track tag) {
                      <span class="tag">{{ tag }}</span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ========== FORMATION ACADÉMIQUE ========== -->
    <section class="education-section section" id="education">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-subtitle">
            <i class="fa-solid fa-graduation-cap"></i>
            {{ state.t().education.subtitle }}
          </span>
          <h2>{{ state.t().education.title }}</h2>
          <div class="title-bar"></div>
          <p>{{ state.t().education.description }}</p>
        </div>

        <div class="timeline-wrapper">
          @for (edu of state.t().education.items; track edu.title; let i = $index) {
            <div class="timeline-entry" appScrollReveal [revealDelay]="i * 100">
              <div class="timeline-node">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
              <div class="timeline-card glass-card">
                <div class="timeline-top">
                  <div>
                    @if (edu.badge) {
                      <span class="entry-badge">{{ edu.badge }}</span>
                    }
                    <h3>{{ edu.title }}</h3>
                    <div class="organization-row">
                      <span class="org-name">
                        <i class="fa-solid fa-building-columns"></i>
                        {{ edu.organization }}
                      </span>
                    </div>
                  </div>
                  <span class="date-pill">
                    <i class="fa-regular fa-calendar"></i>
                    {{ edu.date }}
                  </span>
                </div>

                @if (edu.description) {
                  <p class="edu-desc">{{ edu.description }}</p>
                }

                @if (edu.tags && edu.tags.length) {
                  <div class="entry-tags">
                    @for (tag of edu.tags; track tag) {
                      <span class="tag">{{ tag }}</span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './experience-education.component.scss',
})
export class ExperienceEducationComponent {
  readonly state = inject(PortfolioStateService);
}

