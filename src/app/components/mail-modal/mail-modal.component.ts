import { Component, HostListener, inject } from '@angular/core';
import { PortfolioStateService } from '../../services/portfolio-state.service';
import { MailProvider } from '../../models/portfolio.model';

@Component({
  selector: 'app-mail-modal',
  standalone: true,
  template: `
    <div
      class="mail-modal-overlay"
      [class.open]="state.mailModal().isOpen"
      (click)="onBackdropClick($event)"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mailModalTitle"
    >
      <div class="mail-modal glass-card">
        <button
          type="button"
          class="mail-modal-close"
          (click)="state.closeMailModal()"
          aria-label="Fermer"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="mail-modal-icon">
          <i class="fa-solid fa-envelope-open-text"></i>
        </div>

        <h3 id="mailModalTitle">{{ state.t().mailModal.title }}</h3>
        <p>{{ state.t().mailModal.description }}</p>

        <div class="mail-options">
          @for (provider of state.mailProviders(); track provider.name) {
            <a
              [href]="provider.url"
              [target]="provider.iconFA ? '_self' : '_blank'"
              rel="noopener noreferrer"
              class="mail-option-btn"
              [style.--provider-color]="provider.color"
              (click)="onProviderSelect(provider)"
            >
              @if (provider.iconFA) {
                <i [class]="provider.iconFA" [style.color]="provider.color"></i>
              } @else if (provider.icon) {
                <img [src]="provider.icon" [alt]="provider.name" />
              }
              <span>{{ provider.name }}</span>
            </a>
          }
        </div>

        <button
          type="button"
          class="btn btn-outline btn-sm mail-modal-cancel"
          (click)="state.closeMailModal()"
        >
          {{ state.t().mailModal.cancel }}
        </button>
      </div>
    </div>
  `,
  styleUrl: './mail-modal.component.scss',
})
export class MailModalComponent {
  readonly state = inject(PortfolioStateService);

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.state.mailModal().isOpen) {
      this.state.closeMailModal();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('mail-modal-overlay')) {
      this.state.closeMailModal();
    }
  }

  onProviderSelect(_provider: MailProvider): void {
    this.state.closeMailModal();
    this.state.triggerConfirmation();
  }
}

