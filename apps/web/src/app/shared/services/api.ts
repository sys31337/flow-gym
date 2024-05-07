// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import cfg from '@config';
import { getIdToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { Any } from '@repo/types/any';
import { auth } from '../../config/firebase';

const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/` });

const getUserToken = async () => new Promise((resolve) => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdToken(user);
      resolve(token);
    } else {
      resolve(null);
    }
    unsub();
  });
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      auth.signOut();
    }
    addAuthHeaders(config);
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
