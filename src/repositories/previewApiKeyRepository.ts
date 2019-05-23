import { createAjaxWithCredentials } from '../utils/ajax';
import {
  createRestProvider,
  IRequestContext,
} from '../utils/restProvider';

const restProvider = createRestProvider(createAjaxWithCredentials());

export interface IPreviewApiKey {
  readonly api_key: string;
  readonly expiresAt: string;
}

export const getPreviewApiKey = (authToken: string): Promise<IPreviewApiKey> => {
  const requestContext: IRequestContext = {
    authToken: authToken,
  };

  // TODO: get project id from URL
  const url = `https://qa-draft.global.ssl.fastly.net/api/project-management/555320bb-658d-00e5-2e91-8e9bd448a98c/keys/content-management-api`;

  return restProvider.post(url, null, requestContext);
};
