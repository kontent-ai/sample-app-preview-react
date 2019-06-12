import { getPreviewApiKey, IPreviewApiKey } from "../repositories/previewApiKeyRepository";
import { IAuthContext } from "../context/AuthContext";
import { IAppContext } from "../context/AppContext";
import { LoadingStatus } from "../enums/LoadingStatus";
import { getProjectIdFromUrl } from "./projectIdUtil";

interface ILoadPreviewApiKeyDeps {
  readonly appContext: IAppContext;
  readonly authContext: IAuthContext;
  readonly getPreviewApiKey: (authToken: string, projectId: string) => Promise<IPreviewApiKey>;
}

export const createLoadPreviewApiKey = (props: ILoadPreviewApiKeyDeps): () => Promise<string | null> => {
  const { accessToken } = props.authContext;
  const { projectId } = props.appContext;
  return () => getPreviewApiKey(accessToken, projectId)
    .then((response: IPreviewApiKey) => {
      return response.api_key;
    })
    .catch(() => {
      return null;
    })
};

interface ILoadApplicationDataDeps {
  readonly appContext: IAppContext;
  readonly authContext: IAuthContext;
  readonly loadPreviewApikey: () => Promise<string | null>;
}

export const createLoadApplicationData = (deps: ILoadApplicationDataDeps) => async (): Promise<void> => {
  const { appContext, loadPreviewApikey } = deps;

  if (appContext.dataLoadingStatus === LoadingStatus.Finished) {
    return;
  }

  if (appContext.projectIdLoadingStatus === LoadingStatus.NotLoaded) {
    const projectIdFromUrl = getProjectIdFromUrl();
    if (projectIdFromUrl) {
      appContext.setProjectId(projectIdFromUrl);
      appContext.setProjectIdLoadingStatus(LoadingStatus.Finished);
    } else {
      appContext.setProjectIdLoadingStatus(LoadingStatus.Failed);
    }
  }

  if (appContext.projectIdLoadingStatus === LoadingStatus.Finished && appContext.previewApiKeyLoadingStatus === LoadingStatus.NotLoaded) {
    appContext.setPreviewApiKeyLoadingStatus(LoadingStatus.InProgress);
    const previewApiKey = await loadPreviewApikey();
    if (previewApiKey) {
      appContext.setPreviewApiKey(previewApiKey);
      appContext.setPreviewApiKeyLoadingStatus(LoadingStatus.Finished);
    }
    else {
      appContext.setPreviewApiKeyLoadingStatus(LoadingStatus.Failed);
    }
  }

  const requiredDataLoaded = [
    appContext.previewApiKeyLoadingStatus,
    appContext.projectIdLoadingStatus,
  ].every(status => status === LoadingStatus.Finished);

  if (requiredDataLoaded) {
    appContext.setLoadingStatus(LoadingStatus.Finished);
  }
};
