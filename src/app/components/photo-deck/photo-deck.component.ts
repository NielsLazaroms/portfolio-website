import {afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, signal} from '@angular/core';
import {LucidePause, LucidePlay} from '@lucide/angular';
import {prefersReducedMotion} from '../../utils/motion';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

const INTERVAL = 4500;
const DEAL_DURATION = 900;

/**
 * A small stack of photos. Every few seconds the top photo swings out and goes
 * to the back of the pile. Clicking shows the next one; the button pauses it.
 */
@Component({
  selector: 'app-photo-deck',
  imports: [LucidePause, LucidePlay],
  templateUrl: './photo-deck.component.html',
  styleUrl: './photo-deck.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDeckComponent {
  protected readonly photos: Photo[] = [
    {src: 'assets/me-forrest.jpg', alt: 'Niels standing in a forest', caption: 'Out in the woods'},
    {src: 'assets/me-ski-image.jpg', alt: 'Niels skiing', caption: 'On the slopes'},
    {src: 'assets/me-hobby.jpg', alt: 'Niels on his mountain bike', caption: 'Mountain biking'},
    {src: 'assets/me-travel-image.jpg', alt: 'Niels in the Scottish Highlands', caption: 'The Scottish Highlands'},
  ];

  /** Photo indexes from top to bottom of the pile. */
  protected readonly order = signal(this.photos.map((_, i) => i));
  protected readonly leaving = signal<number | null>(null);
  protected readonly paused = signal(false);
  /** The photo on top, or the one coming up while the top photo swings away. */
  protected readonly top = computed(() => this.photos[this.order()[this.leaving() === null ? 0 : 1]]);

  private readonly reduce = prefersReducedMotion();
  private timer?: ReturnType<typeof setInterval>;
  private hovering = false;
  private onScreen = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    destroyRef.onDestroy(() => clearInterval(this.timer));
    afterNextRender(() => {
      if (this.reduce) {
        this.paused.set(true);
        return;
      }
      // Only deal while the deck is on screen.
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => this.onScreen = entries.some(e => e.isIntersecting));
        observer.observe(host);
        destroyRef.onDestroy(() => observer.disconnect());
      } else {
        this.onScreen = true;
      }
      this.timer = setInterval(() => {
        if (!this.paused() && !this.hovering && this.onScreen && document.visibilityState === 'visible') this.next();
      }, INTERVAL);
    });
  }

  /** Position in the pile (0 = top), used for the slight fan of the cards behind. */
  protected positionOf(index: number): number {
    return this.order().indexOf(index);
  }

  protected next(): void {
    if (this.leaving() !== null) return;
    const [first, ...rest] = this.order();
    if (this.reduce) {
      this.order.set([...rest, first]);
      return;
    }
    this.leaving.set(first);
    setTimeout(() => {
      this.order.set([...rest, first]);
      this.leaving.set(null);
    }, DEAL_DURATION);
  }

  protected togglePause(): void {
    this.paused.update(p => !p);
  }

  protected setHover(hovering: boolean): void {
    this.hovering = hovering;
  }
}
