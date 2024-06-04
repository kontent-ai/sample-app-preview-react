import { RequestContext, get } from '../utils/fetch';

export interface ProjectContainer {
  projectContainerId: string;
}

export const getProjectContainerForEnvironment = (
  authToken: string,
  environmentId: string,
): Promise<ProjectContainer | null> => {
  const requestContext: RequestContext = {
    authToken: authToken,
  };
  const url = `${process.env.REACT_APP_KONTENT_URL}/api/project-management/${environmentId}`;

  return get(url, requestContext)
    .then(async (res) => {
      if(res.ok) {
        return await res.json() as ProjectContainer
      }
      
      console.error((await res.json()).description);
      return null;
    });
};
