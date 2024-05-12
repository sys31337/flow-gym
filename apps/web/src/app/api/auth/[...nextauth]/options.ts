/* eslint-disable import/prefer-default-export */
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from '@shared/services/api';
import { cookies } from 'next/headers';

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
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
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await axiosInstance.request({
          method: 'POST',
          url: 'users/login',
          data: { email, password },
        });
        if (res.status === 401) return null;
        const user = await res.data;
        return user;
      },
    }),
  ],
};
