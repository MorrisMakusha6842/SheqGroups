import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupaCleanComponent } from './supa-clean.component';

describe('SupaCleanComponent', () => {
  let component: SupaCleanComponent;
  let fixture: ComponentFixture<SupaCleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupaCleanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupaCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
