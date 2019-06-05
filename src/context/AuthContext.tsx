import React from 'react';
import {IAccessToken, WebAuth} from "../authorization/WebAuth";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {Callback} from "../components/Callback";
import {CallbackRoute, RootRoute} from "../constants/routePaths";
import {getProjectIdFromUrl, saveProjectIdToLocalStorage} from "../utils/projectIdUtil";

interface IAuthContextState {
  readonly accessToken: string;
  readonly expiresAt: number;
  readonly isLoggedIn: boolean;
  readonly previewApiKey: string;
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
  login: () => undefined,
  logout: () => undefined,
  silentLogin: () => undefined,
  handleAuthentication: () => undefined,
  isAuthenticated: () => false,
};

const context = React.createContext<IAuthContext>(defaultAuthContext);
const AuthContextProvider = context.Provider;

export const AuthContextConsumer = context.Consumer;

class AuthContext extends React.Component<RouteComponentProps, IAuthContextState> {

  private webAuth = new WebAuth();

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      accessToken: '',
      isLoggedIn: false,
      previewApiKey: '',
      expiresAt: 0,
    };

    const projectIdInUrl = getProjectIdFromUrl();
    if (projectIdInUrl && projectIdInUrl !== '') {
      saveProjectIdToLocalStorage(projectIdInUrl);
    }
  }

  private isAuthUrlHash = (hash: string): boolean => /access_token|id_token|error/.test(hash);

  handleAuth = ({ location }: any) => {
    console.log('handleAuth()');
    if (this.isAuthUrlHash(location.hash)) {
      this.webAuth.handleAuthentication(this.onSuccessLogin, this.onFailedLogin);
    }
  };

  onSuccessLogin = (accessToken: IAccessToken) => {
    console.warn('on success login');
    this.setState({
      accessToken: accessToken.accessToken,
      expiresAt: accessToken.expiresAt,
      isLoggedIn: true,
    });
  };

  onFailedLogin = () => {
    console.warn('on failed login');
  };

  componentDidMount() {
    console.warn('component did mount');
    const { silentLogin } = this.webAuth;

    if (!this.isAuthUrlHash(window.location.hash)) {
      silentLogin();
    }
  }

  // componentDidUpdate(): void {
  //   // const { accessToken, previewApiKey } = this.state;
  //   // if (accessToken !== '' && previewApiKey === '') {
  //   //   getPreviewApiKey(accessToken).then((response: IPreviewApiKey) => {
  //   //     this.setState({
  //   //       previewApiKey: response.api_key,
  //   //     });
  //   //   });
  //   // }
  // }

  render() {
    const context: IAuthContext = {
      ...this.state,
      login: this.webAuth.login,
      silentLogin: this.webAuth.silentLogin,
      logout: this.webAuth.logout,
      handleAuthentication: this.handleAuth,
      isAuthenticated: this.webAuth.isAuthenticated,
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


const AuthContextWithRouter = withRouter(AuthContext);
export { AuthContextWithRouter as AuthContext };
