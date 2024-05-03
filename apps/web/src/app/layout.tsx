import { getServerSession } from 'next-auth';
import './globals.css';
import { Inter } from 'next/font/google';
import SessionProvider from './SessionProvider';
import { options } from './api/auth/[...nextauth]/options';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
