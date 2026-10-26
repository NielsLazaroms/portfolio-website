import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {LucideDownload, LucideMail} from '@lucide/angular';
import {route} from '../../inputData';
import {RouteStep} from '../../interfaces/interface';
import {RouteProfileComponent} from '../route-profile/route-profile.component';
import {PhotoDeckComponent} from '../photo-deck/photo-deck.component';

@Component({
  selector: 'app-about-section',
  imports: [LucideDownload, LucideMail, RouteProfileComponent, PhotoDeckComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  protected readonly route = route;
  protected readonly age = AboutSectionComponent.ageFrom(new Date(2002, 10, 18));
  protected readonly selected = signal<RouteStep>(route[route.length - 1]);

  private static ageFrom(birth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) {
      age--;
    }
    return age;
  }

  protected scrollToContact(event: Event): void {
    event.preventDefault();
    document.getElementById('contact-section')?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
