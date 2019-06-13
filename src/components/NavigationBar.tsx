import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';
import {
  ProductsRoute,
  ProjectRoute,
  ProjectRouteParams,
} from '../constants/routePaths';
import { buildPath } from "../utils/routeTransitionUtils";
import { AppContextConsumer } from "../context/AppContext";

export class NavigationBar extends React.PureComponent {
  render() {
    return (
      <AppContextConsumer>
        {appContext => (
          <div className="navigation-bar">
            <nav className="navigation-bar__app-menu">
              <NavLink
                activeClassName="navigation-bar__app-menu-button--active"
                className="navigation-bar__app-menu-button"
                exact={true}
                to={buildPath<ProjectRouteParams>(ProjectRoute, { projectId: appContext.projectId })}
              >
                Welcome
              </NavLink>

              <NavLink
                activeClassName="navigation-bar__app-menu-button--active"
                className="navigation-bar__app-menu-button"
                to={buildPath<ProjectRouteParams>(ProductsRoute, { projectId: appContext.projectId })}
              >
                Products
              </NavLink>
            </nav>
          </div>
        )}
      </AppContextConsumer>
    )
  }
}

