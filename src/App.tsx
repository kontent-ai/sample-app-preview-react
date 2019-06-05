import React from 'react';
import './App.css';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import {
  ProductsPage,
} from './components/ProductsPage';
import {
  ProductDetailRoute,
  ProductsRoute,
  RootRoute,
} from './constants/routePaths';
import {WelcomePage} from "./components/WelcomePage";

export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="App">
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
              path={ProductDetailRoute}
              component={ProductDetailsPage}
            />
            <Route
              path={ProductsRoute}
              component={ProductsPage}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
