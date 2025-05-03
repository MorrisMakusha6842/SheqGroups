import { ResolveStart, Routes } from '@angular/router';
import { PlayerComponent } from './sheq-ig/player/player.component';
import { SheqIgComponent } from './sheq-ig/sheq-ig.component';
import { VideoOutputComponent } from './sheq-ig/video-output/video-output.component';
import { UserManagementAComponent } from './sheq-ig/user-management-a/user-management-a.component';
import { CourseDashboardComponent } from './sheq-ig/course-dashboard/course-dashboard.component';
import { AdminSheqComponent } from './sheq-ig/admin-sheq/admin-sheq.component';
import { CourseDetailsComponent } from './sheq-ig/course-details/course-details.component';
import { HelpCenterComponent } from './sheq-ig/help-center/help-center.component';
import { AdminOverviewComponent } from './sheq-ig/admin-sheq/admin-overview/admin-overview.component';

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
    path: 'admin-sheq',
    component:AdminSheqComponent
  },
  {
    path: 'admin-overview',
    component:AdminOverviewComponent
  },
  {
    path: 'help-center',
    component:HelpCenterComponent
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
  path: 'course-details',
    component:CourseDetailsComponent
  },
  {
    path: '',
    component:SheqIgComponent
  },
  {
    path: 'course/:id',
    redirectTo: 'dashboard/course/:id',
    pathMatch: 'prefix'
  },
 
  
  ]
   
  
