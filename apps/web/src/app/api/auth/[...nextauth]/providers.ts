import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from '@shared/services/api';

const GOOGLE_AUTHORIZATION_URL = `https://accounts.google.com/o/oauth2/v2/auth?${
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  })}`;

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorizationUrl: GOOGLE_AUTHORIZATION_URL,
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
];

export default providers;
