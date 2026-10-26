import {ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {LucidePause, LucidePlay} from '@lucide/angular';
import {projects, skillRingLabels, skills} from '../../inputData';
import {Skill, SkillRing} from '../../interfaces/interface';
import {ProjectFocusService} from '../../services/project-focus.service';
import {scrollBehavior} from '../../utils/motion';

interface OrbitItem {
  skill: Skill;
  angle: number;
}

/** Radius of each ring, as a percentage of the orbit's width. */
const RADII: Record<SkillRing, number> = {1: 27, 2: 36.5, 3: 46};
/** Seconds for one full turn. */
const DURATIONS: Record<SkillRing, number> = {1: 70, 2: 95, 3: 130};
const MAX_PILLS = 4;
const START_ANGLES: Record<SkillRing, number> = {1: -45, 2: -90, 3: -60};

/**
 * Skills on three rings around a centre circle, like the hero circles.
 * The closer the ring, the more I use the skill. The rings turn slowly;
 * hovering, focusing or the pause button stops them. Next to it, a short panel
 * says what I do with the chosen skill and links to its projects.
 */
@Component({
  selector: 'app-skills-orbit',
  imports: [LucidePause, LucidePlay, NgTemplateOutlet],
  templateUrl: './skills-orbit.component.html',
  styleUrl: './skills-orbit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsOrbitComponent {
  private readonly projectFocus = inject(ProjectFocusService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly ringLabels = skillRingLabels;
  protected readonly rings: SkillRing[] = [1, 2, 3];
  protected readonly radii = RADII;
  protected readonly durations = DURATIONS;
  protected readonly paused = signal(false);
  protected readonly selected = signal<Skill>(skills.find(s => s.name === 'Angular') ?? skills[0]);

  /** Each ring has one extra slot for its name tag; the logos share the other slots evenly. */
  protected readonly tagAngles = START_ANGLES;
  protected readonly itemsByRing = computed(() => {
    const byRing = {} as Record<SkillRing, OrbitItem[]>;
    for (const ring of this.rings) {
      const onRing = skills.filter(s => s.ring === ring);
      const step = 360 / (onRing.length + 1);
      byRing[ring] = onRing.map((skill, i) => ({skill, angle: START_ANGLES[ring] + (i + 1) * step}));
    }
    return byRing;
  });

  /** Projects with the chosen skill, in the same order as the Projects list: newest first. */
  protected readonly projectsForSelected = computed(() => {
    const skill = this.selected();
    if (skill.everywhere) return [];
    return projects.filter(p => p.skills.includes(skill.name)).reverse().sort((a, b) => b.year - a.year);
  });

  /** The newest few, shown as buttons; the rest sit behind "All N projects". */
  protected readonly pills = computed(() => this.projectsForSelected().slice(0, MAX_PILLS));

  /** Phone rows: choose the skill, then make sure its panel (under the row) is fully in view. */
  protected selectFromRow(skill: Skill): void {
    this.selected.set(skill);
    setTimeout(() => this.host.querySelector('.ring-row__panel')?.scrollIntoView({behavior: scrollBehavior(), block: 'nearest'}));
  }

  protected togglePause(): void {
    this.paused.update(p => !p);
  }

  /** Opens the project, with Projects filtered to this skill so the related projects stay listed. */
  protected openProject(id: string): void {
    this.projectFocus.open(id, this.selected().name);
  }

  protected showAll(): void {
    this.projectFocus.showSkill(this.selected().name);
  }
}
