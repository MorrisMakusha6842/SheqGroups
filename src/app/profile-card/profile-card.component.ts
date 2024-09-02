import { Component } from '@angular/core';
import { BioComponent } from './bio/bio.component';
import { ViewsComponent } from './views/views.component';
import { PositionComponent } from './position/position.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    BioComponent,
    ViewsComponent,
    PositionComponent
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
 myView: string='Bio';
}
