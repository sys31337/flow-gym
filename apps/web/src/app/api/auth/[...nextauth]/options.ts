/* eslint-disable import/prefer-default-export */
// import { getCurrentUser } from '@shared/functions/user';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  callbacks: {
    async signIn() {
      // console.log(JSON.stringify(s));
      // console.log('qsd3', account?.id_token);
      // const cur = await getCurrentUser(account?.id_token);
      return true;
    },
  },
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
