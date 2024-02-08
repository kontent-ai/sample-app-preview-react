import { createAjaxWithCredentials } from '../utils/ajax';
import {
  createRestProvider,
  IRequestContext,
} from '../utils/restProvider';

const restProvider = createRestProvider(createAjaxWithCredentials());

export interface TokenSeedResponse {
  token_seed_id: string;
}

export const getPreviewApiTokenSeed = (authToken: string, projectContainerId: string, environmentId: string): Promise<ReadonlyArray<TokenSeedResponse>> => {
  const requestContext: IRequestContext = {
    authToken: authToken,
  };
  const url = `${process.env.REACT_APP_KONTENT_URL}/api/project-container/${projectContainerId}/keys/listing`;
  const data = {
    query: '',
    'api_key_types': ['delivery-api'],
    environments: [environmentId],
  };

  return restProvider.post(url, data, requestContext);
};

export interface KeyFromSeedResponse {
  api_key: string;
}

export const getKeyForTokenSeed = (authToken: string, projectContainerId: string, tokenSeed: string): Promise<KeyFromSeedResponse> => {
  const requestContext: IRequestContext = {
    authToken: authToken,
  };
  const url = `${process.env.REACT_APP_KONTENT_URL}/api/project-container/${projectContainerId}/keys/${tokenSeed}`;

  return restProvider.get(url, requestContext);
};
