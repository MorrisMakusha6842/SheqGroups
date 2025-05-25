// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqACF10LhWWZrc_R9YF0vavl2-YEl3kxQ",
  authDomain: "sheq-groups.firebaseapp.com",
  projectId: "sheq-groups",
  storageBucket: "sheq-groups.firebasestorage.app",
  messagingSenderId: "512764611472",
  appId: "1:512764611472:web:bad777abf13b41c20c8115",
  measurementId: "G-DEWKKZ8QLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);