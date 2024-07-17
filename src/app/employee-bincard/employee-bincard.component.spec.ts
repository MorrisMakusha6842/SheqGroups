import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBincardComponent } from './employee-bincard.component';

describe('EmployeeBincardComponent', () => {
  let component: EmployeeBincardComponent;
  let fixture: ComponentFixture<EmployeeBincardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeBincardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBincardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
