import { config as cfg } from '@config';
import axios from 'axios';

import { Any } from '@shared/types/any';


const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/` });

const getUserToken = async () => new Promise((resolve) => {
  resolve('token');
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // logout
    }
    addAuthHeaders(config);
    return config;
  },
  async (error) => {
    const isUnauthorized = error.status === 401 || error.status === 403;
    if (isUnauthorized) {
      // logout
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
