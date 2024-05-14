import axiosInstance from '@services/api';

export const getCurrentUser = () => axiosInstance
  .request({ withCredentials: true, url: 'users/current' })
  .then(({ data }) => data);

export const checkUserExistance = (email: string) => axiosInstance
  .request({
    method: 'POST',
    url: 'users/existance',
    data: { email },
  }).then(({ data }) => data);
