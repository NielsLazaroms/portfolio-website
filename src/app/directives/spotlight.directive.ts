import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.el.nativeElement.style.setProperty('--spotlight-x', `${x}px`);
    this.el.nativeElement.style.setProperty('--spotlight-y', `${y}px`);
  }
}
