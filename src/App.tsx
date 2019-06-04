import React from 'react';
import './App.css';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { LandingPage } from './components/LandingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import {AuthContextConsumer} from "./context/AuthContext";
import {
  ProductsPage,
} from './components/ProductsPage';
import {
  CallbackRoute,
  LogoutRoute,
  ProductDetailRoute,
  ProductsRoute,
  RootRoute,
} from './constants/routePaths';
import {WelcomePage} from "./components/WelcomePage";

export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="App">
        {/* TODO: If silent login is processing, could also be shown "Loading..." to avoid blinking the browser screen */}
        <AuthContextConsumer>
          {authContext => (
            <>
              <Route
                path={RootRoute}
                component={NavigationBar}
              />
              <div className="app-content-wrapper">
                <Switch>
                  <Route
                    path={RootRoute}
                    exact
                    component={WelcomePage}
                  />
                  <Route
                    path="/landing-page"
                    component={LandingPage}
                  />
                  <Route
                    path={ProductDetailRoute}
                    component={ProductDetailsPage}
                  />
                  <Route
                    path={ProductsRoute}
                    component={ProductsPage}
                  />
                </Switch>
              </div>
            </>
          )}
        </AuthContextConsumer>
      </div>
    );
  }
}
