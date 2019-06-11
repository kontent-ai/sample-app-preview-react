import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from "./context/AppContext";
import { AuthContext } from "./context/AuthContext";
import {AppContextInitialization} from "./context/AppContextInitialization";

console.warn('app v-3');

ReactDOM.render(
  <Router basename={"/" + process.env.REACT_APP_PROJECT_ROUTE}>
    <AuthContext>
      <AppContext>
        <AppContextInitialization>
          <App/>
        </AppContextInitialization>
      </AppContext>
    </AuthContext>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
