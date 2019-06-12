import auth0 from 'auth0-js';
import {
  authOptions,
  logoutOptions,
} from './authOptions';
import {Auth0RedirectUriStorageKey} from "../constants/localStorageKeys";
import {RootRoute} from "../constants/routePaths";

export interface IAccessToken {
  readonly accessToken: string;
  readonly expiresAt: number;
}

export interface IWebAuth {
  readonly login: () => void;
  readonly logout: () => void;
  readonly silentLogin: () => void;
  readonly handleAuthentication: (onSuccessLogin: (accessToken: IAccessToken, redirectUri: string) => void, onFailedLogin: () => void) => void;
  readonly isAuthenticated: (expiresIn: number) => boolean;
}

export class WebAuth implements IWebAuth {
  private webAuth = new auth0.WebAuth(authOptions);

  login = (): void => {
    this.webAuth.authorize();
  };

  silentLogin = (): void => {
    localStorage.setItem(Auth0RedirectUriStorageKey, window.location.pathname);
    this.webAuth.authorize({
      prompt: 'none',
    });
  };

  logout = (): void => {
    this.webAuth.logout(logoutOptions);
  };

  private getRedirectUri = () => {
    const redirectUriFromStorage = localStorage.getItem(Auth0RedirectUriStorageKey);
    localStorage.removeItem(Auth0RedirectUriStorageKey);
    const redirectUri = redirectUriFromStorage ? redirectUriFromStorage : RootRoute;

    // todo make nicer
    if (redirectUri.startsWith("/cloud-sample-app-preview-react")) {
      return redirectUri.slice(31);
    }

    return redirectUri;
  };

  handleAuthentication = (onSuccessLogin: (accessToken: IAccessToken, redirectUri: string) => void, onFailedLogin: () => void): void => {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const accessToken: IAccessToken = {
          accessToken: authResult.accessToken as string,
          expiresAt: ((authResult.expiresIn || 0) * 1000) + new Date().getTime(),
        };
        const redirectUri = this.getRedirectUri();
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
