// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnuIvpQOPYNp5wN6GQkf1-z9ntJyF85e4",
  authDomain: "pomodoro-7c5c8.firebaseapp.com",
  projectId: "pomodoro-7c5c8",
  storageBucket: "pomodoro-7c5c8.appspot.com",
  messagingSenderId: "670837134867",
  appId: "1:670837134867:web:1244005c3a31f714dcd1e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);

export const googleAuth = new GoogleAuthProvider();
