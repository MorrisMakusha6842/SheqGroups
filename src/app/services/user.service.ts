import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, orderBy, limit, addDoc, writeBatch } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  getUser(uid: string): Observable<any> {
    return from(this.fetchUser(uid));
  }

  private async fetchUser(uid: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  async updateUser(uid: string, data: any): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return updateDoc(userDocRef, data);
  }

  // Get all users for the user directory table
  getAllUsers(): Observable<any[]> {
    return from(this.fetchAllUsers());
  }

  private async fetchAllUsers(): Promise<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Get user registration requests (pending approval)
  getUserRegistrationRequests(): Observable<any[]> {
    return from(this.fetchUserRegistrationRequests());
  }

  private async fetchUserRegistrationRequests(): Promise<any[]> {
    const requestsCollection = collection(this.firestore, 'userRegistrationRequests');
    const q = query(requestsCollection, where('status', '==', 'pending'));
    const requestsSnapshot = await getDocs(q);
    return requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Get user activity updates
  getUserActivityUpdates(): Observable<any[]> {
    return from(this.fetchUserActivityUpdates());
  }

  private async fetchUserActivityUpdates(): Promise<any[]> {
    const activitiesCollection = collection(this.firestore, 'userActivities');
    const q = query(activitiesCollection, orderBy('timestamp', 'desc'), limit(50));
    const activitiesSnapshot = await getDocs(q);
    return activitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Create new user
  async createUser(userData: any): Promise<any> {
    const usersCollection = collection(this.firestore, 'users');
    return addDoc(usersCollection, userData);
  }

  // Create new user with specific UID (for auth integration)
  async createUserWithUid(uid: string, userData: any): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userDocRef, userData);
  }

  // Approve user registration
  async approveUserRegistration(requestId: string, userData: any): Promise<void> {
    const batch = writeBatch(this.firestore);
    
    // Add to users collection
    const userRef = doc(this.firestore, 'users', requestId);
    batch.set(userRef, userData);
    
    // Update request status
    const requestRef = doc(this.firestore, 'userRegistrationRequests', requestId);
    batch.update(requestRef, { status: 'approved', approvedAt: new Date() });
    
    return batch.commit();
  }

  // Get users by province
  getUsersByProvince(province: string): Observable<any[]> {
    if (province === 'All Provinces') {
      return this.getAllUsers();
    }
    return from(this.fetchUsersByProvince(province));
  }

  private async fetchUsersByProvince(province: string): Promise<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('province', '==', province));
    const usersSnapshot = await getDocs(q);
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Get user metrics
  getUserMetrics(): Observable<any> {
    return this.getAllUsers().pipe(
      map(users => ({
        totalActiveUsers: users.filter(u => u.status === 'Active').length,
        totalUsers: users.length,
        completedUsers: users.filter(u => u.trainingCompleted === true).length
      }))
    );
  }
}
