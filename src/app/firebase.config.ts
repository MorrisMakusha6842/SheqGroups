import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKty1JBD2UwstoaivpEejjBHLZLA6Ugl0",
  authDomain: "sheqig-1147e.firebaseapp.com",
  projectId: "sheqig-1147e",
  storageBucket: "sheqig-1147e.firebasestorage.app",
  messagingSenderId: "418695320150",
  appId: "1:418695320150:web:85731b10e0441c5305e1f7",
  measurementId: "G-3FD8S59HMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const myFirebaseApp = app;