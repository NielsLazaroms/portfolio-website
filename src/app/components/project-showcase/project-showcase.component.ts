import {ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, signal, untracked, viewChild} from '@angular/core';
import {LucideExternalLink, LucideLock, LucideX} from '@lucide/angular';
import {projectKindLabels, projects} from '../../inputData';
import {ProjectInfo, ProjectKind} from '../../interfaces/interface';
import {ProjectFocusService} from '../../services/project-focus.service';
import {PreloaderService} from '../../services/preloader.service';
import {prefersReducedMotion} from '../../utils/motion';
import {GithubIconComponent} from '../brand-icons/github-icon.component';

type Filter = 'All' | ProjectKind;

/**
 * How long the pointer has to rest on a project before the preview switches.
 * Long enough that moving down the list doesn't flip through every project;
 * the bar in front of the name grows in over the same time (see the SCSS).
 */
const HOVER_DELAY = 450;

/**
 * Projects as an index (grouped by year) next to a large preview.
 * The preview shows the screenshots in a browser or phone frame and takes on the project's own colour.
 */
@Component({
  selector: 'app-project-showcase',
  imports: [LucideExternalLink, LucideLock, LucideX, GithubIconComponent],
  templateUrl: './project-showcase.component.html',
  styleUrl: './project-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectShowcaseComponent {
  private readonly projectFocus = inject(ProjectFocusService);
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  protected readonly kindLabels = projectKindLabels;
  protected readonly filters: Filter[] = ['All', 'Personal', 'Others', 'School'];
  protected readonly filter = signal<Filter>('All');
  /** Set when Skills sent the visitor here for one skill. */
  protected readonly skillFilter = signal<string | null>(null);
  /** Shows "Back to Skills" while the visitor is here because of Skills. */
  protected readonly fromSkills = signal(false);
  protected readonly current = signal<ProjectInfo>(projects.find(p => p.id === 'slopeworks') ?? projects[0]);
  protected readonly shot = signal(0);
  /** True while the frame fades out before switching project. */
  protected readonly swapping = signal(false);
  protected readonly tint = signal<string | null>(null);
  protected readonly aspect = signal<string | null>(null);

  protected readonly counts = computed(() => {
    const counts: Record<Filter, number> = {All: projects.length, Personal: 0, Others: 0, School: 0};
    projects.forEach(p => counts[p.kind]++);
    return counts;
  });

  protected readonly groups = computed(() => {
    const skill = this.skillFilter();
    const visible = projects.filter(p => (this.filter() === 'All' || p.kind === this.filter()) && (!skill || p.skills.includes(skill)));
    const years = [...new Set(visible.map(p => p.year))].sort((a, b) => b - a);
    return years.map(year => ({year, items: visible.filter(p => p.year === year).reverse()}));
  });

  private readonly tintCache = new Map<string, string>();
  private hoverTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(PreloaderService).preload(projects.flatMap(p => p.images));

    // Another section asked to open a project.
    effect(() => {
      const request = this.projectFocus.request();
      if (!request) return;
      untracked(() => {
        this.filter.set('All');
        this.skillFilter.set(request.skill ?? null);
        this.fromSkills.set(!!request.skill);
        // A specific project, or else the newest one with the skill.
        const project = projects.find(p => p.id === request.id) ?? this.groups()[0]?.items[0];
        if (project) this.show(project, false);
      });
    });

    effect(() => {
      const src = this.current().images[this.shot()];
      untracked(() => this.updateTint(src));
    });
  }

  protected setFilter(filter: Filter): void {
    this.filter.set(filter);
    this.clearSkill();
  }

  protected clearSkill(): void {
    this.skillFilter.set(null);
    this.fromSkills.set(false);
    this.keepCurrentVisible();
  }

  protected backToSkills(): void {
    this.fromSkills.set(false);
    this.projectFocus.backToSkills();
  }

  private keepCurrentVisible(): void {
    const visible = this.groups().flatMap(g => g.items);
    if (!visible.includes(this.current()) && visible.length) {
      this.show(visible[0]);
    }
  }

  protected onHover(project: ProjectInfo, event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(this.hoverTimer);
    this.hoverTimer = setTimeout(() => this.show(project), HOVER_DELAY);
  }

  protected cancelHover(): void {
    clearTimeout(this.hoverTimer);
  }

  protected select(project: ProjectInfo): void {
    this.show(project);
  }

  protected show(project: ProjectInfo, animate = true): void {
    if (project === this.current()) return;
    if (!animate || prefersReducedMotion()) {
      this.current.set(project);
      this.shot.set(0);
      this.aspect.set(null);
      return;
    }
    this.swapping.set(true);
    setTimeout(() => {
      this.current.set(project);
      this.shot.set(0);
      this.aspect.set(null);
      setTimeout(() => this.swapping.set(false), 20);
    }, 200);
  }

  /** Lets the frame take the exact shape of the screenshot, so nothing is cropped. */
  protected onImageLoad(event: Event, index: number): void {
    if (index !== this.shot()) return;
    const img = event.target as HTMLImageElement;
    this.aspect.set(`${img.naturalWidth} / ${img.naturalHeight}`);
  }

  protected setShot(index: number): void {
    this.shot.set(index);
    const img = this.stage().nativeElement.querySelectorAll<HTMLImageElement>('.shot img')[index];
    if (img?.naturalWidth) {
      this.aspect.set(`${img.naturalWidth} / ${img.naturalHeight}`);
    }
  }

  /** Average colour of the screenshot, weighted towards saturated pixels. */
  private updateTint(src: string): void {
    const cached = this.tintCache.get(src);
    if (cached) {
      this.tint.set(cached);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 24;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, 24, 24);
        const data = ctx.getImageData(0, 0, 24, 24).data;
        let r = 0, g = 0, b = 0, total = 0;
        for (let i = 0; i < data.length; i += 4) {
          const weight = 1 + (Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2])) / 32;
          r += data[i] * weight;
          g += data[i + 1] * weight;
          b += data[i + 2] * weight;
          total += weight;
        }
        const colour = `rgb(${Math.round(r / total)} ${Math.round(g / total)} ${Math.round(b / total)})`;
        this.tintCache.set(src, colour);
        if (this.current().images[this.shot()] === src) this.tint.set(colour);
      } catch {
        // Leave the neutral background if the image can't be read.
      }
    };
    img.src = src;
  }
}
