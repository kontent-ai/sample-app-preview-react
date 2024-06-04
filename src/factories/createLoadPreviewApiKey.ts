import { IAppContext } from "../context/AppContext";
import { IAuthContext } from "../context/AuthContext";
import { getPreviewApiTokenSeed, getKeyForTokenSeed } from "../repositories/previewApiKeyRepository";
import { getProjectContainerForEnvironment } from "../repositories/projectContainerRepository";

interface ILoadPreviewApiKeyDeps {
  readonly appContext: IAppContext;
  readonly authContext: IAuthContext;
}

export const createLoadPreviewApiKey = (props: ILoadPreviewApiKeyDeps): () => Promise<string | null> => {
  const { accessToken } = props.authContext;
  const { environmentId } = props.appContext;
  return async () => {
    const projectContainerId = await getProjectContainerForEnvironment(accessToken, environmentId)
      .then(res => res?.projectContainerId);

    if (!projectContainerId) {
      return null;
    }

    const tokenSeed = await getPreviewApiTokenSeed(accessToken, projectContainerId, environmentId).then(res =>
      res?.[0]?.token_seed_id
    );

    if (!tokenSeed) {
      return null;
    }

    return getKeyForTokenSeed(accessToken, projectContainerId, tokenSeed)
      .then(response => response.api_key)
      .catch(() => null);
  };
};
