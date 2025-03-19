import {Component, OnInit} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-top-view',
  imports: [],
  templateUrl: './top-view.component.html',
  standalone: true,
  styleUrl: './top-view.component.scss'
})
export class TopViewComponent implements OnInit {
  textArray: string[] = ['Web Designer', 'Creative Developer'];
  typingSpeed = 200;
  erasingSpeed = 200;
  delayBetweenWords = 1000;
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;

  ngOnInit() {
    this.typeEffect();
    document.addEventListener("DOMContentLoaded", function() {
      const tl = gsap.timeline();

      tl.fromTo(
        ".top-view__center",
        { scale: 0.1, z: -500 },
        { duration: 2, scale: 1, z: 0, ease: "power3.out" }
      );

      tl.fromTo(
        ".top-view__small-circle--left",
        { x: -500, y: -500 },
        { duration: 1, x: 0, y: 0, ease: "power3.out" },
        "<"


      );

      tl.fromTo(
        ".top-view__small-circle--right",
        { x: 500, y: -500 },
        { duration: 1, x: 0, y: 0, ease: "power3.out" },
        "<"
      );
      tl.fromTo(
        ".top-view__small-circle--bottom-left",
        { x: -500},
        { duration: 1, x: 0, y: 0, ease: "power3.out" },
        "<"
      );
      tl.fromTo(
        ".top-view__small-circle--bottom-right",
        { x: 500},
        { duration: 1, x: 0, y: 0, ease: "power3.out" },
        "<"
      );
    });
  }

  typeEffect() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const currentText = this.textArray[this.textIndex];

    if (!this.isDeleting && this.charIndex < currentText.length) {
      element.innerHTML = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.typeEffect(), this.typingSpeed);
    } else if (this.isDeleting && this.charIndex > 0) {
      element.innerHTML = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.typeEffect(), this.erasingSpeed);
    } else {
      this.isDeleting = !this.isDeleting;

      if (!this.isDeleting) {
        this.textIndex = (this.textIndex + 1) % this.textArray.length;
      }
      setTimeout(() => this.typeEffect(), this.delayBetweenWords);
    }
  }
} {

}
