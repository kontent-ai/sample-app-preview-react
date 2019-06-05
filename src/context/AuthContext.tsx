import React from 'react';
import {IAccessToken, IWebAuth} from "../authorization/WebAuth";
import {getPreviewApiKey, IPreviewApiKey} from "../repositories/previewApiKeyRepository";
import {match, matchPath, Redirect, Route, RouteComponentProps, RouteProps, Switch, withRouter} from "react-router";
import {Callback} from "../components/Callback";
import {CallbackRoute, LogoutRoute, ProjectRoute, ProjectRouteParams, RootRoute} from "../constants/routePaths";
import {getProjectIdFromUrl, saveProjectIdToLocalStorage} from "../utils/projectIdUtil";

interface IAuthContextProps {
  readonly auth: IWebAuth;
}

interface IAuthContextState {
  readonly accessToken: string;
  readonly expiresAt: number;
  readonly isLoggedIn: boolean;
  readonly previewApiKey: string;
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
  expiresAt: 0,
  isLoggedIn: false,
  previewApiKey: '',
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

interface IAuthContextAllProps extends IAuthContextProps, RouteComponentProps {
}

class AuthContext extends React.Component<IAuthContextAllProps, IAuthContextState> {
  constructor(props: IAuthContextAllProps) {
    super(props);

    this.state = {
      accessToken: '',
      isLoggedIn: false,
      previewApiKey: '',
      expiresAt: 0,
      silentLoginFailed: false,
    };

    const projectIdInUrl = getProjectIdFromUrl();
    if (projectIdInUrl && projectIdInUrl !== '') {
      saveProjectIdToLocalStorage(projectIdInUrl);
    }
  }

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
    // const { accessToken, previewApiKey } = this.state;
    // if (accessToken !== '' && previewApiKey === '') {
    //   getPreviewApiKey(accessToken).then((response: IPreviewApiKey) => {
    //     this.setState({
    //       previewApiKey: response.api_key,
    //     });
    //   });
    // }
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

    /* TODO: If silent login is processing, could also be shown "Loading..." to avoid blinking the browser screen */

    return (
      <>
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

          {/*{isLoggedIn && projectId === '' && (*/}
          {/*  <Route exact path={RootRoute} render={() => (*/}
          {/*    <div>Logged in but no project id specified!</div>*/}
          {/*  )}/>*/}
          {/*)}*/}

          {isLoggedIn && (
            <Route render={() => (
              <AuthContextProvider value={context}>
                {this.props.children}
              </AuthContextProvider>
            )}/>
          )}
        </Switch>
      </>
    )
  }
}


const AuthContextWithRouter = withRouter<IAuthContextAllProps>(AuthContext);
export { AuthContextWithRouter as AuthContext };
