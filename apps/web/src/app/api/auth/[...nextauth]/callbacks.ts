import { Account, CallbacksOptions, Profile } from 'next-auth';
import refreshToken from './refreshToken';

const callbacks: Partial<CallbacksOptions<Profile, Account>> = {
  async jwt({
    token, user, trigger, session, account,
  }) {
    console.log(account);
    if (user) { token.user = user; }
    if (trigger === 'update' && session) {
      token = { ...token, user: session };
      return token;
    }
    return refreshToken(token);
  },
  async session({ session, token }) {
    session.user = token;
    return session;
  },
};

export default callbacks;
