import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { ProductDetailsPage } from "./components/Product/ProductDetailsPage";
import { ProductsPage } from "./components/Product/ProductsPage";
import { ProductDetailsRoute, ProductsRoute, EnvironmentRoute } from "./constants/routePaths";
import { WelcomePage } from "./components/WelcomePage";

export const App: React.FC = () => {
  return (
    <div className="app">
      <NavigationBar />
      <div className="app__content-wrapper">
        <Routes>
          <Route
            path={EnvironmentRoute}
            element={<WelcomePage />}
          />
          <Route
            path={ProductDetailsRoute}
            element={<ProductDetailsPage />}
          />
          <Route
            path={ProductsRoute}
            element={<ProductsPage />}
          />
          <Route
            element={() => <p>Ooops, missing page!</p>}
          />
        </Routes>
      </div>
    </div>
  );
};
