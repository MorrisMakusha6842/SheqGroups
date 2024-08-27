import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipcardsComponent } from './flipcards.component';

describe('FlipcardsComponent', () => {
  let component: FlipcardsComponent;
  let fixture: ComponentFixture<FlipcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlipcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlipcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
