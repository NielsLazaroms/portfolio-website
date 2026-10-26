import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LucideMoon, LucideSun} from '@lucide/angular';
import {Theme, ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-toggle-slider',
  imports: [FormsModule, LucideSun, LucideMoon],
  templateUrl: './toggle-slider.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './toggle-slider.component.scss'
})
export class ToggleSliderComponent {
  isChecked: boolean;

  constructor(private themeService: ThemeService,
  ) {
    this.isChecked = themeService.getCurrentTheme() != Theme.LIGHT;

  }

  onCheckboxChange() {
    this.themeService.setTheme(this.isChecked ? Theme.DARK : Theme.LIGHT);

  }
}
