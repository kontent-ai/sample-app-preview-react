import auth0 from 'auth0-js';
import {
  authOptions,
  logoutOptions,
} from './authOptions';

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
    this.webAuth.authorize();
  };

  silentLogin = (): void => {
    this.webAuth.authorize({
      prompt: 'none',
    });
  };

  logout = (): void => {
    this.webAuth.logout(logoutOptions);
  };

  handleAuthentication = (onSuccessLogin: (accessToken: IAccessToken) => void, onFailedLogin: () => void): void => {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const accessToken: IAccessToken = {
          accessToken: authResult.accessToken as string,
          expiresAt: ((authResult.expiresIn || 0) * 1000) + new Date().getTime(),
        };
        onSuccessLogin(accessToken);
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
