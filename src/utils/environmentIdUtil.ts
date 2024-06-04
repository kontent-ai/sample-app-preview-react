import { matchPath } from "react-router";
import { DeployedProjectRootRoute, EnvironmentRoute, ProjectRouteParams } from "../constants/routePaths";

export const getEnvironmentIdFromUrl = (): string | null => {
  if (window.location) {
    const routeToMatch = DeployedProjectRootRoute + EnvironmentRoute + "*";
    const match = matchPath<ProjectRouteParams>(window.location.pathname, routeToMatch);
    if (match) {
      return match.params.environmentId;
    }
  }

  console.warn("no environmentId in url");
  return null;
};
