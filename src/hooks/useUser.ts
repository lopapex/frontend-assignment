import {useMutation} from '@tanstack/react-query';
import axios from '../components/utils/axios';
import { Tokens, User, UserInfo } from '../components/types/user';
import { API_ENDPOINTS } from '../constants/api';

export const refreshToken = async (refreshToken: string) => {
  const {data} = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {refreshToken: refreshToken!});
  return data;
};

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (user: User) => {
      const {data} = await axios.post<Tokens>(API_ENDPOINTS.REGISTER, user);

      return {
        ...data,
        username: user.username,
      } as UserInfo;
    },
  });

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (user: User) => {
      const {data} = await axios.post<Tokens>(API_ENDPOINTS.LOGIN, user);

      return {
        ...data,
        username: user.username,
      } as UserInfo;
    },
  });
