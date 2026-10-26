import {Injectable, signal} from '@angular/core';

export interface ProjectFocusRequest {
  /** Project to show; when missing, Projects shows the newest project for the skill. */
  id?: string;
  /** Filter Projects to this skill. */
  skill?: string;
  /** Counter, so the same request can be made twice in a row. */
  n: number;
}

/** Lets Skills open Projects: one project, or every project with a skill. */
@Injectable({providedIn: 'root'})
export class ProjectFocusService {
  readonly request = signal<ProjectFocusRequest | null>(null);
  private count = 0;

  open(id: string, skill?: string): void {
    this.go({id, skill});
  }

  showSkill(skill: string): void {
    this.go({skill});
  }

  /** Scrolls back to Skills and moves focus there. */
  backToSkills(): void {
    const section = document.getElementById('skills-section');
    section?.scrollIntoView({behavior: this.behavior(), block: 'start'});
    document.getElementById('skills-heading')?.focus({preventScroll: true});
  }

  private go(request: Omit<ProjectFocusRequest, 'n'>): void {
    this.request.set({...request, n: ++this.count});
    document.getElementById('projects-section')?.scrollIntoView({behavior: this.behavior(), block: 'start'});
    // Keyboard and screen reader users continue from Projects, not from the button they left behind.
    document.getElementById('projects-heading')?.focus({preventScroll: true});
  }

  private behavior(): ScrollBehavior {
    return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
}
