import { checkUserExistance } from '@shared/functions/user';
import axiosInstance from '@shared/services/api';
import { useQuery, useMutation } from '@tanstack/react-query';

interface Payload {
  email: string;
  password: string;
}

interface AuthenticateWithProviderPayload {
  displayName: string | null;
  email: string | null;
  avatar: string | null;
  firebaseId: string | null;
  providerId: string | null;
}

export const useCreateAccount = () => useMutation({
  mutationFn: (payload: Payload) => axiosInstance.request({
    method: 'POST',
    url: 'users',
    data: payload,
  }),
});

export const useAuthenticateWithProvider = () => useMutation({
  mutationFn: (payload: AuthenticateWithProviderPayload) => axiosInstance.request({
    method: 'POST',
    url: 'users/provider',
    data: payload,
  }),
});

export const useCheckExistance = () => useMutation({ mutationFn: checkUserExistance });

export const useGetCurrentUser = () => useQuery({
  queryKey: ['Get current user'],
  queryFn: async () => axiosInstance
    .request({ url: 'users/current' })
    .then(({ data }) => data),
});
