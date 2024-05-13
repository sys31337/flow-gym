'use client';

import * as React from 'react';
import { AuthContext, User } from './Context';

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => (
  <AuthContext.Provider value={{ user }}>
    {children}
  </AuthContext.Provider>
);
