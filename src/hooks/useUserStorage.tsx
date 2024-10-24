import {createContext, ReactElement, useContext} from 'react';
import useSessionStorage from './useSessionStorage';
import {UserInfo} from './useUser';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';
import { useNavigate } from 'react-router-dom';
import pathnames from '../constants/pathnames';

type UserStorageStorageState = {
  user: UserInfo | undefined;
  onLogin: (user: UserInfo) => void;
  onLogout: () => void;
};

const UserStorageStorageContext = createContext<UserStorageStorageState>(undefined as never);

type props = {
  children: ReactElement;
};

export const UserStorageStorageProvider = ({children}: props) => {
  const navigate = useNavigate();
  const [user, setUser] = useSessionStorage<UserInfo | undefined>(
    SESSION_STORAGE_KEYS.USER_INFO,
    undefined
  );

  const onLogin = (data: UserInfo) => {
    setUser(data);

    navigate(pathnames.home);
  };

  const onLogout = () => {
    setUser(undefined);
    navigate(pathnames.login);
  };

  return (
    <UserStorageStorageContext.Provider value={{
      user,
      onLogin,
      onLogout,
    }}>
      {children}
    </UserStorageStorageContext.Provider>
  );
};

export const useUserStorage = () => useContext(UserStorageStorageContext);
