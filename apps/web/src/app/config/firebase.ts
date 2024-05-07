import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDGx1mko4v_9jn6x70NgbDk42m_8kni4Hk',
  authDomain: 'flow-gym-dev.firebaseapp.com',
  projectId: 'flow-gym-dev',
  storageBucket: 'flow-gym-dev.appspot.com',
  messagingSenderId: '582548545163',
  appId: '1:582548545163:web:cd030d1c9846df5ff0fe8e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
