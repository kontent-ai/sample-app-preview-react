import React from 'react';
import { Link } from 'react-router-dom';

export interface IHeaderComponentProps {
  readonly isLoggedIn: boolean;
  readonly previewApiKey: string;
  readonly login: () => void;
  readonly logout: () => void;
}

export class HeaderComponent extends React.PureComponent<IHeaderComponentProps> {
  render() {
    const { isLoggedIn, previewApiKey, login, logout } = this.props;
    return (
      <>
        <nav className="app-menu">
          <Link to="/">Home</Link>
          <Link to="/landing-page">Landing page</Link>
          <Link to="/product">Product</Link>
        </nav>

        <div>
          {isLoggedIn
            ? <p>Logged in <button onClick={logout}>Log out</button></p>
            : <p>Logged out <button onClick={login}>Log in</button></p>
          }
        </div>
        <p>PreviewAPIKey:<br />{previewApiKey}</p>
      </>
    );
  }
}

