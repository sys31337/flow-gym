import axios from 'axios';
import cfg from '@config';
import { Any } from '@repo/types/any';

const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/`, withCredentials: true });

axiosInstance.interceptors.request.use(
  async (config) => {
    addAuthHeaders(config);

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${null}`;
    }
    return config;
  },
  async (error) => {
    const isUnauthorized = error.status === 401 || error.status === 403;
    if (isUnauthorized) {
      // await signOut();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
