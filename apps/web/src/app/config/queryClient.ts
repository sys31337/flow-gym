import {
  QueryClient,

} from '@tanstack/react-query';

const defaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    cacheTime: 100,
  },
};

const queryClient = new QueryClient({ defaultOptions });

export default queryClient;
