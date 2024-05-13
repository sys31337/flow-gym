'use client';

import config from '@config';

type Listener = () => void
let listeners: Listener[] = [];

const emitChange = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const listener of listeners) {
    listener();
  }
};

const tokenStore = {
  async refresh(token: string) {
    const res = await fetch(`${config.api}/api/v1/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Refresh ${token}`,
      },
    });
    const data = await res.json();
    localStorage.setItem('userData', JSON.stringify(data));
    emitChange();
    return data.accessToken;
  },
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('userData');
      if (data) return JSON.parse(data);
      return null;
    }
    return null;
  },
};

export default tokenStore;
