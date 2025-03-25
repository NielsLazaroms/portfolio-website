import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Theme, ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-toggle-slider',
  imports: [
    FormsModule
  ],
  templateUrl: './toggle-slider.component.html',
  standalone: true,
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
