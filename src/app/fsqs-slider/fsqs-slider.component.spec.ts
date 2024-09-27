import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqsSliderComponent } from './fsqs-slider.component';

describe('FsqsSliderComponent', () => {
  let component: FsqsSliderComponent;
  let fixture: ComponentFixture<FsqsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FsqsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsqsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
