import { createAjaxWithCredentials } from '../utils/ajax';
import {
  createRestProvider,
  IRequestContext,
} from '../utils/restProvider';

const restProvider = createRestProvider(createAjaxWithCredentials());

export interface ProjectContainer {
  projectContainerId: string;
}

export const getProjectContainerForEnvironment = (authToken: string, environmentId: string): Promise<ProjectContainer> => {
  const requestContext: IRequestContext = {
    authToken: authToken,
  };
  const url = `${process.env.REACT_APP_KONTENT_URL}/api/project-management/${environmentId}`;
  return restProvider.get(url, requestContext);
};
