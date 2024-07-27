import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingWelcomeComponent } from './training-welcome.component';

describe('TrainingWelcomeComponent', () => {
  let component: TrainingWelcomeComponent;
  let fixture: ComponentFixture<TrainingWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
