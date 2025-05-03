import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementAComponent } from './user-management-a.component';

describe('UserManagementComponent', () => {
  let component: UserManagementAComponent;
  let fixture: ComponentFixture<UserManagementAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
