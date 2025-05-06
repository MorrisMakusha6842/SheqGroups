import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'currentUser';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  setCurrentUser(user: User) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  clearCurrentUser() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }
} 