import { IAppContext } from "../context/AppContext";
import { LoadingStatus } from "../enums/LoadingStatus";

interface ILoadApplicationDataDeps {
  readonly appContext: IAppContext;
  readonly loadPreviewApikey: () => Promise<string | null>;
  readonly getProjectIdFromUrl: () => string | null;
}

export const createLoadApplicationData = (deps: ILoadApplicationDataDeps) => async (): Promise<void> => {
  const { appContext, loadPreviewApikey, getProjectIdFromUrl } = deps;

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
