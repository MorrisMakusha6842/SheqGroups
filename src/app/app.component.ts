import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwDropdownToolbarComponent } from './tw-dropdown-toolbar/tw-dropdown-toolbar.component';
import { NgClass } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { TrainingSliderComponent } from './training-slider/training-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TwDropdownToolbarComponent,
    NgClass,
    RegisterUserComponent,
    TrainingSliderComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-pos';
  showSideBar= false;
}
