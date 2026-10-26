import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProjectShowcaseComponent} from './project-showcase.component';
import {projects} from '../../inputData';
import {ProjectFocusService} from '../../services/project-focus.service';

describe('ProjectShowcaseComponent', () => {
  let fixture: ComponentFixture<ProjectShowcaseComponent>;
  let el: HTMLElement;

  const title = () => el.querySelector('.stage__title')?.textContent?.trim();
  const items = () => [...el.querySelectorAll<HTMLButtonElement>('.index__item')];

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [ProjectShowcaseComponent]}).compileComponents();
    fixture = TestBed.createComponent(ProjectShowcaseComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('lists every project and opens with Slopeworks', () => {
    expect(items().length).toBe(projects.length);
    expect(title()).toContain('Slopeworks');
  });

  it('filters the index by type of work', () => {
    const school = [...el.querySelectorAll<HTMLButtonElement>('.filters button')].find(b => b.textContent!.includes('School'))!;
    school.click();
    fixture.detectChanges();
    expect(items().length).toBe(projects.filter(p => p.kind === 'School').length);
    expect(school.getAttribute('aria-pressed')).toBe('true');
  });

  it('opens a project requested by another section', async () => {
    TestBed.inject(ProjectFocusService).open('mixtape');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(title()).toContain('Mixtape');
    expect(el.querySelector('.frame')!.classList).toContain('frame--phone');
  });

  it('filters to a skill from Skills and can go back', async () => {
    TestBed.inject(ProjectFocusService).showSkill('Firebase');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(items().length).toBe(projects.filter(p => p.skills.includes('Firebase')).length);
    expect(el.querySelector('.filters__skill')?.textContent).toContain('Firebase');
    expect(el.querySelector('.filters__back')).not.toBeNull();

    el.querySelector<HTMLButtonElement>('.filters__skill')!.click();
    fixture.detectChanges();
    expect(items().length).toBe(projects.length);
    expect(el.querySelector('.filters__back')).toBeNull();
  });

  it('marks private code instead of linking to GitHub', async () => {
    TestBed.inject(ProjectFocusService).open('mergelog');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(el.querySelector('.links__note')?.textContent).toContain('The code is private.');
    expect(el.querySelector('a[href*="github.com"]')).toBeNull();
  });
});
