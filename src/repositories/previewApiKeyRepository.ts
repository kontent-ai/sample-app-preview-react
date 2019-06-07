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

export const getPreviewApiKey = (authToken: string, projectId: string): Promise<IPreviewApiKey> => {
  const requestContext: IRequestContext = {
    authToken: authToken,
  };
  const url = `https://qa-draft.global.ssl.fastly.net/api/project-management/${projectId}/keys/preview-delivery-api-primary`;
  return restProvider.post(url, null, requestContext);
};
