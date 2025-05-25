import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTestService {

  constructor(private firestore: Firestore) {}

  async testFirestoreConnection(): Promise<void> {
    try {
      console.log('Testing Firestore connection...');
      const testDocRef = doc(this.firestore, 'test/connection');
      await setDoc(testDocRef, { 
        timestamp: new Date(), 
        message: 'Connection test successful' 
      });
      console.log('✅ Firestore connection test passed');
    } catch (error) {
      console.error('❌ Firestore connection test failed:', error);
      throw error;
    }
  }
}
