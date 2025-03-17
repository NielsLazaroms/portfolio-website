import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopViewComponent } from './top-view.component';

describe('TopViewComponent', () => {
  let component: TopViewComponent;
  let fixture: ComponentFixture<TopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
