import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './sheq-ig/log-in/log-in.component';
import { CreateUserAccountComponent } from './sheq-ig/create-user-account/create-user-account.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'create-account', component: CreateUserAccountComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
