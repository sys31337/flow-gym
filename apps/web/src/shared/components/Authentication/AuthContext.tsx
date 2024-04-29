/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch, SetStateAction, createContext, useContext, useState,
} from 'react';

interface AuthContextValue {
  user: null;
  currentUser: { [key: string]: string } | null;
  setUser?: Dispatch<SetStateAction<null>>;
}

const AuthContext = createContext<AuthContextValue>({ user: null, currentUser: { firstname: '', lastname: '', email: '' } });

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<null>(null);
  const currentUser = null;

  const value: AuthContextValue = { user, currentUser, setUser } || {};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
