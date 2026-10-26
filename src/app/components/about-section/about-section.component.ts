import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LucideDownload} from '@lucide/angular';
import {PhotoDeckComponent} from '../photo-deck/photo-deck.component';
import {ProjectFocusService} from '../../services/project-focus.service';

@Component({
  selector: 'app-about-section',
  imports: [LucideDownload, PhotoDeckComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  protected readonly age = AboutSectionComponent.ageFrom(new Date(2002, 10, 18));
  private readonly projectFocus = inject(ProjectFocusService);

  /** Shows the project in Projects. */
  protected openProject(id: string): void {
    this.projectFocus.open(id);
  }

  private static ageFrom(birth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) {
      age--;
    }
    return age;
  }
}
