import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { config } from '@config';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@shared/services/queryClient';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@config/theme';
import { AuthProvider } from '@shared/components/Authentication/AuthContext';
import Loading from '@shared/components/Loading';
import App from './App';

localStorage.setItem('chakra-ui-color-mode', 'light');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={config.appBaseUrl}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ChakraProvider>
    <meta name="gym-app" content={''} />
  </React.StrictMode>,
);
