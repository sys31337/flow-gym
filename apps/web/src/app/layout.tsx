import './globals.css';
import { Inter } from 'next/font/google';
import QueryClientProvider from '@providers/QueryClientProvider';
import AuthProvider from '@providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({ children }: {
  children: JSX.Element
}) => (
  <html lang="en" className='h-full bg-gray-100'>
    <body className={`${inter.className} h-full`}>
      <QueryClientProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
