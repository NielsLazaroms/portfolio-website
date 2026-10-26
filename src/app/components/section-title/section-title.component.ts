import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './section-title.component.scss'
})
export class SectionTitleComponent {

  @Input() titleText: string = '';
  @Input() subtitleText: string = '';
}
