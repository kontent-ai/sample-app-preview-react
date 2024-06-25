import { AuthOptions, LogoutOptions } from "auth0-js";

export const authOptions: AuthOptions = {
  audience: "https://app.kenticocloud.com/",
  clientID: import.meta.env.VITE_AUTH_CLIENT_ID!,
  domain: import.meta.env.VITE_AUTH_DOMAIN!,
  redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URL,
  responseType: "token id_token",
  scope: "openid",
};

export const logoutOptions: LogoutOptions = {
  returnTo: import.meta.env.VITE_APP_AUTH_LOGOUT_RETURN_TO,
};
