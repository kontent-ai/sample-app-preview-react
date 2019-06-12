import { IAppContext } from "../context/AppContext";
import { IAuthContext } from "../context/AuthContext";
import { IPreviewApiKey } from "../repositories/previewApiKeyRepository";

interface ILoadPreviewApiKeyDeps {
  readonly appContext: IAppContext;
  readonly authContext: IAuthContext;
  readonly getPreviewApiKey: (authToken: string, projectId: string) => Promise<IPreviewApiKey>;
}

export const createLoadPreviewApiKey = (props: ILoadPreviewApiKeyDeps): () => Promise<string | null> => {
  const { accessToken } = props.authContext;
  const { projectId } = props.appContext;
  return () => props.getPreviewApiKey(accessToken, projectId)
    .then((response: IPreviewApiKey) => {
      return response.api_key;
    })
    .catch(() => {
      return null;
    })
};
