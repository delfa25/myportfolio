import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ScrollRevealDirective],
  template: `
    <section class="contact-section section" id="contact">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-subtitle">
            <i class="fa-regular fa-paper-plane"></i>
            {{ state.t().contact.subtitle }}
          </span>
          <h2>{{ state.t().contact.title }}</h2>
          <div class="title-bar"></div>
        </div>

        <div class="contact-grid">
          <div class="contact-info-panel glass-card" appScrollReveal>
            <h3>{{ state.t().contact.heading }}</h3>
            <p class="contact-lead">{{ state.t().contact.description }}</p>

            <div class="contact-channels">
              <a
                class="channel-item"
                [href]="'mailto:' + state.emailAddress"
                (click)="state.openDirectMailModal($event)"
              >
                <div class="channel-icon">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="channel-text">
                  <span class="channel-label">{{ state.t().contact.labels.email }}</span>
                  <strong>{{ state.emailAddress }}</strong>
                </div>
              </a>

              <a class="channel-item" [href]="'tel:' + state.phoneRaw">
                <div class="channel-icon">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div class="channel-text">
                  <span class="channel-label">{{ state.t().contact.labels.phone }}</span>
                  <strong>{{ state.phoneDisplay }}</strong>
                </div>
              </a>

              <a
                class="channel-item"
                [href]="state.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="channel-icon">
                  <i class="fa-brands fa-github"></i>
                </div>
                <div class="channel-text">
                  <span class="channel-label">{{ state.t().contact.labels.github }}</span>
                  <strong>github.com/delfa25</strong>
                </div>
              </a>

              <a
                class="channel-item"
                [href]="state.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="channel-icon">
                  <i class="fa-brands fa-linkedin-in"></i>
                </div>
                <div class="channel-text">
                  <span class="channel-label">{{ state.t().contact.labels.linkedin }}</span>
                  <strong>Mama Fadel DIAWARA</strong>
                </div>
              </a>

              <div class="channel-item static">
                <div class="channel-icon">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="channel-text">
                  <span class="channel-label">{{ state.t().contact.labels.location }}</span>
                  <strong>{{ state.t().contact.labels.locationValue }}</strong>
                </div>
              </div>
            </div>
          </div>

          <form
            class="contact-form glass-card"
            (ngSubmit)="onSubmit()"
            #contactForm="ngForm"
            appScrollReveal
            [revealDelay]="150"
          >
            <div class="form-row">
              <div class="form-group">
                <label for="contactName">{{ state.t().contact.form.nameLabel }}</label>
                <div class="input-wrapper">
                  <i class="fa-regular fa-user"></i>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    [ngModel]="name()"
                    (ngModelChange)="name.set($event)"
                    [placeholder]="state.t().contact.form.namePlaceholder"
                    required
                    autocomplete="name"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="contactEmail">{{ state.t().contact.form.emailLabel }}</label>
                <div class="input-wrapper">
                  <i class="fa-regular fa-envelope"></i>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    [ngModel]="email()"
                    (ngModelChange)="email.set($event)"
                    [placeholder]="state.t().contact.form.emailPlaceholder"
                    required
                    autocomplete="email"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="contactSubject">{{ state.t().contact.form.subjectLabel }}</label>
              <div class="input-wrapper">
                <i class="fa-solid fa-heading"></i>
                <input
                  type="text"
                  id="contactSubject"
                  name="subject"
                  [ngModel]="subject()"
                  (ngModelChange)="subject.set($event)"
                  [placeholder]="state.t().contact.form.subjectPlaceholder"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="contactMessage">{{ state.t().contact.form.messageLabel }}</label>
              <textarea
                id="contactMessage"
                name="message"
                rows="5"
                [ngModel]="message()"
                (ngModelChange)="message.set($event)"
                [placeholder]="state.t().contact.form.messagePlaceholder"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-full submit-btn"
              [class.success]="state.formSubmittedSuccess()"
              [disabled]="!contactForm.form.valid || state.formSubmittedSuccess()"
            >
              @if (state.formSubmittedSuccess()) {
                <i class="fa-solid fa-circle-check"></i>
                <span>{{ state.t().contact.form.successMessage }}</span>
              } @else {
                <i class="fa-solid fa-paper-plane"></i>
                <span>{{ state.t().contact.form.submitBtn }}</span>
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly state = inject(PortfolioStateService);

  readonly name = signal('');
  readonly email = signal('');
  readonly subject = signal('');
  readonly message = signal('');

  constructor() {
    effect(() => {
      if (this.state.formSubmittedSuccess()) {
        this.name.set('');
        this.email.set('');
        this.subject.set('');
        this.message.set('');
      }
    });
  }

  onSubmit(): void {
    const cleanName = this.name().trim();
    const cleanEmail = this.email().trim();
    const cleanSubject = this.subject().trim();
    const cleanMessage = this.message().trim();

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return;
    }

    const fromPrefix = this.state.t().mailModal.fromPrefix;
    const body = `${fromPrefix} : ${cleanName} (${cleanEmail})\n\n${cleanMessage}`;
    this.state.openMailModal(cleanSubject, body);
  }
}

