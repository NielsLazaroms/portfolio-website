import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-skill-box',
  imports: [
    NgForOf
  ],
  templateUrl: './skill-box.component.html',
  standalone: true,
  styleUrl: './skill-box.component.scss'
})
export class SkillBoxComponent {
@Input() images: string[] = [];
}
