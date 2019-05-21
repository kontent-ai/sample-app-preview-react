import React from 'react';
import './App.css';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  handleAuthentication,
  silentLogin,
} from './authorization/authentication';
import { Callback } from './components/Callback';
import { HeaderComponent } from './components/HeaderComponent';
import { HomePage } from './components/HomePage';
import { LandingPage } from './components/LandingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import {
  loginStatusKey,
  silentLoginKey,
} from './constants/localStorageKeys';

//const auth = new Auth();

const handleAuth = ({ location }: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    debugger;
    handleAuthentication();
  }
};

export class App extends React.PureComponent {
  componentDidMount() {
    // const { renewSession, silentLogin } = auth;

    if (localStorage.getItem(loginStatusKey) === 'true') {
      // renewSession();
    }
    else if (localStorage.getItem(silentLoginKey) == undefined) {
      silentLogin();
    }
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props =>
            <HeaderComponent {...props} />
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
            <Route
              path="/callback"
              render={props => {
                handleAuth(props);
                return <Callback />;
              }}
            />
            <Redirect
              from="/logout"
              to="/"
            />
          </Switch>
        </div>
      </div>
    );
  }
};
