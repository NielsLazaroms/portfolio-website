import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.component.html',
  standalone: true,
  styleUrl: './section-title.component.scss'
})
export class SectionTitleComponent {

  @Input() titleText: string = '';
  @Input() subtitleText: string = '';
}
