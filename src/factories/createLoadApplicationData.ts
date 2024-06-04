import { IAppContext } from "../context/AppContext";
import { LoadingStatus } from "../enums/LoadingStatus";

interface ILoadApplicationDataDeps {
  readonly appContext: IAppContext;
  readonly loadPreviewApikey: () => Promise<string | null>;
  readonly getEnvironmentIdFromUrl: () => string | null;
}

export const createLoadApplicationData = (deps: ILoadApplicationDataDeps) => async (): Promise<void> => {
  const { appContext, loadPreviewApikey, getEnvironmentIdFromUrl } = deps;

  if (appContext.dataLoadingStatus === LoadingStatus.Finished) {
    return;
  }

  if (appContext.environmentIdLoadingStatus === LoadingStatus.NotLoaded) {
    const environmentIdFromUrl = getEnvironmentIdFromUrl();
    if (environmentIdFromUrl) {
      appContext.setEnvironmentId(environmentIdFromUrl);
      appContext.setEnvironmentIdLoadingStatus(LoadingStatus.Finished);
    } else {
      appContext.setEnvironmentIdLoadingStatus(LoadingStatus.Failed);
    }
  }

  if (
    appContext.environmentIdLoadingStatus === LoadingStatus.Finished
    && appContext.previewApiKeyLoadingStatus === LoadingStatus.NotLoaded
  ) {
    appContext.setPreviewApiKeyLoadingStatus(LoadingStatus.InProgress);
    const previewApiKey = await loadPreviewApikey();
    if (previewApiKey) {
      appContext.setPreviewApiKey(previewApiKey);
      appContext.setPreviewApiKeyLoadingStatus(LoadingStatus.Finished);
    } else {
      appContext.setPreviewApiKeyLoadingStatus(LoadingStatus.Failed);
    }
  }

  const requiredDataLoaded = [
    appContext.previewApiKeyLoadingStatus,
    appContext.environmentIdLoadingStatus,
  ].every(status => status === LoadingStatus.Finished);

  if (requiredDataLoaded) {
    appContext.setLoadingStatus(LoadingStatus.Finished);
  }
};
