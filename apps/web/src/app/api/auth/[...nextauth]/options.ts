/* eslint-disable import/prefer-default-export */
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  pages: { signIn: '/login' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials): Promise<{ id: string; name: string; password: string; image: string; } | null> {
        const user = {
          id: '42', name: 'Dave', password: '1234', image: 'default.png',
        };
        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        }
        return null;
      },
    }),
  ],
};
