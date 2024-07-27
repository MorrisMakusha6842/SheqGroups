import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressRatingComponent } from './progress-rating.component';

describe('ProgressRatingComponent', () => {
  let component: ProgressRatingComponent;
  let fixture: ComponentFixture<ProgressRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
