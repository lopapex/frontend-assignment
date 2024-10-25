import {createContext, ReactElement, useContext} from 'react';
import { getSessionStorageValue, removeSessionStorageValue, setSessionStorageValue } from '../components/utils/sessionStorageHelpers';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';
import { useNavigate } from 'react-router-dom';
import pathnames from '../constants/pathnames';
import { UserInfo } from '../components/types/user';

type UserStorageStorageState = {
  getUser: () => UserInfo;
  onLogin: (user: UserInfo) => void;
  onLogout: () => void;
};

const UserStorageStorageContext = createContext<UserStorageStorageState>(undefined as never);

type props = {
  children: ReactElement;
};

export const UserStorageStorageProvider = ({children}: props) => {
  const navigate = useNavigate();

  const getUser = () => {
    const userInfo = getSessionStorageValue(SESSION_STORAGE_KEYS.USER_INFO, undefined) as UserInfo;
    return userInfo;
  }

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

  return (
    <UserStorageStorageContext.Provider value={{
      getUser,
      onLogin,
      onLogout,
    }}>
      {children}
    </UserStorageStorageContext.Provider>
  );
};

export const useUser = () => {
  const {getUser, onLogin, onLogout} = useContext(UserStorageStorageContext);
  return {
    getUser,
    onLogin,
    onLogout,
  };
};
