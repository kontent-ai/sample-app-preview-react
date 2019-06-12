import { matchPath } from "react-router";
import { DeployedProjectRootRoute, ProjectRoute, ProjectRouteParams } from "../constants/routePaths";

export const getProjectIdFromUrl = (): string | null => {
  if (window.location) {
    const routeToMatch = DeployedProjectRootRoute + ProjectRoute + "*";
    const match = matchPath<ProjectRouteParams>(window.location.pathname, routeToMatch);
    if (match) {
      return match.params.projectId;
    }
  }

  console.warn('no projectId in url');
  return null;
};
