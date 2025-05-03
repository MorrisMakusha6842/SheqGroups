import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SheqIgComponent } from './sheq-ig/sheq-ig.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-pos';
  showSideBar= false;
}
