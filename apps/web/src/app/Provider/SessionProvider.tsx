'use client';

import React from 'react';
import { SessionProvider as Provider } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionProviderProps {
  session: Session | null;
  children: JSX.Element;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children, session }) => (
  <Provider session={session}>
    {children}
  </Provider>
);

export default SessionProvider;
