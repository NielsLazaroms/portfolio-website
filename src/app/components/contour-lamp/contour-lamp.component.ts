import {afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input} from '@angular/core';
import {buildContourPaths, HERO_PEAKS, Peak} from '../../utils/contour-map';
import {prefersReducedMotion} from '../../utils/motion';

/**
 * A faint height map that lights up in green around the pointer.
 * Place it inside a section with `position: relative`; it listens to pointer
 * movement on that parent section and sits behind the section's content.
 */
@Component({
  selector: 'app-contour-lamp',
  templateUrl: './contour-lamp.component.html',
  styleUrl: './contour-lamp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'aria-hidden': 'true'},
})
export class ContourLampComponent {
  readonly peaks = input<Peak[]>(HERO_PEAKS);
  readonly levels = input(24);
  protected readonly paths = computed(() => buildContourPaths(this.peaks(), this.levels()));

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.followPointer());
  }

  private followPointer(): void {
    const area = this.host.parentElement;
    if (!area) return;

    const reduce = prefersReducedMotion();
    let targetX = 0, targetY = 0, x = 0, y = 0, radius = 0, targetRadius = 0, frame = 0;

    const tick = () => {
      frame = 0;
      const ease = reduce ? 1 : 0.2;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      radius += (targetRadius - radius) * (reduce ? 1 : 0.12);
      this.host.style.setProperty('--lamp-x', `${x}px`);
      this.host.style.setProperty('--lamp-y', `${y}px`);
      this.host.style.setProperty('--lamp-r', `${radius}px`);
      if (Math.abs(targetX - x) > 0.3 || Math.abs(targetY - y) > 0.3 || Math.abs(targetRadius - radius) > 0.3) {
        frame = requestAnimationFrame(tick);
      }
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const toLocal = (e: PointerEvent) => {
      const rect = this.host.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      toLocal(e);
      x = targetX;
      y = targetY;
      targetRadius = 230;
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      toLocal(e);
      kick();
    };
    const onLeave = () => {
      targetRadius = 0;
      kick();
    };

    area.addEventListener('pointerenter', onEnter);
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      area.removeEventListener('pointerenter', onEnter);
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
    });
  }
}
