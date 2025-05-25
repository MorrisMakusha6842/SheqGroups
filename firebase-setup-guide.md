# Firebase Setup Guide

## Step 1: Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on "Project Settings" (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app icon `</>`
6. Copy the `firebaseConfig` object

## Step 2: Replace Configuration

Replace the placeholder values in your environment files with your actual Firebase config:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIza...", // Your actual API key
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com", 
    messagingSenderId: "123456789",
    appId: "1:123:web:abc123"
  }
};
```

## Step 3: Enable Firestore

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location

## Step 4: Enable Authentication

1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider

Your Firebase setup should now be complete!
