import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut as fbSignOut,
} from 'firebase/auth';
import { User } from '@repo/types/user';
import { auth } from '../config/firebase';

interface IError {
  response: {
    status: number;
    data?: {
      message: string;
    }
  }
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mustSignUp, setMustSignUp] = useState(false);
  const [mustVerify, setMustVerify] = useState(false);

  const checkUser = async () => {
    setLoading(true);
    try {
      // const response = await apiFetch.get('/v1/users/currentUser');
      // setAuthUser(response.data);
      setLoading(false);
    } catch (error: unknown) {
      if ((error as IError).response?.status === 404) {
        setMustSignUp(true);
      } else if ((error as IError).response?.status === 401 && (error as IError).response?.data?.message === 'NOT-VERIFIED') {
        setMustVerify(true);
      } else {
        setMustSignUp(false);
        setMustVerify(false);
      }
      setAuthUser(null);
      setLoading(false);
    }
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
    setMustSignUp(false);
  };

  const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => {
    fbSignOut(auth).then(clear);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authState) => {
      if (!authState) {
        setAuthUser(null);
        setLoading(false);
      } else {
        checkUser();
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user: authUser,
    loading,
    mustSignUp,
    mustVerify,
    setUser: setAuthUser,
    signInWithEmailAndPassword: signIn,
    createUserWithEmailAndPassword: signUp,
    signOut,
  };
}
