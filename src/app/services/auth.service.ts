import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, RoleName, UserStatus } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

interface LoginCredentials {
  email: string;
  password: string;
}
 
interface AuthState {
  user: User | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'authState';
  private readonly MOCK_USERS: User[] = [
    {
      id: '1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@fundo-isms.com',
      role: RoleName.ADMIN,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      firstName: 'Manager',
      lastName: 'User',
      email: 'manager@fundo-isms.com',
      role: RoleName.MANAGER,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private authStateSubject: BehaviorSubject<AuthState>;

  constructor() {
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    const initialState: AuthState = savedState 
      ? JSON.parse(savedState)
      : { user: null, token: null };
    
    this.authStateSubject = new BehaviorSubject<AuthState>(initialState);
  }

  get currentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  get isAuthenticated(): boolean {
    return !!this.authStateSubject.value.token;
  }

  get authState$(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  login(credentials: LoginCredentials): Observable<User> {
    // For development, accept any email that matches our mock users
    const user = this.MOCK_USERS.find(u => u.email === credentials.email);

    if (!user) {
      return throwError(() => new Error('Invalid credentials'));
    }

    // Generate mock JWT token
    const token = `mock-jwt-${uuidv4()}`;
    
    // Update auth state
    const newState: AuthState = { user, token };
    this.authStateSubject.next(newState);
    
    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newState));

    return of(user);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.authStateSubject.next({ user: null, token: null });
  }

  // Development helper to check permissions
  hasPermission(resource: string, action: string): boolean {
    const user = this.currentUser;
    if (!user) return false;

    // For development, use simplified permission check
    switch (user.role) {
      case RoleName.ADMIN:
        return true; // Admin has all permissions
      case RoleName.MANAGER:
        return ['users', 'inventory', 'orders'].includes(resource);
      case RoleName.WAREHOUSE_STAFF:
        return resource === 'inventory';
      case RoleName.SALES_REP:
        return resource === 'orders';
      case RoleName.SUPPLIER:
        return resource === 'inventory' && action === 'read';
      case RoleName.VIEWER:
        return action === 'read';
      default:
        return false;
    }
  }

  // Helper to check if user has a specific role
  hasRole(role: RoleName): boolean {
    return this.currentUser?.role === role;
  }
}
