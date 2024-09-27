import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavealotComponent } from './savealot.component';

describe('SavealotComponent', () => {
  let component: SavealotComponent;
  let fixture: ComponentFixture<SavealotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavealotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavealotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
