'use client';

import { User } from '@repo/types/user';
import axios from '@shared/services/api';
import { signIn, useSession } from 'next-auth/react';

const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post('/auth/refresh', { refresh: (session?.user as User).refreshToken });

    if (session) (session.user as User).accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
};

export default useRefreshToken;
