import {getPreviewApiKey, IPreviewApiKey} from "../repositories/previewApiKeyRepository";
import {IAuthContext} from "../context/AuthContext";
import {IAppContext} from "../context/AppContext";
import {LoadingStatus} from "../enums/LoadingStatus";
import {getProjectIdFromUrl} from "./projectIdUtil";

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

export const createFetchData = () => (): string => {
  return "have some data";
};

interface ILoadApplicationDataDeps {
  readonly appContext: IAppContext;
  readonly authContext: IAuthContext;
  readonly fetchData: () => string;
  readonly loadPreviewApikey: () => Promise<string | null>;
}

export const createLoadApplicationData = (deps: ILoadApplicationDataDeps) => async (): Promise<void> => {
  const { appContext, loadPreviewApikey, fetchData } = deps;
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

  if (appContext.previewApiKeyLoadingStatus === LoadingStatus.Finished && appContext.dataLoadingStatus === LoadingStatus.NotLoaded) {
    appContext.setLoadingStatus(LoadingStatus.InProgress);
    const data = fetchData();
    appContext.setLoadingStatus(LoadingStatus.Finished);
  }
};
