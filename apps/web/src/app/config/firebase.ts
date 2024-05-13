import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const API_KEY = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_API_KEY;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_AUTH_DOMAIN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PROJECT_ID;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_MESSAGING_SENDER_ID;
const APP_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_APP_ID;
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_MEASUREMENT_ID;

const firebase = initializeApp(
  {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  },
);

const auth = getAuth(firebase);

export default auth;
