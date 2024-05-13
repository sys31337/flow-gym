import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const API_KEY = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_API_KEY;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_AUTH_DOMAIN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PROJECT_ID;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_MESSAGING_SENDER_ID;
const APP_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_APP_ID;
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_MEASUREMENT_ID;

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
