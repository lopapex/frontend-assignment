import {MutationCache, QueryCache, QueryClient} from 'react-query';
import pathnames from '../constants/pathnames';
import api from '../services/api';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';
import {getSessionStorageValue} from './useSessionStorage';
import {UserInfo} from './useUser';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

let failedRequestInfo = null;
let queryClient: QueryClient;

const getRefreshToken = () => {
  const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
  return userInfo?.refreshToken;
};

const setRefreshToken = (newToken: string) => {
  const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
  userInfo.refreshToken = newToken;
  sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
};

const handleError = async (error: any, requestInfo: any, t: any, toast: any) => {
  if (error?.response?.status === 401) {
    try {
      // Save the current query or mutation key for retry later
      failedRequestInfo = requestInfo.queryKey || requestInfo.mutationKey;

      // Try to refresh the token
      const newToken = await api.user.refreshToken({
        inlineObject: {
          refreshToken: getRefreshToken(),
        },
      });

      if (newToken.accessToken) {
        setRefreshToken(newToken.accessToken);
        // Retry the failed request by invalidating the stored key
        queryClient.invalidateQueries(failedRequestInfo);
      }
    } catch (refreshError) {
      window.location.href = pathnames.login;
      toast({
        title: t('refreshError.title'),
        description: t('refreshError.description'),
        status: 'failed',
        duration: 2000,
        isClosable: false,
      });
    }
  }
};

export const useQueryClient = () => {
  const toast = useToast();
  const {t} = useTranslation();

  queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: async (error, query) => {
        await handleError(error, query, t, toast);
      },
    }),
    mutationCache: new MutationCache({
      onError: async (error, _variables, _context, mutation) => {
        await handleError(error, mutation, t, toast);
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return queryClient;
};