import {Component, OnInit} from '@angular/core';

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
