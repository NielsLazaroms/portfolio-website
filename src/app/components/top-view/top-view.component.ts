import {afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild} from '@angular/core';
import {prefersReducedMotion} from '../../utils/motion';

const EASE = 'cubic-bezier(.215, .61, .355, 1)';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './top-view.component.scss'
})
export class TopViewComponent {
  readonly words: string[] = ['Web Designer', 'Creative Developer'];
  private readonly typewriter = viewChild.required<ElementRef<HTMLElement>>('typewriter');
  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private timer?: ReturnType<typeof setTimeout>;
  private onScreen = true;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearTimeout(this.timer));
    afterNextRender(() => {
      if (prefersReducedMotion()) {
        this.typewriter().nativeElement.textContent = this.words[0];
        return;
      }
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => this.onScreen = entries.some(e => e.isIntersecting));
        observer.observe(this.typewriter().nativeElement);
        destroyRef.onDestroy(() => observer.disconnect());
      }
      this.playIntro();
      this.type(0, 0, false);
    });
  }

  /** The ring draws itself once, the glow comes up, then the name fades in. */
  private playIntro(): void {
    const ring = this.ring().nativeElement;
    const [outer, main] = Array.from(ring.querySelectorAll('circle'));
    main.animate([{strokeDashoffset: 1}, {strokeDashoffset: 0}], {duration: 1600, easing: EASE});
    outer.animate([{strokeDashoffset: -1, opacity: 0}, {strokeDashoffset: 0, opacity: .4}], {duration: 2000, delay: 200, easing: EASE, fill: 'backwards'});
    ring.querySelector('.ring__glow')?.animate([{opacity: 0, transform: 'scale(.92)'}, {opacity: 1, transform: 'none'}], {duration: 1200, delay: 700, easing: EASE, fill: 'backwards'});
    ring.querySelector('.ring__text')?.animate([{opacity: 0, transform: 'translateY(8px)'}, {opacity: 1, transform: 'none'}], {duration: 900, delay: 900, easing: EASE, fill: 'backwards'});
  }

  /** Types and erases the words. The element is hidden from screen readers; they get the static text instead. */
  private type(wordIndex: number, charIndex: number, deleting: boolean): void {
    const element = this.typewriter().nativeElement;
    const word = this.words[wordIndex];
    // Off screen: check again later instead of typing for nobody.
    if (!this.onScreen) {
      this.timer = setTimeout(() => this.type(wordIndex, charIndex, deleting), 500);
      return;
    }

    if (!deleting && charIndex < word.length) {
      element.textContent = word.slice(0, charIndex + 1);
      this.timer = setTimeout(() => this.type(wordIndex, charIndex + 1, false), 140);
    } else if (deleting && charIndex > 0) {
      element.textContent = word.slice(0, charIndex - 1);
      this.timer = setTimeout(() => this.type(wordIndex, charIndex - 1, true), 70);
    } else if (!deleting) {
      this.timer = setTimeout(() => this.type(wordIndex, charIndex, true), 1400);
    } else {
      this.timer = setTimeout(() => this.type((wordIndex + 1) % this.words.length, 0, false), 300);
    }
  }
}
