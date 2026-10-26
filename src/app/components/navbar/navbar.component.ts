import {afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, signal, viewChild} from '@angular/core';
import {LucideMenu, LucideX} from '@lucide/angular';
import {scrollBehavior} from '../../utils/motion';
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
  private readonly nav = viewChild.required<ElementRef<HTMLElement>>('nav');
  private readonly toggle = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');
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
      // Contact is watched too, so no link stays marked once you reach it.
      [...this.links.map(l => l.id), 'contact-section'].forEach(id => {
        const el = document.getElementById(id);
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
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    // The links are hidden now; put focus back on the button that opened them.
    this.toggle().nativeElement.focus();
  }

  /** While the full-screen menu is open, Tab cycles through the menu instead of the page behind it. */
  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: Event): void {
    if (!this.menuOpen()) return;
    const focusable = [...this.nav().nativeElement.querySelectorAll<HTMLElement>('a[href], button, input')]
      .filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    const back = (event as KeyboardEvent).shiftKey;
    if (back && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!back && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  go(sectionId: string, event: Event): void {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({behavior: scrollBehavior(), block: 'start'});
    // Move keyboard focus along with the scroll.
    section.setAttribute('tabindex', '-1');
    section.focus({preventScroll: true});
    this.menuOpen.set(false);
  }
}
