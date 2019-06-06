import React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {AuthContextConsumer, IAuthContext} from "./AuthContext";
import {AppContextConsumer, IAppContext} from "./AppContext";
import {Callback} from "../components/Callback";

import {ErrorPage, ErrorPageType} from "../components/ErrorPage";
import {createFetchData, createLoadApplicationData, createLoadPreviewApiKey} from "../utils/previewApiKeyUtils";
import {getPreviewApiKey} from "../repositories/previewApiKeyRepository";
import {LoadingStatus} from "../enums/LoadingStatus";

interface IAppContextInitializationProps extends RouteComponentProps {
  readonly authContext: IAuthContext;
  readonly appContext: IAppContext;
  readonly loadApplicationData: () => void;
}

class AppContextInitialization extends React.PureComponent<IAppContextInitializationProps, {}> {

  componentDidUpdate(prevProps: IAppContextInitializationProps): void {
    // todo solve
    this.props.loadApplicationData();
  }

  render() {
    const { projectIdLoadingStatus, projectId, previewApiKeyLoadingStatus, dataLoadingStatus } = this.props.appContext;
    if (projectIdLoadingStatus === LoadingStatus.Failed) {
      return <ErrorPage type={ErrorPageType.MissingProjectId}/>
    }

    if (previewApiKeyLoadingStatus === LoadingStatus.Failed) {
      return <ErrorPage type={ErrorPageType.UnableToGetPreviewApiKey}/>
    }

    if (dataLoadingStatus === LoadingStatus.Finished) {
      return this.props.children;
    }

    return <Callback/>
  }
}

const AppContextInitializationConnected = (props: RouteComponentProps) => (
  <AppContextConsumer>
    {appContext => (
      <AuthContextConsumer>
        {authContext => {
          const loadApplicationData = createLoadApplicationData({
            appContext,
            authContext,
            fetchData: createFetchData(),
            loadPreviewApikey: createLoadPreviewApiKey({
              authContext,
              appContext,
              getPreviewApiKey: getPreviewApiKey,
            })
          });
          return (<AppContextInitialization
            loadApplicationData={loadApplicationData}
            authContext={authContext}
            appContext={appContext}
            {...props}
          />);
        }}
      </AuthContextConsumer>
    )}
  </AppContextConsumer>
);

const AppContextInitializationWithRouter = withRouter<RouteComponentProps>(AppContextInitializationConnected);
export { AppContextInitializationWithRouter as AppContextInitialization };
