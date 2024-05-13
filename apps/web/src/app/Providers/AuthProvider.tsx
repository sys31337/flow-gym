'use client';

import React, {
  createContext, useReducer, useMemo, useEffect, useContext,
  useState,
} from 'react';
import { AuthType, PayloadType, StateType } from '@repo/types/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const initialState = { user: null };

export const AuthContext = createContext<AuthType>({
  state: initialState,
  dispatch: () => ({}),
  loading: true,
});

const authReducer = (state: StateType, action: PayloadType) => {
  switch (action.type) {
    case 'SET_IS_LOGGED':
      return { ...state };
    case 'USER':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: JSX.Element
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);
  const contextValues = useMemo(() => ({ state, dispatch, loading }), [state]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        dispatch({ type: 'USER', payload: authUser });
      } else {
        dispatch({ type: 'USER', payload: null });
      }
      setLoading(false);
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
