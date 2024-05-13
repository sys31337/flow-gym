import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest, _response: NextResponse) {
  console.log('lol!!!');
}

export const config = { matcher: '/' };
