import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOutputComponent } from './video-output.component';

describe('VideoOutputComponent', () => {
  let component: VideoOutputComponent;
  let fixture: ComponentFixture<VideoOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
