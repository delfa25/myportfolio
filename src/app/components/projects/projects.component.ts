import { Component, computed, inject, signal } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ProjectCategory, ProjectItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <section class="portfolio-section section section-alt" id="portfolio">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-subtitle">
            <i class="fa-solid fa-folder-open"></i>
            {{ state.t().portfolio.subtitle }}
          </span>
          <h2>{{ state.t().portfolio.title }}</h2>
          <div class="title-bar"></div>
          <p>{{ state.t().portfolio.description }}</p>
        </div>

        <div class="project-filters" appScrollReveal>
          <button
            type="button"
            class="project-filter-btn"
            [class.active]="activeFilter() === 'all'"
            (click)="setFilter('all')"
          >
            <i class="fa-solid fa-layer-group"></i>
            <span>{{ state.t().portfolio.filters.all }}</span>
          </button>
          <button
            type="button"
            class="project-filter-btn"
            [class.active]="activeFilter() === 'web'"
            (click)="setFilter('web')"
          >
            <i class="fa-solid fa-globe"></i>
            <span>{{ state.t().portfolio.filters.web }}</span>
          </button>
          <button
            type="button"
            class="project-filter-btn"
            [class.active]="activeFilter() === 'academic'"
            (click)="setFilter('academic')"
          >
            <i class="fa-solid fa-graduation-cap"></i>
            <span>{{ state.t().portfolio.filters.academic }}</span>
          </button>
        </div>

        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <article
              class="project-card glass-card"
              [class.featured]="project.featured"
              appScrollReveal
              [revealDelay]="i * 90"
            >
              <div class="project-card-top">
                <div class="project-icon-box">
                  <i [class]="project.icon"></i>
                </div>
                <span class="project-cat-badge">{{ project.categoryLabel }}</span>
              </div>

              <div class="project-card-body">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>

              <div class="project-card-footer">
                <div class="project-tags">
                  @for (tag of project.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>

                <div class="project-links">
                  @if (project.githubUrl) {
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-outline btn-sm"
                    >
                      <i class="fa-brands fa-github"></i>
                      <span>{{ state.t().portfolio.viewProject }}</span>
                    </a>
                  }

                  @if (project.liveUrl) {
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-primary btn-sm"
                    >
                      <i class="fa-solid fa-eye"></i>
                      <span>{{ state.t().portfolio.liveDemo }}</span>
                      <i class="fa-solid fa-arrow-up-right-from-square ext-icon"></i>
                    </a>
                  } @else {
                    <span class="live-soon-pill">
                      <i class="fa-regular fa-clock"></i>
                      <span>{{ state.t().portfolio.liveSoon }}</span>
                    </span>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <div class="portfolio-more" appScrollReveal>
          <a
            [href]="state.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            <i class="fa-brands fa-github"></i>
            {{ state.t().portfolio.moreOnGithub }}
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly state = inject(PortfolioStateService);
  readonly activeFilter = signal<ProjectCategory>('all');

  readonly filteredProjects = computed<ProjectItem[]>(() => {
    const items = this.state.t().portfolio.items;
    const filter = this.activeFilter();
    if (filter === 'all') {
      return items;
    }
    return items.filter((p) => p.category === filter);
  });

  setFilter(category: ProjectCategory): void {
    this.activeFilter.set(category);
  }
}
