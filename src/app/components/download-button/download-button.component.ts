import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-download-button',
  imports: [],
  templateUrl: './download-button.component.html',
  standalone: true,
  styleUrl: './download-button.component.scss'
})
export class DownloadButtonComponent {
@Input() buttonText: string = '';
}
