import {useMutation} from '@tanstack/react-query';
import axios from '../utils/axios';
import {Tokens, User, UserInfo} from '../types/user';
import {API_ENDPOINTS} from '../constants/api';
import {useNavigate} from 'react-router-dom';
import {
  getSessionStorageValue,
  removeSessionStorageValue,
  setSessionStorageValue,
} from '../utils/sessionStorageHelpers';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';
import pathnames from '../constants/pathnames';

export const refreshToken = async (refreshToken: string) => {
  const {data} = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {refreshToken: refreshToken!});
  return data;
};

export const useRegisterMutation = () => {
  const {onLogin} = useUser();

  return useMutation({
    mutationFn: async (user: User) => {
      const {data} = await axios.post<Tokens>(API_ENDPOINTS.REGISTER, user);

      return {
        ...data,
        username: user.username,
      } as UserInfo;
    },
    onSuccess: onLogin,
  });
};

export const useLoginMutation = () => {
  const {onLogin} = useUser();

  return useMutation({
    mutationFn: async (user: User) => {
      const {data} = await axios.post<Tokens>(API_ENDPOINTS.LOGIN, user);

      return {
        ...data,
        username: user.username,
      } as UserInfo;
    },
    onSuccess: onLogin,
  });
};

export const useUser = () => {
  const navigate = useNavigate();

  const getUser = () => {
    const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
    return userInfo;
  };

  const setUser = (data: UserInfo) => {
    data.accessToken = data.accessToken;
    setSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, data);
  };

  const removeUser = () => {
    removeSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO);
  };

  const onLogin = (data: UserInfo) => {
    setUser(data);
    navigate(pathnames.home);
  };

  const onLogout = () => {
    removeUser();
    navigate(pathnames.login);
  };
  return {
    getUser,
    onLogin,
    onLogout,
  };
};
