import './globals.css';
import { Inter } from 'next/font/google';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: {
  children: React.ReactNode
}) => (
  <html lang="en" className='h-full bg-gray-100'>
    <body className={`${inter.className} h-full`}>
      <QueryClientProvider>
        {children}
      </QueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
