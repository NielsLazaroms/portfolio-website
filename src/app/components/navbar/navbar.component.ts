import {Component, HostListener} from '@angular/core';
import {NgIf} from '@angular/common';
import {ToggleSliderComponent} from '../toggle-slider/toggle-slider.component';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    ToggleSliderComponent
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.navbar');
    if (!clickedInside) {
      this.menuOpen = false;
    }
  }
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeMenu();
    }
  }
}
