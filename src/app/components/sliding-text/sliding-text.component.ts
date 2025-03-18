import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-sliding-text',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './sliding-text.component.html',
  styleUrls: ['./sliding-text.component.scss']
})
export class SlidingTextComponent implements OnInit, AfterViewInit {
  @Input() words: string[] = [];
  @Input() direction: 'rtl' | 'ltr' = 'rtl';
  marqueeWords: string[] = [];
  @ViewChild('textWrapper', { static: true }) textWrapper!: ElementRef;

  ngOnInit() {
    this.marqueeWords = [...this.words, ...this.words];
  }

  ngAfterViewInit() {
    this.createMarqueeEffect();
  }

  private createMarqueeEffect() {
    if (!this.textWrapper) return;
    const wrapper = this.textWrapper.nativeElement;

    setTimeout(() => {
      const totalWidth = wrapper.scrollWidth;
      const halfWidth = totalWidth / 2;
      const duration = 50;

      if (this.direction === 'rtl') {
        gsap.fromTo(
          wrapper,
          { x: 0 },
          {
            x: -halfWidth,
            duration,
            ease: 'none',
            repeat: -1,
            onRepeat: () => {
              gsap.set(wrapper, { x: 0 });
            }
          }
        );
      } else {
        gsap.fromTo(
          wrapper,
          { x: -halfWidth },
          {
            x: 0,
            duration,
            ease: 'none',
            repeat: -1,
            onRepeat: () => {
              gsap.set(wrapper, { x: -halfWidth });
            }
          }
        );
      }
    }, 0);
  }
}
