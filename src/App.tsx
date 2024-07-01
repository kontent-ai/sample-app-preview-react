import React from "react";
import { Route, Routes } from "react-router-dom";

import { NavigationBar } from "./components/NavigationBar";
import { ProductDetailsPage } from "./components/Product/ProductDetailsPage";
import { ProductsPage } from "./components/Product/ProductsPage";
import { WelcomePage } from "./components/WelcomePage";
import { EnvironmentRoute, ProductDetailsRoute, ProductsRoute } from "./constants/routePaths";

export const App: React.FC = () => {
  return (
    <div className="flex flex-col h-full min-w-[360px] font-serif">
      <NavigationBar />
      <div className=" flex flex-col  flex-1 flex-wrap items-center">
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
            element={<p>Ooops, missing page!</p>}
          />
        </Routes>
      </div>
    </div>
  );
};
