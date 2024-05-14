'use client';

import { QueryClientProvider as Provider } from '@tanstack/react-query';
import queryClient from '@config/queryClient';

type Props = {
  children: React.ReactNode;
}

const QueryClientProvider = ({ children }: Props) => (
  <Provider client={queryClient}>
    {children}
  </Provider>
);

export default QueryClientProvider;
