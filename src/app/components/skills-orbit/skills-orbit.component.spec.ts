import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SkillsOrbitComponent} from './skills-orbit.component';
import {projects, skills} from '../../inputData';
import {ProjectFocusService} from '../../services/project-focus.service';

describe('SkillsOrbitComponent', () => {
  let fixture: ComponentFixture<SkillsOrbitComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [SkillsOrbitComponent]}).compileComponents();
    fixture = TestBed.createComponent(SkillsOrbitComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('shows every skill on the orbit, each with an accessible name', () => {
    const logos = el.querySelectorAll<HTMLButtonElement>('.orbit__logo');
    expect(logos.length).toBe(skills.length);
    logos.forEach(b => expect(b.getAttribute('aria-label')).toBeTruthy());
  });

  it('starts with Angular in the centre', () => {
    expect(el.querySelector('.orbit__disc h3')?.textContent?.trim()).toBe('Angular');
  });

  it('moves a clicked skill to the centre and shows its panel', () => {
    const vue = [...el.querySelectorAll<HTMLButtonElement>('.orbit__logo')].find(b => b.getAttribute('aria-label')!.startsWith('Vue,'))!;
    vue.click();
    fixture.detectChanges();
    expect(el.querySelector('.orbit__disc h3')?.textContent?.trim()).toBe('Vue');
    expect(vue.getAttribute('aria-pressed')).toBe('true');
    expect(el.querySelector('.panel__title')?.textContent).toContain('Vue');
    expect(el.querySelector('.panel__what')?.textContent?.trim()).toBe(skills.find(s => s.name === 'Vue')!.description);
  });

  it('shows the newest four projects and a button for the rest', () => {
    const angular = projects.filter(p => p.skills.includes('Angular'));
    const pills = el.querySelectorAll<HTMLButtonElement>('.pill:not(.pill--all)');
    expect(pills.length).toBe(Math.min(4, angular.length));
    expect(el.querySelector('.pill--all')?.textContent).toContain(`All ${angular.length} Angular projects`);
  });

  it('opens a project in Projects, filtered to the skill', () => {
    const focus = TestBed.inject(ProjectFocusService);
    spyOn(focus, 'open');
    spyOn(focus, 'showSkill');
    el.querySelector<HTMLButtonElement>('.pill')!.click();
    expect(focus.open).toHaveBeenCalledWith(jasmine.any(String), 'Angular');
    el.querySelector<HTMLButtonElement>('.pill--all')!.click();
    expect(focus.showSkill).toHaveBeenCalledWith('Angular');
  });

  it('pauses and resumes the rotation', () => {
    const pause = el.querySelector<HTMLButtonElement>('.motion-btn')!;
    pause.click();
    fixture.detectChanges();
    expect(el.querySelector('.orbit')!.classList).toContain('is-paused');
    expect(pause.getAttribute('aria-label')).toBe('Play rotation');
  });
});
