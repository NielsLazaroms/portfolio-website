import {afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, output, signal} from '@angular/core';
import {RouteStep} from '../../interfaces/interface';
import {prefersReducedMotion} from '../../utils/motion';

interface Waypoint {
  step: RouteStep;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  yearY: number;
  anchor: 'start' | 'middle' | 'end';
}

const WIDTH = 1000;
const HEIGHT = 190;
const PAD_X = 40;
const PAD_TOP = 50;
const BASE = HEIGHT - 24;

/** The route drawn like an elevation profile from a ride or ski app. Each step is a clickable waypoint. */
@Component({
  selector: 'app-route-profile',
  templateUrl: './route-profile.component.html',
  styleUrl: './route-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteProfileComponent {
  readonly steps = input.required<RouteStep[]>();
  readonly selected = input<RouteStep>();
  readonly select = output<RouteStep>();

  protected readonly viewBox = `0 0 ${WIDTH} ${HEIGHT}`;
  /** Hidden until the route scrolls into view, then the line draws itself once. */
  protected readonly drawn = signal(false);

  private readonly yOf = (h: number) => BASE - (h / 600) * (BASE - PAD_TOP);

  protected readonly waypoints = computed<Waypoint[]>(() => {
    const steps = this.steps();
    return steps.map((step, i) => {
      const x = PAD_X + i * (WIDTH - PAD_X * 2) / (steps.length - 1);
      const y = this.yOf(step.height);
      const up = i % 2 === 1 || !!step.isNow;
      const anchor = i === 0 ? 'start' : step.isNow ? 'end' : 'middle';
      const labelX = i === 0 ? x - 8 : step.isNow ? x + 8 : x;
      return {step, x, y, labelX, labelY: up ? y - 32 : y + 30, yearY: up ? y - 16 : y + 46, anchor};
    });
  });

  /** A slightly bumpy line between the waypoints, like a real trail. */
  protected readonly line = computed(() => {
    const steps = this.steps();
    const xs = this.waypoints().map(w => w.x);
    const points: [number, number][] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      const h0 = steps[i].height, h1 = steps[i + 1].height;
      for (let s = 0; s < 14; s++) {
        const f = s / 14;
        const eased = f * f * (3 - 2 * f);
        const wobble = s === 0 ? 0 : Math.sin((i * 14 + s) * 1.7) * 13 + Math.sin((i * 14 + s) * 0.6) * 8;
        points.push([xs[i] + (xs[i + 1] - xs[i]) * f, this.yOf(h0 + (h1 - h0) * eased + wobble * Math.sin(Math.PI * f))]);
      }
    }
    const last = steps[steps.length - 1];
    points.push([xs[xs.length - 1], this.yOf(last.height)]);
    return points.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
  });

  protected readonly area = computed(() => {
    const xs = this.waypoints().map(w => w.x);
    return `${this.line()}L${xs[xs.length - 1]} ${BASE}L${PAD_X} ${BASE}Z`;
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        this.drawn.set(true);
        return;
      }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) {
          this.drawn.set(true);
          observer.disconnect();
        }
      }, {threshold: 0.3});
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onKey(event: KeyboardEvent, step: RouteStep): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.select.emit(step);
    }
  }
}
