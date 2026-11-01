import { Component, computed, inject, signal } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SkillCategory } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <section class="skills-section section" id="skills">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-subtitle">
            <i class="fa-solid fa-bolt"></i>
            {{ state.t().skills.subtitle }}
          </span>
          <h2>{{ state.t().skills.title }}</h2>
          <div class="title-bar"></div>
          <p>{{ state.t().skills.description }}</p>
        </div>

        <div class="skills-filter-bar" appScrollReveal>
          <button
            type="button"
            class="filter-pill"
            [class.active]="selectedCategoryId() === 'all'"
            (click)="selectCategory('all')"
          >
            <i class="fa-solid fa-border-all"></i>
            <span>{{ state.t().skills.filterAll }}</span>
          </button>
          @for (cat of state.t().skills.categories; track cat.id) {
            <button
              type="button"
              class="filter-pill"
              [class.active]="selectedCategoryId() === cat.id"
              (click)="selectCategory(cat.id)"
            >
              <i [class]="cat.icon"></i>
              <span>{{ cat.title }}</span>
            </button>
          }
        </div>

        <div class="skills-grid">
          @for (category of filteredCategories(); track category.id; let i = $index) {
            <article
              class="skill-card glass-card"
              appScrollReveal
              [revealDelay]="i * 75"
            >
              <div class="skill-card-header">
                <div class="category-icon">
                  <i [class]="category.icon"></i>
                </div>
                <div>
                  <h3>{{ category.title }}</h3>
                  <p>{{ category.description }}</p>
                </div>
              </div>

              <div class="skill-bars-list">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-item">
                    <div class="skill-meta">
                      <span class="skill-name">{{ skill.name }}</span>
                      @if (skill.badge) {
                        <span class="skill-badge">{{ skill.badge }}</span>
                      } @else if (skill.level) {
                        <span class="skill-percent">{{ skill.level }}%</span>
                      }
                    </div>
                    @if (skill.level) {
                      <div class="skill-progress-track">
                        <div
                          class="skill-progress-fill"
                          [style.width.%]="skill.level"
                        ></div>
                      </div>
                    }
                  </div>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly state = inject(PortfolioStateService);
  readonly selectedCategoryId = signal<string>('all');

  readonly filteredCategories = computed<SkillCategory[]>(() => {
    const all = this.state.t().skills.categories;
    const selected = this.selectedCategoryId();
    if (selected === 'all') {
      return all;
    }
    return all.filter((c) => c.id === selected);
  });

  selectCategory(id: string): void {
    this.selectedCategoryId.set(id);
  }
}

