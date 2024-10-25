export type User = {
  username: string;
  password: string;
};

export type Tokens = {
  refreshToken: string;
  accessToken: string;
}

export type UserInfo = {
  username: string;
  accessToken: string;
  refreshToken: string;
}