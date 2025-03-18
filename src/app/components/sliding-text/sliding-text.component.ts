import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-sliding-text',
  imports: [NgForOf, NgClass],
  templateUrl: './sliding-text.component.html',
  standalone: true,
  styleUrls: ['./sliding-text.component.scss']
})
export class SlidingTextComponent implements OnInit, AfterViewInit {
  @Input() words: string[] = [];
  marqueeWords: string[] = [];
  @ViewChild('textWrapper', { static: true }) textWrapper!: ElementRef;

  ngOnInit() {
    this.marqueeWords = [...this.words, ...this.words];
  }

  ngAfterViewInit() {
    this.createMarqueeEffect();
  }

  createMarqueeEffect() {
    if (!this.textWrapper) return;
    const wrapper = this.textWrapper.nativeElement;

    // Remove modifying the input property; use marqueeWords already set.
    // this.words = [...this.words, ...this.words]; <-- Remove this line

    setTimeout(() => {
      const animateWord = () => {
        const firstWord = wrapper.children[0] as HTMLElement;
        const firstWordWidth = firstWord.offsetWidth;

        gsap.to(wrapper, {
          x: `-=${firstWordWidth}`,
          duration: firstWordWidth / 100, // Adjust speed as needed.
          ease: "linear",
          onComplete: () => {
            wrapper.appendChild(firstWord);
            gsap.set(wrapper, { x: `+=${firstWordWidth}` });
            animateWord();
          }
        });
      };

      animateWord();
    }, 0);
  }
}
