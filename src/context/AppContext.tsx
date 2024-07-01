import { useAuth0 } from "@auth0/auth0-react";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { ErrorPage, ErrorPageType } from "../components/ErrorPage";
import { Loading } from "../components/Loading";
import { LoadingStatus } from "../enums/LoadingStatus";
import { createLoadPreviewApiKey } from "../factories/createLoadPreviewApiKey";
import { getEnvironmentIdFromUrl } from "../utils/environmentIdUtil";

type AppContextState = Readonly<{
  previewApiKey: string;
  environmentId: string;
}>;

const defaultAppContext: AppContextState = {
  previewApiKey: "",
  environmentId: "",
};

export const AppContext = React.createContext<AppContextState>(defaultAppContext);
const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export const AppContextComponent: React.FC<PropsWithChildren<{}>> = (props) => {
  const [previewApiKey, setPreviewApiKey] = useState("");
  const environmentId = useMemo(() => getEnvironmentIdFromUrl(), []);

  const [previewApiKeyLoadingStatus, setPreviewApiKeyLoadingStatus] = useState(LoadingStatus.NotLoaded);
  const [dataLoadingStatus, setDataLoadingStatus] = useState(LoadingStatus.NotLoaded);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!environmentId) {
      return;
    }

    setDataLoadingStatus(
      previewApiKeyLoadingStatus === LoadingStatus.Finished ? LoadingStatus.Finished : dataLoadingStatus,
    );

    if (previewApiKeyLoadingStatus !== LoadingStatus.NotLoaded) {
      return;
    }

    getAccessTokenSilently()
      .then(res => {
        setPreviewApiKeyLoadingStatus(LoadingStatus.InProgress);
        return createLoadPreviewApiKey({
          accessToken: res,
          environmentId: environmentId,
        })();
      })
      .then(res => {
        if (!res) {
          setPreviewApiKeyLoadingStatus(LoadingStatus.Failed);
          return;
        }

        setPreviewApiKey(res);
        setPreviewApiKeyLoadingStatus(LoadingStatus.Finished);
      });
  }, [dataLoadingStatus, environmentId, getAccessTokenSilently, previewApiKeyLoadingStatus]);

  if (!environmentId) {
    return <ErrorPage type={ErrorPageType.MissingEnvironmentId} />;
  }

  if (previewApiKeyLoadingStatus === LoadingStatus.Failed) {
    return <ErrorPage type={ErrorPageType.UnableToGetPreviewApiKey} />;
  }

  if (dataLoadingStatus === LoadingStatus.Finished) {
    const contextValue: AppContextState = { previewApiKey, environmentId };

    return (
      <AppContextProvider value={contextValue}>
        {props.children}
      </AppContextProvider>
    );
  }

  return <Loading />;
};
