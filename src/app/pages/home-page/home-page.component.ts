import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
import {ImageRectangleComponent} from '../../components/image-rectangle/image-rectangle.component';
import {images} from '../../inputData/inputData-image';

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
    ImageRectangleComponent,
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
  activeImage: Image = images[0];
  isAnimating:boolean = false;
  isAnimatingImage:boolean = false;
  @ViewChild('totalContainer') totalContainer!: ElementRef;
  @ViewChild('imageTextContainer') imageTextContainer!: ElementRef;







  ngAfterViewInit() {
    this.imageTextContainer.nativeElement.innerHTML = this.activeImage.description; // Zet standaard tekst direct neer
    this.animateText(this.activeImage.description); // Start eerste animatie
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

  setActiveImage(image: Image): void {
    if (this.isAnimatingImage || image === this.activeImage) {
      return;
    }
    this.isAnimatingImage = true;

    this.activeImage = image;
    this.animateText(image.description);

    this.isAnimatingImage = false;
  }

  animateText(text: string) {
    const container = this.imageTextContainer.nativeElement;
    container.innerHTML = '';

    const chars = text.split('');

    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0'; // Start invisible
      span.style.display = 'inline-block';
      container.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        duration: 0.01,
        delay: i * 0.02,
      });
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

  protected readonly skills = skills;
  protected readonly projects = projects;
  protected readonly wordList = wordList;
  protected readonly secondWordList = secondWordList;
  protected readonly images = images;
}
