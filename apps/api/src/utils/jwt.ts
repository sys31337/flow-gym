/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

export const generateTokens = (payload: { email: string;[key: string]: string | number }) => ({
  accessToken: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '20s' }),
  refreshToken: jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: '7d' }),
  expiresIn: new Date().setTime(new Date().getTime() + 20 * 1000),
});
