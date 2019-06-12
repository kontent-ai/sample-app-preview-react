import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from "./context/AppContext";
import { AuthContext } from "./context/AuthContext";
import { AppContextInitialization } from "./context/AppContextInitialization";
import { DeployedProjectRootRoute } from "./constants/routePaths";

ReactDOM.render(
  <Router basename={DeployedProjectRootRoute}>
    <AuthContext>
      <AppContext>
        <AppContextInitialization>
          <App/>
        </AppContextInitialization>
      </AppContext>
    </AuthContext>
  </Router>
  , document.getElementById('root'));
