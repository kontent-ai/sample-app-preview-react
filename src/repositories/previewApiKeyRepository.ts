import { RequestContext, get, post } from "../utils/fetch";

export interface TokenSeedResponse {
  token_seed_id: string;
}

export const getPreviewApiTokenSeed = (
  authToken: string,
  projectContainerId: string,
  environmentId: string,
): Promise<ReadonlyArray<TokenSeedResponse> | null> => {
  const requestContext: RequestContext = {
    authToken: authToken,
  };
  const url = `${import.meta.env.VITE_KONTENT_URL}/api/project-container/${projectContainerId}/keys/listing`;
  const data = {
    query: "",
    api_key_types: ["delivery-api"],
    environments: [environmentId],
  };

  return post(url, data, requestContext)
    .then(async res => {
      if (!res.ok) {
        console.error((await res.json()).description);
        return null;
      }

      const tokens = await res.json() as TokenSeedResponse[];

      if (!tokens.length) {
        console.error(`There is no Delivery API key for environment ${environmentId}`);
        return null;
      }

      return tokens;
    });
};

export interface KeyFromSeedResponse {
  api_key: string;
}

export const getKeyForTokenSeed = (
  authToken: string,
  projectContainerId: string,
  tokenSeed: string,
): Promise<KeyFromSeedResponse> => {
  const requestContext: RequestContext = {
    authToken: authToken,
  };
  const url = `${import.meta.env.VITE_KONTENT_URL}/api/project-container/${projectContainerId}/keys/${tokenSeed}`;

  return get(url, requestContext).then(res => res.json());
};
