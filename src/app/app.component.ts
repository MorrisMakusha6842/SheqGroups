import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ToastComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  `,
  styleUrls: ['./app.component.scss'],
  providers: [AuthGuard],
})
export class AppComponent implements OnInit {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Log navigation events for debugging
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Navigation completed to:', event.url);
    });

    // Handle initial route based on auth state from Firestore
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      const currentRoute = this.router.url;
      console.log('App init - Current route:', currentRoute, 'User:', user ? user.email : 'No user');
      
      // If user is authenticated and on login page, they can stay or manually navigate
      if (user && this.authService.isAuthenticated() && (currentRoute === '/log-in' || currentRoute === '/login' || currentRoute === '/')) {
        console.log('Authenticated user on login page - letting them choose to continue');
        // Don't auto-redirect, let user manually continue
      }
      // If user is not authenticated and not on login/register pages, redirect to login
      else if (!user && !currentRoute.includes('log-in') && !currentRoute.includes('create-user-account')) {
        console.log('Unauthenticated user, redirecting to login');
        this.router.navigate(['/log-in'], { replaceUrl: true });
      }
    });
  }
}
