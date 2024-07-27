import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingHeaderComponent } from './my-training-header.component';

describe('MyTrainingHeaderComponent', () => {
  let component: MyTrainingHeaderComponent;
  let fixture: ComponentFixture<MyTrainingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTrainingHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTrainingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
