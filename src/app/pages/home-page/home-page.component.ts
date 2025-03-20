import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {TopViewComponent} from '../../components/top-view/top-view.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SectionTitleComponent} from '../../components/section-title/section-title.component';
import {SkillBoxComponent} from '../../components/skill-box/skill-box.component';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {DownloadButtonComponent} from '../../components/download-button/download-button.component';
import {Skill} from '../../interfaces/interface';
import {ProjectListComponent} from '../../components/project-list/project-list.component';
import {SlidingTextComponent} from '../../components/sliding-text/sliding-text.component';
import {SpotlightDirective} from '../../directives/spotlight.directive';
import {FormsModule} from '@angular/forms';
import {SkillProgressComponent} from '../../components/skill-progress/skill-progress.component';
import {projects, secondWordList, skills, wordList} from '../../inputData';

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
    SkillProgressComponent,
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


  activeSkill: Skill = skills[0];
  isAnimating:boolean = false;
  @ViewChild('totalContainer') totalContainer!: ElementRef;







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

  setActiveSkill(skill: Skill): void {
    if (this.isAnimating || skill === this.activeSkill) {
      return;
    }
    this.isAnimating = true;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.2 },
      onComplete: () => {
        this.isAnimating = false;
      }
    });

    tl.to(this.totalContainer.nativeElement, {
      opacity: '0',
      onComplete: () => {
        this.activeSkill = skill;

      }
    });

    tl.to(this.totalContainer.nativeElement, {
      opacity: '1',
    },
      "+=0.7"
    );
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

  protected readonly skills = skills;
  protected readonly projects = projects;
  protected readonly wordList = wordList;
  protected readonly secondWordList = secondWordList;
}
