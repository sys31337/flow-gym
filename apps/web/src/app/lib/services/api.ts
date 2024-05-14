import axios from 'axios';
import cfg from '@config';
import { Any } from '@repo/types/any';
import { auth } from '@config/firebase';
import { signOut } from 'firebase/auth';

const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/`, withCredentials: true });

axiosInstance.interceptors.request.use(
  async (config) => {
    addAuthHeaders(config);
    const token = await auth.currentUser?.getIdToken();
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    const isUnauthorized = error.status === 401 || error.status === 403;
    if (isUnauthorized) {
      await signOut(auth);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
