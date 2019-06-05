import React from 'react';
import './App.css';
import {
  Link,
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
  ProductsRoute, ProjectRoute,
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
              path={ProjectRoute}
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
            <Route
              render={() => (
                <>
                  <p>Ooops, missing page!</p>
                  <p>Did you forget to Project Id in url? E.g. <i>https://kentico.github.io/cloud-preview-sample-app/your_project_id</i></p>
                  <p>Default: <Link to={RootRoute + "0a657fe4-a314-00ac-e539-81e78251686c"}>0a657fe4-a314-00ac-e539-81e78251686c</Link></p>
                </>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
