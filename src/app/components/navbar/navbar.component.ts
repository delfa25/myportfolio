import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { NavItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header class="navbar" [class.scrolled]="isScrolled()">
      <div class="navbar-inner container">
        <a href="#home" class="brand-logo" (click)="closeMobileMenu()">
          <span class="logo-mark">MAMA FADEL</span>&nbsp;<strong>DIAWARA</strong>
          <span class="logo-dot"></span>
        </a>

        <nav class="desktop-nav" aria-label="Primary Navigation">
          <ul>
            @for (item of navItems(); track item.id) {
              <li>
                <a
                  [href]="'#' + item.id"
                  [class.active]="state.activeSection() === item.id"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <div class="navbar-actions">
          <button
            type="button"
            class="control-btn lang-btn"
            (click)="state.toggleLang()"
            [attr.aria-label]="state.lang() === 'fr' ? 'Switch to English' : 'Passer en Français'"
            title="FR / EN"
          >
            <i class="fa-solid fa-globe"></i>
            <span>{{ state.lang().toUpperCase() }}</span>
          </button>

          <button
            type="button"
            class="control-btn theme-btn"
            (click)="state.toggleTheme()"
            [attr.aria-label]="state.theme() === 'dark' ? 'Mode clair' : 'Mode sombre'"
          >
            @if (state.theme() === 'dark') {
              <i class="fa-solid fa-sun"></i>
            } @else {
              <i class="fa-solid fa-moon"></i>
            }
          </button>

          <a href="#contact" class="btn btn-primary btn-sm nav-cta">
            <i class="fa-regular fa-paper-plane"></i>
            <span>{{ state.t().nav.contactMeBtn }}</span>
          </a>

          <button
            type="button"
            class="menu-toggle"
            [class.active]="mobileMenuOpen()"
            (click)="toggleMobileMenu()"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <div
      class="mobile-drawer-backdrop"
      [class.open]="mobileMenuOpen()"
      (click)="closeMobileMenu()"
    ></div>

    <aside class="mobile-drawer" [class.open]="mobileMenuOpen()">
      <div class="mobile-drawer-header">
        <div class="brand-logo">
          <span class="logo-mark">MAMA FADEL</span>&nbsp;<strong>DIAWARA</strong>
          <span class="logo-dot"></span>
        </div>
        <button type="button" class="drawer-close" (click)="closeMobileMenu()" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <ul class="mobile-nav-list">
        @for (item of navItems(); track item.id) {
          <li>
            <a
              [href]="'#' + item.id"
              [class.active]="state.activeSection() === item.id"
              (click)="closeMobileMenu()"
            >
              <i [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>

      <div class="mobile-drawer-footer">
        <a href="#contact" class="btn btn-primary btn-full" (click)="closeMobileMenu()">
          <i class="fa-regular fa-paper-plane"></i>
          {{ state.t().nav.contactMeBtn }}
        </a>
      </div>
    </aside>
  `,
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly state = inject(PortfolioStateService);
  readonly isScrolled = signal(false);
  readonly mobileMenuOpen = signal(false);

  readonly navItems = computed<NavItem[]>(() => {
    const nav = this.state.t().nav;
    return [
      { id: 'home', label: nav.home, icon: 'fa-solid fa-house' },
      { id: 'about', label: nav.about, icon: 'fa-solid fa-user' },
      { id: 'skills', label: nav.skills, icon: 'fa-solid fa-bolt' },
      { id: 'experience', label: nav.experience, icon: 'fa-solid fa-briefcase' },
      { id: 'education', label: nav.education, icon: 'fa-solid fa-graduation-cap' },
      { id: 'portfolio', label: nav.portfolio, icon: 'fa-solid fa-folder-open' },
      { id: 'contact', label: nav.contact, icon: 'fa-solid fa-envelope' },
    ];
  });

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 16);
    this.updateActiveSection();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  private updateActiveSection(): void {
    const sectionIds = ['home', 'about', 'skills', 'experience', 'education', 'portfolio', 'contact'];
    let current = 'home';
    const offset = 130;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          current = id;
        }
      }
    }
    this.state.activeSection.set(current);
  }
}

