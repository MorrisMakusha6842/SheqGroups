// Import core Firebase and services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyD4qUpThhIyB4I24bHXJvFDCa-v_f_XNts",
    authDomain: "fundo-5fdc5.firebaseapp.com",
    projectId: "fundo-5fdc5",
    storageBucket: "fundo-5fdc5.firebasestorage.app", // This format is correct for newer Firebase projects
    messagingSenderId: "948380954724",
    appId: "1:948380954724:web:6bf99f61ff9a6a4575ef71"
  }
};
