// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDurf6BYyWD5iPodfAtjCD6Rvby9RP1lGQ",
    authDomain: "smartcareerplanning-4f778.firebaseapp.com",
    projectId: "smartcareerplanning-4f778",
    storageBucket: "smartcareerplanning-4f778.appspot.com",
    messagingSenderId: "481802282237",
    appId: "1:481802282237:web:bd24dabe8ea9f6d5980a94",
    measurementId: "G-89CGNDR87E"
};

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase initialization error:", error);
    // If already initialized, use that one
    app = initializeApp(firebaseConfig, "smartcareerplanning-4f778");
}
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };