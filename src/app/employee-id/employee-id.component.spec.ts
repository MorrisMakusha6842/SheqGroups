import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIdComponent } from './employee-id.component';

describe('EmployeeIdComponent', () => {
  let component: EmployeeIdComponent;
  let fixture: ComponentFixture<EmployeeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
