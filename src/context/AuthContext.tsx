import React from 'react';
import {IAccessToken, WebAuth} from "../authentication/WebAuth";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {Callback} from "../components/Callback";
import {CallbackRoute, RootRoute} from "../constants/routePaths";
import {getPreviewApiKey, IPreviewApiKey} from "../repositories/previewApiKeyRepository";

interface IAuthContextState {
  readonly accessToken: string;
  readonly expiresAt: number;
  readonly isLoggedIn: boolean;
  readonly previewApiKey: string;
}

export interface IAuthContext extends IAuthContextState {
  readonly logout: () => void;
  readonly loadPreviewApiKey: (projectId: string) => void;
}

const defaultAuthContext: IAuthContext = {
  accessToken: '',
  expiresAt: 0,
  isLoggedIn: false,
  previewApiKey: '',
  logout: () => undefined,
  loadPreviewApiKey: () => undefined,
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
  }

  private isAuthUrlHash = (hash: string): boolean => /access_token|id_token|error/.test(hash);

  handleAuthCallback = ({ location }: any) => {
    if (this.isAuthUrlHash(location.hash)) {
      this.webAuth.handleAuthentication(this.onSuccessLogin, this.onFailedLogin);
    }
  };

  onSuccessLogin = (accessToken: IAccessToken, redirectUri: string) => {
    this.setState({
      accessToken: accessToken.accessToken,
      expiresAt: accessToken.expiresAt,
      isLoggedIn: true,
    });
    this.props.history.push(redirectUri);
  };

  onFailedLogin = () => {
    console.warn('on failed login');
  };

  componentDidMount() {
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

  loadPreviewApiKey = (projectId: string): void => {
    console.log('should load preview api key for project id ', projectId);

    const { accessToken } = this.state;
    if (accessToken !== '') {
      getPreviewApiKey(accessToken, projectId)
        .then((response: IPreviewApiKey) => {
          console.log('preview api key loaded');
          this.setState({
            previewApiKey: response.api_key,
          });
        })
        .catch((error) => {
          console.error('There was error loading preview api key', error);
        });
    }
  };

  render() {
    const context: IAuthContext = {
      ...this.state,
      logout: this.webAuth.logout,
      loadPreviewApiKey: this.loadPreviewApiKey,
    };

    const { isLoggedIn } = this.state;

    /* TODO: If silent login is processing, could also be shown "Loading..." to avoid blinking the browser screen */

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
              this.handleAuthCallback(props);
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
    )
  }
}

const AuthContextWithRouter = withRouter(AuthContext);
export { AuthContextWithRouter as AuthContext };
