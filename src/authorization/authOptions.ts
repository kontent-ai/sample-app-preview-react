import {
  AuthOptions,
  LogoutOptions,
} from 'auth0-js';

export const authOptions: AuthOptions = {
  domain: 'kentico-dev.eu.auth0.com',
  clientID: 'NPIPF1KyuQ7W0pgfE50nms09aDUR4mKi',
  audience: 'https://app.kenticocloud.com/',
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'token id_token',
  scope: 'openid',
};

export const logoutOptions: LogoutOptions = {
  returnTo: 'http://localhost:3000/logout',
};
