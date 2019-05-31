import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import {
  ProductsRoute,
  RootRoute,
} from '../constants/routePaths';


export class NavigationBar extends React.PureComponent {
  render() {
    return (
      <>
        <nav className="app-menu">
          <Link to={RootRoute}>Welcome</Link>
          <Link to={ProductsRoute}>Products</Link>
        </nav>
      </>
    );
  }
}
