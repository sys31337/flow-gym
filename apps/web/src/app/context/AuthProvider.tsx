'use client';

import React, {
  createContext, useReducer, useMemo, useEffect, useContext,
} from 'react';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { AuthType, PayloadType, StateType } from '@repo/types/auth';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const initialState = {
  user: null,
  googleSignIn: () => undefined,
  logOut: () => undefined,
  isAuthenticated: false,
  isClassicSignUp: false,
};

export const AuthContext = createContext<AuthType>({
  state: initialState,
  googleSignIn: () => undefined,
  logOut: () => undefined,
  dispatch: () => ({}),
});

const authReducer = (state: StateType, action: PayloadType) => {
  switch (action.type) {
    case 'AUTHORIZE_SIGNUP':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'SET_IS_LOGGED':
      return {
        ...state,
        isAuthenticated: action.payload as boolean,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: JSX.Element
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const contextValues = useMemo(() => ({ state, dispatch, googleSignIn, logOut }), [state]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        dispatch({ type: 'SET_IS_LOGGED', payload: true });
        dispatch({ type: 'USER', payload: authUser });
      } else {
        dispatch({ type: 'SET_IS_LOGGED', payload: false });
        dispatch({ type: 'USER', payload: null });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
