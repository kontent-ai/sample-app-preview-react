import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import {
  ProductsRoute,
  ProjectRoute,
  ProjectRouteParams,
} from '../constants/routePaths';
import { AuthContextConsumer } from "../context/AuthContext";
import { buildPath } from "../utils/routeTransitionUtils";
import { AppContextConsumer } from "../context/AppContext";

export class NavigationBar extends React.PureComponent {
  render() {
    return (
      <AppContextConsumer>
        {appContext => (
          <AuthContextConsumer>
            {authContext => (
              <div className="navigation-bar">
                <nav className="navigation-bar__app-menu">
                  <Link className="navigation-bar__app-menu-button" to={buildPath<ProjectRouteParams>(ProjectRoute, { projectId: appContext.projectId })}>Welcome</Link>
                  <Link className="navigation-bar__app-menu-button" to={buildPath<ProjectRouteParams>(ProductsRoute, { projectId: appContext.projectId })}>Products</Link>
                </nav>
                <div className="navigation-bar__user-menu">
                  <button className="navigation-bar__user-menu-button" onClick={authContext.logout}>Sign Out</button>
                </div>
              </div>
            )}
          </AuthContextConsumer>
        )}
      </AppContextConsumer>
    )
  }
}

