import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRectangleComponent } from './image-rectangle.component';

describe('ImageRectangleComponent', () => {
  let component: ImageRectangleComponent;
  let fixture: ComponentFixture<ImageRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageRectangleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
