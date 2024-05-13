import axios from 'axios';
import cfg from '@config';
import { getSession, signOut } from 'next-auth/react';
import { Any } from '@repo/types/any';
import { User } from '@repo/types/user';
import tokenStore from './tokenStore';

const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/`, withCredentials: true });

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    addAuthHeaders(config);

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${(session?.user as User)?.accessToken}`;
    }
    return config;
  },
  async (error) => {
    const isUnauthorized = error.status === 401 || error.status === 403;
    if (isUnauthorized) {
      await signOut();
    }

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const session = await getSession();
      const user = session?.user as User;
      const newToken = await tokenStore.refresh(user?.refreshToken);
      prevRequest.headers.Authorization = `Bearer ${newToken}`;
      (session?.user as User).accessToken = newToken;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
