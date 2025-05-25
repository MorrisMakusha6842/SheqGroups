import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from } from 'rxjs';

export interface UserData {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  province: string;
  role: string;
  profilePhoto?: string;
  status: string;
  createdAt: Date;
  lastLogin?: Date;
  trainingCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // Use onAuthStateChanged instead of authState for better reliability
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        try {
          const userData = await this.fetchUserData(user.uid);
          this.currentUserSubject.next(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          this.currentUserSubject.next(null);
        }
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  get currentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  async createUserAccount(userData: Omit<UserData, 'uid'>, password: string): Promise<void> {
    try {
      console.log('Starting user creation process...');
      
      // Create Firebase Auth user
      const credential = await createUserWithEmailAndPassword(
        this.auth, 
        userData.email, 
        password
      );
      console.log('Firebase Auth user created successfully');

      if (credential.user) {
        const userDocData: UserData = {
          ...userData,
          uid: credential.user.uid,
          createdAt: new Date(),
          status: 'Active',
          trainingCompleted: false
        };

        console.log('Attempting to save user data to Firestore...');
        await this.saveUserData(credential.user.uid, userDocData);
        console.log('User data saved successfully to Firestore');
        
        this.currentUserSubject.next(userDocData);
      }
    } catch (error) {
      console.error('Detailed error creating user account:', error);
      
      // Check if it's a Firestore write error
      if (error instanceof Error && error.message.includes('firestore')) {
        throw new Error('Failed to save user data. Please check your internet connection and try again.');
      }
      
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      console.log('Starting sign in process...');
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Firebase Auth sign in successful');
      
      if (credential.user) {
        console.log('Updating last login...');
        await this.updateLastLogin(credential.user.uid);
        console.log('Last login updated successfully');
        
        const userData = await this.fetchUserData(credential.user.uid);
        this.currentUserSubject.next(userData);
      }
    } catch (error) {
      console.error('Detailed sign in error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  private async saveUserData(uid: string, userData: UserData): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      console.log('Firestore document reference created:', userDocRef.path);
      
      await setDoc(userDocRef, userData);
      console.log('setDoc completed successfully');
    } catch (error) {
      console.error('saveUserData error:', error);
      throw error;
    }
  }

  private async fetchUserData(uid: string): Promise<UserData> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      throw new Error('User data not found');
    }
  }

  private async updateLastLogin(uid: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getFirebaseUser(): Observable<User | null> {
    return authState(this.auth);
  }
}
