import React from 'react';
import {IAccessToken, IWebAuth} from "../authorization/WebAuth";
import {getPreviewApiKey, IPreviewApiKey} from "../repositories/previewApiKeyRepository";
import {Redirect, Route, Switch} from "react-router";
import {Callback} from "../components/Callback";
import {CallbackRoute, LogoutRoute, RootRoute} from "../constants/routePaths";

interface IAuthContextProps {
  readonly auth: IWebAuth;
}

interface IAuthContextState {
  readonly accessToken: string;
  readonly isLoggedIn: boolean;
  readonly previewApiKey: string;
  readonly expiresAt: number;
  readonly silentLoginFailed: boolean;
}

interface IAuthContext extends IAuthContextState {
  readonly login: () => void;
  readonly logout: () => void;
  readonly silentLogin: () => void;
  readonly handleAuthentication: ({ location }: any) => void;
  readonly isAuthenticated: (expiresIn: number) => boolean;
}

const defaultAuthContext: IAuthContext = {
  accessToken: '',
  isLoggedIn: false,
  previewApiKey: '',
  expiresAt: 0,
  silentLoginFailed: false,
  login: () => undefined,
  logout: () => undefined,
  silentLogin: () => undefined,
  handleAuthentication: (props: any) => undefined,
  isAuthenticated: (expiresIn: number) => false,
};

const context = React.createContext<IAuthContext>(defaultAuthContext);
const AuthContextProvider = context.Provider;

export const AuthContextConsumer = context.Consumer;

export class AuthContext extends React.PureComponent<IAuthContextProps, IAuthContextState> {
  readonly state = {
    accessToken: '',
    isLoggedIn: false,
    previewApiKey: '',
    expiresAt: 0,
    silentLoginFailed: false,
  };

  private isAuthUrlHash = (hash: string): boolean => /access_token|id_token|error/.test(hash);

  handleAuth = ({ location }: any) => {
    if (this.isAuthUrlHash(location.hash)) {
      this.props.auth.handleAuthentication(this.onSuccessLogin, this.onFailedLogin);
    }
  };

  onSuccessLogin = (accessToken: IAccessToken) => {
    this.setState({
      accessToken: accessToken.accessToken,
      expiresAt: accessToken.expiresAt,
      isLoggedIn: true,
      silentLoginFailed: false,
    });
  };

  onFailedLogin = () => {
    this.setState({
      silentLoginFailed: true,
    });
  };

  componentDidMount() {
    const { silentLogin } = this.props.auth;
    const { silentLoginFailed } = this.state;

    if (!silentLoginFailed && !this.isAuthUrlHash(window.location.hash)) {
      silentLogin();
    }
  }

  componentDidUpdate(): void {
      const { accessToken } = this.state;

      if (accessToken !== '') {
        getPreviewApiKey(accessToken).then((response: IPreviewApiKey) => {
          this.setState({
            previewApiKey: response.api_key,
          });
        });
      }
    }

  render() {
    const context: IAuthContext = {
      ...this.state,
      login: this.props.auth.login,
      silentLogin: this.props.auth.silentLogin,
      logout: this.props.auth.logout,
      handleAuthentication: this.handleAuth,
      isAuthenticated: this.props.auth.isAuthenticated,
    };

    const { isLoggedIn } = this.state;
    return (
        <Switch>
          {isLoggedIn ?
            <Redirect
              from={CallbackRoute}
              to={RootRoute}
            /> :
            <Route
              path={CallbackRoute}
              render={props => {
                this.handleAuth(props);
                return <Callback />;
              }}
            />
          }
          <Redirect
            from={LogoutRoute}
            to={RootRoute}
          />

          {isLoggedIn && (
            <Route render={() => (
              <AuthContextProvider value={context}>
                {this.props.children}
              </AuthContextProvider>
            )}/>
          )}
        </Switch>
    )
  }
}
