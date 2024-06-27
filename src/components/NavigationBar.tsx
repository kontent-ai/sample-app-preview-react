import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { AppContextConsumer } from "../context/AppContext";

export const NavigationBar: React.FC = () => {
  return (
    <AppContextConsumer>
      {appContext => (
        <div className="navigation-bar">
          <nav className="navigation-bar__app-menu">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navigation-bar__app-menu-button" : "navigation-bar__app-menu-button"}
              to={`/${appContext.environmentId}`}
            >
              Welcome
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "navigation-bar__app-menu-button" : "navigation-bar__app-menu-button"}
              to={`/${appContext.environmentId}/products`}
            >
              Products
            </NavLink>
          </nav>
        </div>
      )}
    </AppContextConsumer>
  );
};
