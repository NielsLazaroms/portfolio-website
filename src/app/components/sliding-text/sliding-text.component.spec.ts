import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingTextComponent } from './sliding-text.component';

describe('SlidingTextComponent', () => {
  let component: SlidingTextComponent;
  let fixture: ComponentFixture<SlidingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidingTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
