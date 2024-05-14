import type { NextRequest, NextResponse } from 'next/server';
import { log } from '@repo/utils';

export function middleware(_request: NextRequest, _response: NextResponse) {
  log('lol!!!');
}

export const config = { matcher: '/' };
