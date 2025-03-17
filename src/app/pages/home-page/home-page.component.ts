import {AfterViewInit, Component } from '@angular/core';
import {TopViewComponent} from '../../components/top-view/top-view.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {NgStyle} from '@angular/common';
import {SectionTitleComponent} from '../../components/section-title/section-title.component';
import {SkillBoxComponent} from '../../components/skill-box/skill-box.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-home-page',
  imports: [
    TopViewComponent,
    NavbarComponent,
    NgStyle,
    SectionTitleComponent,
    SkillBoxComponent
  ],
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit {
  images:string[] = [
    'assets/html-icon.svg',
    'assets/css-icon.svg',
    'assets/javascript-icon.svg',
    'assets/typescript-icon.svg',
    'assets/angular-icon.svg',
    'assets/figma-icon.svg'
  ]

  ngAfterViewInit() {
    gsap.to("#years",{
      scrollTrigger: {
        trigger: ".my-skills-section",
        start: "top center",
        toggleActions: "play none none none"
      },
      innerText: 4,
      duration: 3,
      snap: "innerText"

    })
  }
}
