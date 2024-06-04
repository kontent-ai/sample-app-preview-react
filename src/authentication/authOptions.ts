import { AuthOptions, LogoutOptions } from "auth0-js";

export const authOptions: AuthOptions = {
  audience: "https://app.kenticocloud.com/",
  clientID: process.env.REACT_APP_AUTH_CLIENT_ID!,
  domain: process.env.REACT_APP_AUTH_DOMAIN!,
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URL,
  responseType: "token id_token",
  scope: "openid",
};

export const logoutOptions: LogoutOptions = {
  returnTo: process.env.REACT_APP_AUTH_LOGOUT_RETURN_TO,
};
