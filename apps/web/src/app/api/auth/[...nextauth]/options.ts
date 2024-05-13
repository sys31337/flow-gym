import type { NextAuthOptions } from 'next-auth';
import providers from './providers';
import callbacks from './callbacks';
import events from './events';
import session from './session';

export const options: NextAuthOptions = { session, callbacks, events, providers };

export const holder = null;
