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
  ProductDetailsRoute,
  ProductsRoute,
  ProjectRoute,
} from './constants/routePaths';
import {WelcomePage} from "./components/WelcomePage";

export class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Route
          path={ProjectRoute}
          component={NavigationBar}
        />
        <div className="app-content-wrapper">
          <Switch>
            <Route
              path={ProjectRoute}
              exact
              component={WelcomePage}
            />
            <Route
              path={ProductDetailsRoute}
              component={ProductDetailsPage}
            />
            <Route
              path={ProductsRoute}
              component={ProductsPage}
            />
            <Route
              render={() => (
                <p>Ooops, missing page!</p>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
