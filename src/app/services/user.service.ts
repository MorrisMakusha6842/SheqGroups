import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, orderBy, limit, addDoc, writeBatch } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {
    console.log('UserService initialized with Firestore:', !!this.firestore);
  }

  getUser(uid: string): Observable<any> {
    console.log('Getting user data for UID:', uid);
    return from(this.fetchUser(uid)).pipe(
      catchError(error => {
        console.error('Error getting user:', error);
        throw error;
      })
    );
  }

  private async fetchUser(uid: string): Promise<any> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log('User data fetched successfully for:', uid);
        return { id: userDoc.id, ...data };
      } else {
        console.log('No user document found for:', uid);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      throw error;
    }
  }

  async updateUser(uid: string, data: any): Promise<void> {
    try {
      console.log('Updating user:', uid, 'with data:', data);
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  getAllUsers(): Observable<any[]> {
    console.log('Fetching all users');
    return from(this.fetchAllUsers()).pipe(
      catchError(error => {
        console.error('Error getting all users:', error);
        throw error;
      })
    );
  }

  private async fetchAllUsers(): Promise<any[]> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched', users.length, 'users');
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
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
    try {
      console.log('Creating user document with UID:', uid);
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, {
        ...userData,
        createdAt: userData.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log('User document created successfully');
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
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
