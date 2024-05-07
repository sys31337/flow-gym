'use client';

import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@config/queryClient';

type Props = {
  children: React.ReactNode;
  session: Session | null;
}

export default function SessionProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
