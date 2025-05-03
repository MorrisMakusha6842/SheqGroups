import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSheqComponent } from './admin-sheq.component';

describe('AdminSheqComponent', () => {
  let component: AdminSheqComponent;
  let fixture: ComponentFixture<AdminSheqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSheqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSheqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
