import React from 'react';
import { Link } from 'react-router-dom';
import {
  isAuthenticated,
  login,
  logout,
} from '../authorization/authentication';

// interface IHeaderProps {
//   readonly auth: IAuth
// }

export class HeaderComponent extends React.PureComponent<{}> {
  componentDidMount(): void {
    //const { isAuthenticated, silentLogin } = this.props.auth;

    // debugger;
    // if (localStorage.getItem('isLoggedIn') !== 'true' || !isAuthenticated()) {
    //   //silentLogin();
    // }
  }

  private login = (): void => {
    login();
  };

  private logout = (): void => {
   logout();
  };

  render() {
    return (
      <>
        <nav className="app-menu">
          <Link to="/">Home</Link>
          <Link to="/landing-page">Landing page</Link>
          <Link to="/product">Product</Link>
        </nav>

        <div>
          {isAuthenticated()
            ? <p>Logged in <button onClick={this.logout}>Log out</button></p>
            : <p>Logged out <button onClick={this.login}>Log in</button></p>
          }
        </div>
      </>
    );
  }
}

