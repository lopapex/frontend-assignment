import {Mutation, Query, QueryKey} from '@tanstack/react-query';
import {
  getSessionStorageValue,
  removeSessionStorageValue,
  setSessionStorageValue,
} from './sessionStorageHelpers';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';
import {refreshToken} from '../hooks/useUser';
import {AxiosError} from 'axios';
import pathnames from '../constants/pathnames';
import { UserInfo } from '../types/user';

export type IErrorResponse = {
  message: string;
}

const getUserInfo = () => {
  const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
  return userInfo;
};

const setAccessToken = (newToken: string) => {
  const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
  userInfo.accessToken = newToken;
  setSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
};

type QueueItem = {
  query?: Query<unknown, unknown, unknown, QueryKey>;
  mutation?: Mutation<unknown, unknown, unknown, unknown>;
  variables?: unknown;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processFailedQueue = () => {
  failedQueue.forEach(({query, mutation, variables}) => {
    if (mutation) {
      const {options} = mutation;
      mutation.setOptions(options);
      mutation.execute(variables);
    }
    if (query) {
      query.fetch();
    }
  });
  isRefreshing = false;
  failedQueue = [];
};

const refreshTokenAndRetry = async (
  query?: Query<unknown, unknown, unknown, QueryKey>,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  try {
    if (!isRefreshing) {
      isRefreshing = true;
      failedQueue.push({ query, mutation, variables });
      const {accessToken} = await refreshToken(getUserInfo().refreshToken);
      setAccessToken(accessToken as string);
      processFailedQueue();
    } else failedQueue.push({ query, mutation, variables });
  } catch {
    removeSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO);
    window.location.href = pathnames.login;
  }
};

const errorHandler = (
  error: any,
  query?: Query<unknown, unknown, unknown, QueryKey>,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  const {status, data} = (error as AxiosError<IErrorResponse>).response!;

  if (status === 401) {
    if (mutation) refreshTokenAndRetry(undefined, mutation, variables);
    else refreshTokenAndRetry(query);
  } else {
    console.error(data);
    removeSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO);
    window.location.href = pathnames.login;
  };
};

export const queryErrorHandler = (
  error: unknown,
  query: Query<unknown, unknown, unknown, QueryKey>
) => {
  errorHandler(error, query);
};

export const mutationErrorHandler = (
  error: unknown,
  variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  errorHandler(error, undefined, mutation, variables);
};
