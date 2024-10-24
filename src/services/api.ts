import {Configuration, UsersApi} from '../api/generated';
import {BASE_URL} from '../constants/api';
import {SESSION_STORAGE_KEYS} from '../constants/storageKeys';

const getAccessToken = () => sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_INFO) || '';

const configuration = new Configuration({
  basePath: BASE_URL,
  accessToken: getAccessToken(),
});

class Api {
  private _usersApi = new UsersApi(configuration);

  get user() {
    return this._usersApi;
  }
}

export default new Api();
