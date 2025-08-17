// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v9-compat and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA4h7dds4fQHEmU4SW1NHxDKXNblRkd9s",
  authDomain: "eshop-14199.firebaseapp.com",
  projectId: "eshop-14199",
  storageBucket: "eshop-14199.firebasestorage.app",
  messagingSenderId: "662907987776",
  appId: "1:662907987776:web:7688da97926aebcee93ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
