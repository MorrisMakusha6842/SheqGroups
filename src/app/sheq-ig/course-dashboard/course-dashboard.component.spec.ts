import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDashboardComponent } from './course-dashboard.component';

describe('CourseDashboardComponent', () => {
  let component: CourseDashboardComponent;
  let fixture: ComponentFixture<CourseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
