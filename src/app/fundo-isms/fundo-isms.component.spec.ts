import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundoIsmsComponent } from './fundo-isms.component';

describe('FundoIsmsComponent', () => {
  let component: FundoIsmsComponent;
  let fixture: ComponentFixture<FundoIsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundoIsmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundoIsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
