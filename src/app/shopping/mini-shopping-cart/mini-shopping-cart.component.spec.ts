import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniShoppingCartComponent } from './mini-shopping-cart.component';

describe('MiniShoppingCartComponent', () => {
  let component: MiniShoppingCartComponent;
  let fixture: ComponentFixture<MiniShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniShoppingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
