import Axios from 'axios';
import {getSessionStorageValue} from './sessionStorageHelpers';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';
import {BASE_URL} from '../constants/api';
import {UserInfo} from '../types/user';

export const axios = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(config => {
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Timezone-Val'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
    const token = userInfo?.accessToken;
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axios;
