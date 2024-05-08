import { getCurrentUser } from '@shared/functions/user';
import axiosInstance from '@shared/services/api';
import { useQuery, useMutation } from '@tanstack/react-query';

interface Payload {
  email: string;
  password: string;
}

export const useCreateAccount = () => useMutation({
  mutationFn: (payload: Payload) => axiosInstance.request({
    method: 'POST',
    url: 'users',
    data: payload,
  }),
});

export const useGetCurrentUser = () => useQuery({
  queryKey: ['get current user'],
  queryFn: () => getCurrentUser,
});
