import {ChangeDetectionStrategy, Component} from '@angular/core';

/** LinkedIn logo in Lucide's line style (Lucide 1.x no longer ships brand icons). */
@Component({
  selector: 'app-linkedin-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>`,
  styles: `:host { display: inline-flex; } svg { width: 18px; height: 18px; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedinIconComponent {}
