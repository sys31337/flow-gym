import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: '/login',
    },
  });

  return authMiddleware(req, event);
}
