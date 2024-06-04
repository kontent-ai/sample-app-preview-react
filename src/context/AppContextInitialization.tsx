import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AuthContextConsumer, IAuthContext } from "./AuthContext";
import { AppContextConsumer, IAppContext } from "./AppContext";
import { Loading } from "../components/Loading";
import { ErrorPage, ErrorPageType } from "../components/ErrorPage";
import { LoadingStatus } from "../enums/LoadingStatus";
import { createLoadApplicationData } from "../factories/createLoadApplicationData";
import { createLoadPreviewApiKey } from "../factories/createLoadPreviewApiKey";
import { getEnvironmentIdFromUrl } from "../utils/environmentIdUtil";

interface IAppContextInitializationProps extends RouteComponentProps {
  readonly authContext: IAuthContext;
  readonly appContext: IAppContext;
  readonly loadApplicationData: () => void;
}

class AppContextInitialization extends React.PureComponent<IAppContextInitializationProps, {}> {
  componentDidUpdate(): void {
    this.props.loadApplicationData();
  }

  render() {
    const { environmentIdLoadingStatus, previewApiKeyLoadingStatus, dataLoadingStatus } = this.props.appContext;
    if (environmentIdLoadingStatus === LoadingStatus.Failed) {
      return <ErrorPage type={ErrorPageType.MissingEnvironmentId} />;
    }

    if (previewApiKeyLoadingStatus === LoadingStatus.Failed) {
      return <ErrorPage type={ErrorPageType.UnableToGetPreviewApiKey} />;
    }

    if (dataLoadingStatus === LoadingStatus.Finished) {
      return this.props.children;
    }

    return <Loading />;
  }
}

const AppContextInitializationConnected = (props: RouteComponentProps) => (
  <AppContextConsumer>
    {appContext => (
      <AuthContextConsumer>
        {authContext => {
          const loadApplicationData = createLoadApplicationData({
            appContext,
            getEnvironmentIdFromUrl: getEnvironmentIdFromUrl,
            loadPreviewApikey: createLoadPreviewApiKey({
              authContext,
              appContext,
            }),
          });

          return (
            <AppContextInitialization
              loadApplicationData={loadApplicationData}
              authContext={authContext}
              appContext={appContext}
              {...props}
            />
          );
        }}
      </AuthContextConsumer>
    )}
  </AppContextConsumer>
);

const AppContextInitializationWithRouter = withRouter(AppContextInitializationConnected);
export { AppContextInitializationWithRouter as AppContextInitialization };
