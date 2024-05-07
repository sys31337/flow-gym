import axiosInstance from '@shared/services/api';

export const getCurrentUser = () => axiosInstance
  .request({ url: 'users/current' })
  .then(({ data }) => data);

export const holder = '';
