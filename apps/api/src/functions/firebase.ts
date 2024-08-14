import { FirebaseError } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

export const createFirebaseUser = async (payload: { email: string, password: string }) => {
  const { email, password } = payload;
  try {
    const firebaseUser = await getAuth().createUser({ email, password });
    return firebaseUser.uid;
  } catch (err) {
    const error = err as FirebaseError;
    if (error.code === 'auth/email-already-exists') {
      const user = await getAuth().getUserByEmail(email);
      await getAuth().updateUser(user.uid, { email, password });
      return user.uid;
    }
    return '';
  }
};

export const holder = '';
