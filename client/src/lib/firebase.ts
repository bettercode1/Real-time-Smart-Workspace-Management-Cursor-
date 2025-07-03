import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration from the provided config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyAqMOqJmDLwaozc_cq5-ZSromfKtf6tFog",
  authDomain: "hotel-management-5cee0.firebaseapp.com",
  databaseURL: "https://hotel-management-5cee0-default-rtdb.firebaseio.com",
  projectId: "hotel-management-5cee0",
  storageBucket: "hotel-management-5cee0.firebasestorage.app",
  messagingSenderId: "800168036537",
  appId: "1:800168036537:web:b9b72cf54ef39853d0b368",
  measurementId: "G-E8TBL7FHYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { database, analytics };
export default app;
