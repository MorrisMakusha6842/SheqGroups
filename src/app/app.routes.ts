import { ResolveStart, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PlayerComponent } from './sheq-ig/player/player.component';
import { SheqIgComponent } from './sheq-ig/sheq-ig.component';
import { VideoOutputComponent } from './sheq-ig/video-output/video-output.component';
import { UserManagementAComponent } from './sheq-ig/user-management-a/user-management-a.component';
import { CourseDashboardComponent } from './sheq-ig/course-dashboard/course-dashboard.component';
import { AdminSheqComponent } from './sheq-ig/admin-sheq/admin-sheq.component';
import { CourseDetailsComponent } from './sheq-ig/course-details/course-details.component';
import { HelpCenterComponent } from './sheq-ig/help-center/help-center.component';
import { AdminOverviewComponent } from './sheq-ig/admin-sheq/admin-overview/admin-overview.component';
import { EmployeeDashboardComponent } from './sheq-ig/employee-dashboard/employee-dashboard.component';
import { NotificationsComponent } from './sheq-ig/notifications/notifications.component';
import { FundoIsmsComponent } from './fundo-isms/fundo-isms.component';
import { LandingPageComponent } from './fundo-isms/landing-page/landing-page.component';
import { DashboardComponent } from './fundo-isms/dashboard/dashboard.component';
import { AnalyticsComponent } from './fundo-isms/analytics/analytics/analytics.component';
import { InventoryComponent } from './fundo-isms/inventory/inventory.component';
import { BinCountsComponent } from './fundo-isms/inventory/bin-counts/bin-counts.component';
import { StockAdjustmentsComponent } from './fundo-isms/inventory/stock-adjustments/stock-adjustments.component';
import { StockOverviewComponent } from './fundo-isms/inventory/stock-overview/stock-overview.component';
import { WarehouseComponent } from './fundo-isms/inventory/warehouse/warehouse.component';
import { AdminDashboardComponent } from './sheq-ig/admin-dashboard/admin-dashboard.component';
import { CourseManagementComponent } from './sheq-ig/admin-dashboard/course-management/course-management.component';
import { ScheduleComponent } from './sheq-ig/schedule/schedule.component';
import { GetStartedComponent } from './sheq-ig/get-started/get-started.component';
import { CreateUserAccountComponent } from './sheq-ig/create-user-account/create-user-account.component';
import { LogInComponent } from './sheq-ig/log-in/log-in.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadComponent: () => import('./sheq-ig/log-in/log-in.component').then(m => m.LogInComponent)
  },
  {
    path: 'create-user-account',
    loadComponent: () => import('./sheq-ig/create-user-account/create-user-account.component').then(m => m.CreateUserAccountComponent)
  },
  {
    path: 'course-dashboard',
    loadComponent: () => import('./sheq-ig/course-dashboard/course-dashboard.component').then(m => m.CourseDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    loadComponent: () => import('./fundo-isms/analytics/analytics/analytics.component').then(m => m.AnalyticsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'course/:id',
    component: VideoOutputComponent
  },
  {
    path: 'admin-sheq',
    component: AdminSheqComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'get-started',
    component: GetStartedComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'bin-counts',
    component: BinCountsComponent
  },
  {
    path: 'stock-adjustments',
    component: StockAdjustmentsComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'stock-overview',
    component: StockOverviewComponent
  },
  {
    path: 'warehouse',
    component: WarehouseComponent
  },
  {
    path: 'admin-overview',
    component: AdminOverviewComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'fundo-isms',
    component: FundoIsmsComponent
  },
  {
    path: 'help-center',
    component: HelpCenterComponent
  },
  {
    path: 'user-management-a',
    component: UserManagementAComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'course-details',
    component: CourseDetailsComponent
  },
  {
    path: 'course-management',
    component: CourseManagementComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path: 'sheq-ig',
    component: SheqIgComponent
  },
  {
    path: 'course/:id',
    redirectTo: 'dashboard/course/:id',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: '/log-in'
  }
];


