import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixingBatchcardComponent } from './mixing-batchcard.component';

describe('MixingBatchcardComponent', () => {
  let component: MixingBatchcardComponent;
  let fixture: ComponentFixture<MixingBatchcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixingBatchcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixingBatchcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
