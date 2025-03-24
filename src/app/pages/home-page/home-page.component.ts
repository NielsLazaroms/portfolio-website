import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {TopViewComponent} from '../../components/top-view/top-view.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SectionTitleComponent} from '../../components/section-title/section-title.component';
import {SkillBoxComponent} from '../../components/skill-box/skill-box.component';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {DownloadButtonComponent} from '../../components/download-button/download-button.component';
import {Image, Skill} from '../../interfaces/interface';
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
export class HomePageComponent implements AfterViewInit{

  formData = {
    name: '',
    subject: '',
    chat: ''
  };


  activeSkill: Skill = skills[0];
  isAnimating:boolean = false;
  @ViewChild('totalContainer') totalContainer!: ElementRef;
  @ViewChild('aboutMeImage') aboutMeImage!: ElementRef;
  @ViewChild('aboutContainer') aboutContainer!: ElementRef<HTMLElement>;
  @ViewChild('quoteContainer') quoteContainer!: ElementRef<HTMLElement>;

  @ViewChildren('followImg') followImages!: QueryList<ElementRef<HTMLImageElement>>;

  ngAfterViewInit(): void {
    this.setupParallax(this.quoteContainer.nativeElement, this.followImages.toArray().map(r => r.nativeElement));
    this.setupParallax(this.aboutContainer.nativeElement, [this.aboutMeImage.nativeElement]);
  }

  private setupParallax(host: HTMLElement, images: HTMLImageElement[]): void {
    host.addEventListener('mousemove', (e: MouseEvent) => {
      images.forEach(img => {
        const { left, top, width, height } = img.getBoundingClientRect();
        const moveX = (e.clientX - (left + width / 2)) * 0.02;
        const moveY = (e.clientY - (top + height / 2)) * 0.02;

        gsap.to(img, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
      });
    });

    host.addEventListener('mouseleave', () => {
      images.forEach(img =>
        gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' })
      );
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
