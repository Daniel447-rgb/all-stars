import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';

// Authorized admin email configured securely in environment variable or backend
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'dadekunle226@gmail.com').trim().toLowerCase();

// Retrieve saved config or Vite environment variables
export const getStoredFirebaseConfig = () => {
  const customConfig = localStorage.getItem('allstars_firebase_config');
  if (customConfig) {
    try {
      return JSON.parse(customConfig);
    } catch {
      // ignore
    }
  }

  // Vite env defaults
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };
};

let app = null;
let auth = null;
let db = null;

export const initFirebase = (config = getStoredFirebaseConfig()) => {
  if (!config || !config.apiKey) {
    return { app: null, auth: null, db: null, isConfigured: false };
  }

  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db, isConfigured: true };
  } catch (error) {
    console.warn('Firebase init warning:', error);
    return { app: null, auth: null, db: null, isConfigured: false, error };
  }
};

// Initial run
initFirebase();

export { app, auth, db };

export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error('Firebase Auth not configured yet. Please configure your Firebase credentials in Admin Settings.');
  }
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const signInAdminEmail = async (email, password) => {
  if (!auth) {
    throw new Error('Firebase Auth not configured yet. Please configure your Firebase credentials in Admin Settings.');
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOutAdmin = async () => {
  if (auth) {
    await firebaseSignOut(auth);
  }
};

export const checkIsAdmin = (user) => {
  if (!user || !user.email) return false;
  return user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
};
