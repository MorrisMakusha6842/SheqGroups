import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCheckoutComponent } from './mini-checkout.component';

describe('MiniCheckoutComponent', () => {
  let component: MiniCheckoutComponent;
  let fixture: ComponentFixture<MiniCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
