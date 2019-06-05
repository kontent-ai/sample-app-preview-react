import {matchPath} from "react-router";
import {ProjectRoute, ProjectRouteParams} from "../constants/routePaths";
import {ProjectIdLocalStorageKey} from "../constants/localStorageKeys";

export const getProjectIdFromUrl = (): string | null => {
  console.log(`get project id from url (${window.location})`);
  if (window.location) {
    const match = matchPath<ProjectRouteParams>(window.location.pathname, ProjectRoute + "*");
    if (match) {
      console.log('got projectId from url: ', match.params.projectId);
      return match.params.projectId;
    } else {
      console.log('no projectId in url');
    }
  }

  return null;
};

export const saveProjectIdToLocalStorage = (projectId: string): void => {
  console.log('save project id to local storage', projectId);
  localStorage.setItem(ProjectIdLocalStorageKey, projectId);
};

export const getProjectIdFromLocalStorage = (): string | null => {
  return localStorage.getItem(ProjectIdLocalStorageKey);
};
