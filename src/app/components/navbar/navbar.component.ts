import {afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, signal} from '@angular/core';
import {LucideMenu, LucideX} from '@lucide/angular';
import {ToggleSliderComponent} from '../toggle-slider/toggle-slider.component';

@Component({
  selector: 'app-navbar',
  imports: [ToggleSliderComponent, LucideMenu, LucideX],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly links = [
    {id: 'about-section', label: 'About'},
    {id: 'skills-section', label: 'Skills'},
    {id: 'projects-section', label: 'Projects'},
  ];
  readonly menuOpen = signal(false);
  /** Gets a background once the page is scrolled, so it stays readable over content. */
  readonly scrolled = signal(false);
  /** The section currently in view, marked with a dot in the nav. */
  readonly active = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, {passive: true});
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));

      if (!('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) this.active.set(visible[0].target.id);
        else if (entries.some(e => e.target.id === this.links[0].id && e.boundingClientRect.top > 0)) this.active.set(null);
      }, {rootMargin: '-45% 0px -50% 0px'});
      this.links.forEach(l => {
        const el = document.getElementById(l.id);
        if (el) observer.observe(el);
      });
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.nav')) {
      this.menuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen.set(false);
  }

  go(sectionId: string, event: Event): void {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({behavior: 'smooth', block: 'start'});
    // Move keyboard focus along with the scroll.
    section.setAttribute('tabindex', '-1');
    section.focus({preventScroll: true});
    this.menuOpen.set(false);
  }
}
