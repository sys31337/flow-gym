import { getServerSession } from 'next-auth';
import { options } from '@api/auth/[...nextauth]/options';
import './globals.css';
import { Inter } from 'next/font/google';
import QueryClientProvider from './Provider/QueryClientProvider';
import SessionProvider from './Provider/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({ children }: {
  children: React.ReactNode
}) => {
  const session = await getServerSession(options);
  return (
    <html lang="en" className='h-full bg-gray-100'>
      <body className={`${inter.className} h-full`}>
        <SessionProvider session={session}>
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
