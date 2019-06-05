import auth0 from 'auth0-js';
import {
  authOptions,
  logoutOptions,
} from './authOptions';
import {Auth0RedirectUriStorageKey} from "../constants/localStorageKeys";

export interface IAccessToken {
  readonly accessToken: string;
  readonly expiresAt: number;
}

export interface IWebAuth {
  readonly login: () => void;
  readonly logout: () => void;
  readonly silentLogin: () => void;
  readonly handleAuthentication: (onSuccessLogin: (accessToken: IAccessToken) => void, onFailedLogin: () => void) => void;
  readonly isAuthenticated: (expiresIn: number) => boolean;
}

export class WebAuth implements IWebAuth {
  private webAuth = new auth0.WebAuth(authOptions);

  login = (): void => {
    console.log('[WebAuth] Request regular login');
    this.webAuth.authorize();
  };

  silentLogin = (): void => {
    console.log('[WebAuth] request silent login, store redirect uri: ', window.location.pathname);
    localStorage.setItem(Auth0RedirectUriStorageKey, window.location.pathname);
    this.webAuth.authorize({
      prompt: 'none',
    });
  };

  logout = (): void => {
    this.webAuth.logout(logoutOptions);
  };

  handleAuthentication = (onSuccessLogin: (accessToken: IAccessToken, redirectUri: string) => void, onFailedLogin: () => void): void => {
    console.log('[WebAuth] handle authentication');
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const accessToken: IAccessToken = {
          accessToken: authResult.accessToken as string,
          expiresAt: ((authResult.expiresIn || 0) * 1000) + new Date().getTime(),
        };

        const redirectUriFromStorage = localStorage.getItem(Auth0RedirectUriStorageKey);
        localStorage.removeItem(Auth0RedirectUriStorageKey);
        const redirectUri = redirectUriFromStorage ? redirectUriFromStorage : '/';

        onSuccessLogin(accessToken, redirectUri);
      }
      else if (err) {
        onFailedLogin();
        this.login();
      }
    });
  };

  isAuthenticated = (expiresAt: number): boolean => {
    // Check whether the current time is past the access token's expiry time
    return new Date().getTime() < expiresAt;
  };
}
