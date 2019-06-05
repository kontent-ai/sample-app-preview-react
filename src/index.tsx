import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { WebAuth } from './authorization/WebAuth';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from "./context/AppContext";
import { AuthContext } from "./context/AuthContext";
import {ProjectEnsurer} from "./components/ensurers/ProjectEnsurer";

const webAuth = new WebAuth();

ReactDOM.render(
  <Router>
      <AuthContext auth={webAuth}>
        <ProjectEnsurer>
          <AppContext>
            <App/>
          </AppContext>
        </ProjectEnsurer>
      </AuthContext>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
