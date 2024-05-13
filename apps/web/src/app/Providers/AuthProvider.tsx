'use client';

import React, {
  Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import auth from '@config/firebase';
import { useGetCurrentUser } from '@api/useAuthentication';
import Loading from '@components/Loading';

interface CurrentUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  profilePicture?: string;
  providerId?: 'google.com' | 'password';
  createdAt?: Date;
  role?: 'member' | 'coach' | 'admin' | 'superadmin';
  isAdmin?: boolean;
}

interface AuthContextValue {
  user: User | null;
  setUser?: Dispatch<SetStateAction<User | null>>
  currentUser: CurrentUser;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, currentUser: {}, loading: true });

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: currentUser } = useGetCurrentUser();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value: AuthContextValue = useMemo(() => ({ user, setUser, currentUser, loading }), [user, loading]);

  return loading ? (<Loading />) : (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
