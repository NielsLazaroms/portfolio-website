import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';
import {Image, Skill} from '../../interfaces/interface';

@Component({
  selector: 'app-image-rectangle',
  imports: [
    NgStyle,
    NgForOf
  ],
  templateUrl: './image-rectangle.component.html',
  standalone: true,
  styleUrl: './image-rectangle.component.scss'
})
export class ImageRectangleComponent implements OnInit {
  @Input() images: Image[] = [];
  @Output() imageSelected = new EventEmitter<Image>();
  @Input() isDisabled: boolean = false;

  activeIndex: number = 0;
  ngOnInit(): void {
    // Standaard de eerste skill selecteren
    if (this.images.length) {
      this.imageSelected.emit(this.images[0]);
    }
  }

  setActive(index: number): void {
    if (this.isDisabled || index === this.activeIndex) {
      return
    }
    this.activeIndex = index;
    this.imageSelected.emit(this.images[index]);
  }
}
