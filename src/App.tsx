import React from 'react';
import './App.css';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  IAccessToken,
  IWebAuth,
} from './authorization/WebAuth';
import { Callback } from './components/Callback';
import { HeaderComponent } from './components/HeaderComponent';
import { HomePage } from './components/HomePage';
import { LandingPage } from './components/LandingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import {
  getPreviewApiKey,
  IPreviewApiKey,
} from './repositories/previewApiKeyRepository';

interface IAppDataProps {
  readonly auth: IWebAuth;
}

interface IAppStateProps {
  readonly accessToken: string;
  readonly isLoggedIn: boolean;
  readonly previewApiKey: string;
  readonly expiresAt: number;
  readonly silentLoginFailed: boolean;
}

export class App extends React.PureComponent<IAppDataProps, IAppStateProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      accessToken: '',
      isLoggedIn: false,
      previewApiKey: '',
      expiresAt: 0,
      silentLoginFailed: false,
    };
  }

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

  private isAuthUrlHash = (hash: string): boolean => /access_token|id_token|error/.test(hash);

  private handleAuth = ({ location }: any) => {
    const { handleAuthentication } = this.props.auth;
    if (this.isAuthUrlHash(location.hash)) {
      handleAuthentication(this.onSuccessLogin, this.onFailedLogin);
    }
  };

  private onSuccessLogin = (accessToken: IAccessToken) => {
    this.setState({
      accessToken: accessToken.accessToken,
      expiresAt: accessToken.expiresAt,
      isLoggedIn: true,
      silentLoginFailed: false,
    });
  };

  private onFailedLogin = () => {
    this.setState({
      silentLoginFailed: true,
    });
  };

  render() {
    const { login, logout } = this.props.auth;
    const { previewApiKey, isLoggedIn, expiresAt } = this.state;

    return (
      <div className="App">
        <Route
          path="/"
          render={() =>
            <HeaderComponent
              previewApiKey={previewApiKey}
              isLoggedIn={isLoggedIn}
              login={login}
              logout={logout}
            />
          }
        />
        <div className="app-content-wrapper">
          <Switch>
            <Route
              path="/"
              exact
              component={HomePage}
            />
            <Route
              path="/landing-page"
              component={LandingPage}
            />
            <Route
              path="/product"
              component={ProductDetailsPage}
            />
            {isLoggedIn ?
              <Redirect
                from="/callback"
                to="/"
              /> :
              <Route
                path="/callback"
                render={props => {
                  this.handleAuth(props);
                  return <Callback />;
                }}
              />
            }
            <Redirect
              from="/logout"
              to="/"
            />
          </Switch>
        </div>
      </div>
    );
  }
}
