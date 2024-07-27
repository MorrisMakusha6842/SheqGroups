import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSliderComponent } from './training-slider.component';

describe('TrainingSliderComponent', () => {
  let component: TrainingSliderComponent;
  let fixture: ComponentFixture<TrainingSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
