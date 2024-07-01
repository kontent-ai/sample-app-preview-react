import "./index.css";

import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./App";
import { DeployedProjectRootRoute } from "./constants/routePaths";
import { AppContextComponent } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router basename={DeployedProjectRootRoute}>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID!}
      authorizationParams={{
        audience: "https://app.kenticocloud.com/",
        redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
        scope: "openid",
        responseType: "token id_token",
      }}
    >
      <AppContextComponent>
        <App />
      </AppContextComponent>
    </Auth0Provider>
  </Router>,
);
