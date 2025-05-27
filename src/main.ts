import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

console.log('Initializing app with Firebase config:', environment.firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideFirebaseApp(() => {
      console.log('Initializing Firebase App...');
      const app = initializeApp(environment.firebaseConfig);
      console.log('Firebase App initialized successfully');
      return app;
    }),
    provideAuth(() => {
      console.log('Initializing Firebase Auth...');
      const auth = getAuth();
      console.log('Firebase Auth initialized successfully');
      return auth;
    }),
    provideFirestore(() => {
      console.log('Initializing Firestore...');
      const firestore = getFirestore();
      console.log('Firestore initialized successfully');
      return firestore;
    })
  ]
}).then(() => {
  console.log('Application bootstrapped successfully');
}).catch(err => {
  console.error('Bootstrap error:', err);
});
