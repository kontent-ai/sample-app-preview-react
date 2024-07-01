import { matchPath } from "react-router";

import { DeployedProjectRootRoute } from "../constants/routePaths";

export const getEnvironmentIdFromUrl = (): string | null => {
  const routeToMatch = DeployedProjectRootRoute + ":environmentId" + "/*";
  const match = matchPath({ path: routeToMatch }, window.location.pathname);
  if (match) {
    return match.params.environmentId ?? null;
  }

  console.warn("no environmentId in url");
  return null;
};
