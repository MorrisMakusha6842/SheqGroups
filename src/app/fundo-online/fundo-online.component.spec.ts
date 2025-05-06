import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundoOnlineComponent } from './fundo-online.component';

describe('FundoOnlineComponent', () => {
  let component: FundoOnlineComponent;
  let fixture: ComponentFixture<FundoOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundoOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
