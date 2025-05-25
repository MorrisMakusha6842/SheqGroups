import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  submitted = false;
  loading = false;
  loginError: string = '';
  
  user = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit(form: NgForm) {
    this.submitted = true;
    this.loginError = '';
    
    if (form.valid) {
      this.loading = true;
      
      try {
        const { email, password } = this.user;
        
        if (!email || !password) {
          this.loginError = 'Please enter your email and password.';
          return;
        }

        await this.authService.signIn(email, password);
        this.navigateToDashboard();
        
      } catch (error: any) {
        this.loginError = this.getErrorMessage(error);
        console.error('Login error:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      default:
        return 'An error occurred during login. Please try again.';
    }
  }

  private navigateToDashboard() {
    this.router.navigate(['/course-dashboard']);
  }

  navigateTo(route: string): void {
    if (route === 'CreateAccount') {
      this.router.navigateByUrl('/create-user-account');
    }
  }
}
