import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Skill} from '../../interfaces/interface';

@Component({
  selector: 'app-skill-box',
  imports: [
    NgForOf
  ],
  templateUrl: './skill-box.component.html',
  standalone: true,
  styleUrl: './skill-box.component.scss'
})
export class SkillBoxComponent implements OnInit {
  @Input() skills: Skill[] = [];
  @Output() skillSelected = new EventEmitter<Skill>();
  @Input() isDisabled: boolean = false;

  activeIndex: number = 0;

  ngOnInit(): void {
    // Standaard de eerste skill selecteren
    if (this.skills.length) {
      this.skillSelected.emit(this.skills[0]);
    }
  }

  setActive(index: number): void {
    if (this.isDisabled || index === this.activeIndex) {
      return
    }
    this.activeIndex = index;
    this.skillSelected.emit(this.skills[index]);
  }
}
