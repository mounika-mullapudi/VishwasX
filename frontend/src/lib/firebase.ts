import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDvo-3or2b6VTYHLVDlYIs2oMnZr9eezc4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vishwasx-1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vishwasx-1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vishwasx-1.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "100000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:100000000000:web:abcdef123456",
};

export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

export const getFirebaseAuth = (): Auth => {
  return auth;
};

export default app;
