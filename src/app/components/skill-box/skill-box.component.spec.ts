import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillBoxComponent } from './skill-box.component';

describe('SkillBoxComponent', () => {
  let component: SkillBoxComponent;
  let fixture: ComponentFixture<SkillBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
