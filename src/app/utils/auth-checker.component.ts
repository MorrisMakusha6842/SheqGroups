import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-checker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg max-w-sm">
      <h3 class="font-bold mb-2">Authentication Status</h3>
      <div class="text-sm space-y-1">
        <div>🔐 Auth Service: {{ isAuthenticated ? 'Logged In' : 'Not Logged In' }}</div>
        <div>👤 User: {{ userEmail || 'None' }}</div>
        <div>🔥 Firebase: {{ firebaseStatus }}</div>
        <div>💾 LocalStorage: {{ localStorageStatus }}</div>
        <button 
          (click)="refresh()"
          class="bg-blue-600 px-2 py-1 rounded text-xs mt-2">
          Refresh
        </button>
      </div>
    </div>
  `
})
export class AuthCheckerComponent implements OnInit {
  isAuthenticated = false;
  userEmail = '';
  firebaseStatus = 'Checking...';
  localStorageStatus = 'Checking...';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    // Check AuthService
    this.isAuthenticated = this.authService.isAuthenticated();
    const currentUser = this.authService.getCurrentUser();
    this.userEmail = currentUser?.email || '';

    // Check Firebase Auth
    try {
      const firebaseUser = await this.authService.checkFirebaseAuthState();
      this.firebaseStatus = firebaseUser ? `✅ ${firebaseUser.email}` : '❌ Not signed in';
    } catch (error) {
      this.firebaseStatus = '❌ Error checking';
    }

    // Check localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.localStorageStatus = storedUser ? '✅ Data found' : '❌ No data';

    // Debug output
    this.authService.getDetailedAuthStatus();
  }
}
