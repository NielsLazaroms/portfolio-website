import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GithubIconComponent} from '../brand-icons/github-icon.component';
import {LinkedinIconComponent} from '../brand-icons/linkedin-icon.component';

@Component({
  selector: 'app-footer',
  imports: [GithubIconComponent, LinkedinIconComponent],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
