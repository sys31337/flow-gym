/* eslint-disable import/prefer-default-export */
// import { getCurrentUser } from '@shared/functions/user';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from '@shared/services/api';
import { cookies } from 'next/headers';

export const options: NextAuthOptions = {
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        // return profile?.email_verified && profile?.email?.endsWith('@example.com');
        if (!profile) return false;
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  events: {
    async signOut() {
      const cookieStore = cookies();
      cookieStore.delete('jwt');
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
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        try {
          const cookieStore = cookies();
          const { email, password } = credentials || {};
          const res = await axiosInstance.request({
            withCredentials: true,
            method: 'POST',
            url: 'users/login',
            data: { email, password },
          });
          const cookie = (res.headers['set-cookie'] as string[])
            .find((c) => c.includes('jwt'))
            ?.match('^jwt=(.+?);')
            ?.[1];
          if (cookie) cookieStore.set('jwt', cookie);
          return res.data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};
