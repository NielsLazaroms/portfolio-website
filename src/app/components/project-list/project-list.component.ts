import {Component, Input, OnInit} from '@angular/core';
import {ProjectInfo} from '../../interfaces/interface';
import { NgClass } from '@angular/common';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {PreloaderService} from '../../services/preloader.service';


@Component({
  selector: 'app-project-list',
  imports: [
    NgClass,
    FaIconComponent
],
  templateUrl: './project-list.component.html',
  standalone: true,
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit{
  faExternalLink = faExternalLink;
@Input() projects: ProjectInfo[] = [];
  constructor(private preloader: PreloaderService) {}
    ngOnInit(): void {
    const allImages: string[] = [];
    this.projects.forEach(project => {
      if (project.images) {
        allImages.push(...project.images);
      }
    });
    this.preloader.preload(allImages);
  }
  toggleProject(project: ProjectInfo) {
    project.isExpanded = !project.isExpanded;
  }
}
