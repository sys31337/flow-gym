import config from '@config';
import { User } from '@repo/types/user';
import { JWT } from 'next-auth/jwt';

const refreshToken = async (token: JWT) => {
  const res = await fetch(`${config.api}/api/v1/users/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Refresh ${(token.user as User)?.refreshToken}`,
    },
  });
  const data = await res.json();
  return {
    ...token,
    accessToken: data.accessToken,
    accessTokenExpires: Date.now() + 20000,
    refreshToken: data.refreshToken ?? token.refreshToken, // Fall back to old refresh token
  };
};

export default refreshToken;
