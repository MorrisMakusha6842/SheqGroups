import { Component } from '@angular/core';
import { ChapterComponent } from '../chapter/chapter.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    ChapterComponent
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {

}
