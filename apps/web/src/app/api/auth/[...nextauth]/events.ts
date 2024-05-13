import { EventCallbacks } from 'next-auth';
import { cookies } from 'next/headers';

const events: Partial<EventCallbacks> = {
  async signIn() {
    // account?.provider === 'credentials'
    // account?.provider === 'google'
    const cookieStore = cookies();
    cookieStore.set('isLoggedIn', 'true');
  },
  async signOut() {
    const cookieStore = cookies();
    cookieStore.delete('isLoggedIn');
  },
};

export default events;
