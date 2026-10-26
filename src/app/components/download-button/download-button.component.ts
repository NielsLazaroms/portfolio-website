import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-download-button',
  imports: [],
  templateUrl: './download-button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './download-button.component.scss'
})
export class DownloadButtonComponent {
@Input()  buttonText: string = '';
@Input()  fileToDownload: string = '';
}
