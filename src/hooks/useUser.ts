import {useMutation} from 'react-query';
import api from '../services/api';
import {Tokens, User} from '../api/generated';
import { useUserStorage } from './useUserStorage';

export type UserInfo = {
  username: string;
} & Tokens;

export const useRegisterMutation = () => {
  const {onLogin} = useUserStorage();
  return useMutation<UserInfo, unknown, User>(
    ['register'],
    async (user: User) => {
      const data = await api.user.registerUser({
        user,
      });
      return {
        ...data,
        username: user.username,
      } as UserInfo;
    },
    {
      onSuccess: onLogin,
    }
  );
};

export const useLoginMutation = () => {
  const {onLogin} = useUserStorage();
  return useMutation<UserInfo, unknown, User>(
    ['login'],
    async (user: User) => {
      const data = await api.user.loginUser({
        user,
      });
      return {
        ...data,
        username: user.username,
      };
    },
    {
      onSuccess: onLogin,
    }
  );
}
