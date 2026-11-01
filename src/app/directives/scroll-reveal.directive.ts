import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const nativeEl = this.el.nativeElement;
    this.renderer.addClass(nativeEl, 'reveal-on-scroll');

    if (this.revealDelay > 0) {
      this.renderer.setStyle(nativeEl, 'transition-delay', `${this.revealDelay}ms`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(nativeEl, 'revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(nativeEl, 'revealed');
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

