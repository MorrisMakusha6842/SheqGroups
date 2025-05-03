import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwDropdownToolbarComponent } from './tw-dropdown-toolbar.component';

describe('TwDropdownToolbarComponent', () => {
  let component: TwDropdownToolbarComponent;
  let fixture: ComponentFixture<TwDropdownToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwDropdownToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwDropdownToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
