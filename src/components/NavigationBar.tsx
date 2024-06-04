import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { ProductsRoute, EnvironmentRoute, ProjectRouteParams } from "../constants/routePaths";
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
                to={buildPath<ProjectRouteParams>(EnvironmentRoute, { environmentId: appContext.environmentId })}
              >
                Welcome
              </NavLink>

              <NavLink
                activeClassName="navigation-bar__app-menu-button--active"
                className="navigation-bar__app-menu-button"
                to={buildPath<ProjectRouteParams>(ProductsRoute, { environmentId: appContext.environmentId })}
              >
                Products
              </NavLink>
            </nav>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}
