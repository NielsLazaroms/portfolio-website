import {Component, Input} from '@angular/core';
import {ProjectInfo} from '../../interfaces/interface';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-project-list',
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './project-list.component.html',
  standalone: true,
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  faExternalLink = faExternalLink;
@Input() projects: ProjectInfo[] = [];

  toggleProject(project: ProjectInfo) {
    project.isExpanded = !project.isExpanded;
  }
}
