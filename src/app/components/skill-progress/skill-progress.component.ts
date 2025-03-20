import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-skill-progress',
  imports: [],
  templateUrl: './skill-progress.component.html',
  standalone: true,
  styleUrl: './skill-progress.component.scss'
})
export class SkillProgressComponent {
  @Input() title!: string;
  @Input() min: number = 0;
  @Input() max!: number;
  @Input() value!: number;

  get percentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }
}
