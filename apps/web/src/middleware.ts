import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  console.log('lol!!!');
}

export const config = {
  matcher: '/',
};
