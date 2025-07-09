// Quick Firebase connection test
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqMOqJmDLwaozc_cq5-ZSromfKtf6tFog",
  authDomain: "hotel-management-5cee0.firebaseapp.com",
  databaseURL: "https://hotel-management-5cee0-default-rtdb.firebaseio.com",
  projectId: "hotel-management-5cee0",
  storageBucket: "hotel-management-5cee0.firebasestorage.app",
  messagingSenderId: "800168036537",
  appId: "1:800168036537:web:b9b72cf54ef39853d0b368",
  measurementId: "G-E8TBL7FHYM"
};

try {
  console.log('🔥 Testing Firebase Connection...');
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  console.log('✅ Firebase App initialized successfully');
  console.log('✅ Auth service connected');
  console.log('✅ Firestore service connected');
  console.log('📊 Project ID:', firebaseConfig.projectId);
  console.log('🔐 Auth Domain:', firebaseConfig.authDomain);
  console.log('🌍 Connection Status: READY');
  
} catch (error) {
  console.error('❌ Firebase Connection Error:', error.message);
}