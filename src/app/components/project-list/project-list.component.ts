import {Component, Input} from '@angular/core';
import {ProjectInfo} from '../../models/interface';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './project-list.component.html',
  standalone: true,
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
@Input() projects: ProjectInfo[] = [];

  toggleProject(project: ProjectInfo) {
    project.isExpanded = !project.isExpanded;
  }

}
