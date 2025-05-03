import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheqIgComponent } from './sheq-ig.component';

describe('SheqIgComponent', () => {
  let component: SheqIgComponent;
  let fixture: ComponentFixture<SheqIgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheqIgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheqIgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
