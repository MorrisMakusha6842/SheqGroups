import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  providers: [AuthGuard],
})
export class AppComponent {
  title = 'my-pos';
}
