import { ResolveStart, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { PlayerComponent } from './sheq-ig/player/player.component';
import { SheqIgComponent } from './sheq-ig/sheq-ig.component';
import { VideoOutputComponent } from './sheq-ig/video-output/video-output.component';
import { UserManagementAComponent } from './sheq-ig/user-management-a/user-management-a.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';

export const routes: Routes = [
  
  {
    path: 'course/:id',
    component:VideoOutputComponent
  },
  {
    path: 'course-dashboard',
    component:CourseDashboardComponent
  },
  {
    path: 'user-management-a',
    component:UserManagementAComponent
  },
  {
    path: 'player',
    component:PlayerComponent
  },
  {
    path: '',
    component:SheqIgComponent
  },
  
  
  ]
   
  
