import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;
  if ((pathname.startsWith('/signin') || pathname.startsWith('/signup')) && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: '/signin',
      error: '/signin',
      signOut: '/signout',
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    { source: '/((?!signup|signin).*)', missing: [{ type: 'cookie', key: 'jwt' }] },
    { source: '/signup', has: [{ type: 'cookie', key: 'jwt' }] },
    { source: '/signin', has: [{ type: 'cookie', key: 'jwt' }] },
  ],
};
