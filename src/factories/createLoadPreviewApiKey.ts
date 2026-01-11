import { getKeyForTokenSeed, getPreviewApiTokenSeed } from "../repositories/previewApiKeyRepository";
import { getProjectContainerForEnvironment } from "../repositories/projectContainerRepository";

type LoadPreviewApiKeyDeps = Readonly<{
  accessToken: string;
  environmentId: string;
}>;

export const createLoadPreviewApiKey = (
  { accessToken, environmentId }: LoadPreviewApiKeyDeps,
): () => Promise<string | null> =>
async () => {
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
