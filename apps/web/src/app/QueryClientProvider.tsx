'use client';

import { QueryClientProvider as Provider } from '@tanstack/react-query';
import queryClient from '@config/queryClient';

type Props = {
  children: JSX.Element;
}

export default function QueryClientProvider({ children }: Props) {
  return (
    <Provider client={queryClient}>
      {children}
    </Provider>
  );
}
