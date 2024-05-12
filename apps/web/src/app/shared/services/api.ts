// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import cfg from '@config';
import { signOut } from 'next-auth/react';
import { Any } from '@repo/types/any';

const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/`, withCredentials: true });

axiosInstance.interceptors.request.use(
  async (config) => {
    addAuthHeaders(config);
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

export default axiosInstance;
