import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {LucidePause, LucidePlay} from '@lucide/angular';
import {TopViewComponent} from '../../components/top-view/top-view.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SlidingTextComponent} from '../../components/sliding-text/sliding-text.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {ContourLampComponent} from '../../components/contour-lamp/contour-lamp.component';
import {AboutSectionComponent} from '../../components/about-section/about-section.component';
import {SkillsOrbitComponent} from '../../components/skills-orbit/skills-orbit.component';
import {ProjectShowcaseComponent} from '../../components/project-showcase/project-showcase.component';
import {ContactSectionComponent} from '../../components/contact-section/contact-section.component';
import {secondWordList, wordList} from '../../inputData';
import {CONTACT_PEAKS} from '../../utils/contour-map';

@Component({
  selector: 'app-home-page',
  imports: [
    NavbarComponent,
    TopViewComponent,
    ContourLampComponent,
    AboutSectionComponent,
    SkillsOrbitComponent,
    ProjectShowcaseComponent,
    SlidingTextComponent,
    ContactSectionComponent,
    FooterComponent,
    LucidePause,
    LucidePlay,
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  protected readonly wordList = wordList;
  protected readonly secondWordList = secondWordList;
  protected readonly allWords = [...wordList, ...secondWordList].join(', ');
  protected readonly contactPeaks = CONTACT_PEAKS;
  protected readonly wordsPaused = signal(false);
}
