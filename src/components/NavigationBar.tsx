import React from "react";
import { NavLink } from "react-router-dom";

import { AppContextConsumer } from "../context/AppContext";

export const NavigationBar: React.FC = () => (
  <AppContextConsumer>
    {appContext => (
      <nav className=" bg-black flex flex-row-reverse flex-initial ">
        <NavLink
          className={({ isActive }) =>
            `p-6 me-16 text-xl text-white hover:bg-[#5b4ff5] ${isActive ? "bg-[#5b4ff5]" : "bg-none"}`}
          to={`/${appContext.environmentId}/products`}
        >
          Products
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `p-6 text-xl text-white hover:bg-[#5b4ff5] ${isActive ? "bg-[#5b4ff5]" : "bg-none"}`}
          to={`/${appContext.environmentId}`}
          end
        >
          Welcome
        </NavLink>
      </nav>
    )}
  </AppContextConsumer>
);
