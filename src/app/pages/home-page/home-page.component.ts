import {AfterViewInit, Component} from '@angular/core';
import {TopViewComponent} from '../../components/top-view/top-view.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SectionTitleComponent} from '../../components/section-title/section-title.component';
import {SkillBoxComponent} from '../../components/skill-box/skill-box.component';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {DownloadButtonComponent} from '../../components/download-button/download-button.component';
import {ProjectInfo} from '../../models/interface';
import {ProjectListComponent} from '../../components/project-list/project-list.component';
import {SlidingTextComponent} from '../../components/sliding-text/sliding-text.component';
import {SpotlightDirective} from '../../directives/spotlight.directive';
import {FormsModule} from '@angular/forms';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-home-page',
  imports: [
    TopViewComponent,
    NavbarComponent,
    SectionTitleComponent,
    SkillBoxComponent,
    DownloadButtonComponent,
    ProjectListComponent,
    SlidingTextComponent,
    SpotlightDirective,
    FormsModule,
  ],
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit {

  formData = {
    name: '',
    subject: '',
    chat: ''
  };

  images: string[] = [
    'assets/github-icon.svg',
    'assets/indesign-icon.svg',
    'assets/javascript-icon.svg',
    'assets/typescript-icon.svg',
    'assets/angular-icon.svg',
    'assets/figma-icon.svg',
    'assets/vue-icon.svg',
    'assets/illustrator-icon.svg',
  ]

  projects: ProjectInfo[] = [
    {
      name: 'Miyamoto Experience',
      description: 'Project description',
      skills: ['Angular','SCSS', 'GSAP'],
      year: 2024,
      isExpanded: false
    },
    {
      name: 'LedenCentraal',
      description: 'Project description2',
      skills: ['Angular', 'Tailwind', 'SQL', 'DaisyUI'],
      year: 2025,
      isExpanded: false
    },
    {
      name: 'Dog-life experience',
      description: 'Project description2',
      skills: ['Angular', 'SCSS', 'PWA', 'Firebase'],
      year: 2025,
      isExpanded: false
    },
    {
      name: 'Equine Integration widget',
      description: 'Project description2',
      skills: ['Kotlin'],
      year: 2025,
      isExpanded: false
    },
    {
      name: 'Summer Rush',
      description: 'Project description2',
      skills: ['JavaScript', 'Illustrator'],
      year: 2024,
      isExpanded: false
    },
  ]

  wordList: string[] = [
    'high-quality',
    'user-focused',
    'innovative',
    'interactive design',
  ]

  secondWordList: string[] = [
    'high-end',
    'responsive',
    'accurate',
    'dynamic',
  ]



  ngAfterViewInit() {
    gsap.to("#years", {
      scrollTrigger: {
        trigger: ".my-skills-section",
        start: "top center",
        toggleActions: "play none none none"
      },
      innerText: 4,
      duration: 3,
      snap: "innerText"
    });
  }

  openMail() {
    const email = 'niels.lazaroms@live.nl';
    const subject = encodeURIComponent(this.formData.subject);
    const body = encodeURIComponent(
      `Dear Niels,\n\n${this.formData.chat}\n\n Kind regards,\n${this.formData.name}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    this.formData = { name: '', subject: '', chat: '' };

  }
}
