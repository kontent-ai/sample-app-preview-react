import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import {
  ProductsRoute,
  RootRoute,
} from '../constants/routePaths';
import {AuthContextConsumer} from "../context/AuthContext";

export class NavigationBar extends React.PureComponent {
  render() {
    return (
      <div className="navigation-bar">
        <nav className="navigation-bar__app-menu">
          <Link className="navigation-bar__app-menu-button" to={RootRoute}>Welcome</Link>
          <Link className="navigation-bar__app-menu-button" to={ProductsRoute}>Products</Link>
        </nav>
        <AuthContextConsumer>
          {authContext => (
            <div className="navigation-bar__user-menu">
              <button className="navigation-bar__user-menu-button" onClick={authContext.logout}>Logout</button>
            </div>
          )}
        </AuthContextConsumer>
      </div>
    );
  }
}
