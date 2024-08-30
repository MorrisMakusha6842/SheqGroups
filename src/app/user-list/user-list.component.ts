import { Component } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users:any[]=[
    {
      name:'Sarah Parkesh',
      position:'I.T',
      imageUrl:'assets/images/moslim.jfif',
      admin: true
    },
    {
      name:'Durai Churu',
      position:'Supervisor',
      systemAdmin: true,
      supervisor: true,

    },
    {
      name:'Kate Williams',
      position:'I.T',
      imageUrl:'assets/images/white-dude-02.webp',
      client: true,
    },
    {
      name:'Peter Griffin',
      position:'I.T',
      imageUrl:'assets/images/white-dude.webp',
      siteManager: true,
    },
    {
      name:'Kuziva Makusha',
      position:'I.T',
      imageUrl:'assets/images/black-dude-01.jpg',
      admin: true,
    },
    {
      name:'Scott Adkins',
      position:'I.T',
      admin: true,
    },
    {
      name:'John Travolta',
      position:'I.T',
      security: true,
    },

  ];


}
