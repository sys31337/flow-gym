import './globals.css';
import { Inter } from 'next/font/google';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: JSX.Element
}) {
  // const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
