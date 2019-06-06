import React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {AuthContextConsumer, IAuthContext} from "./AuthContext";
import {AppContextConsumer, IAppContext} from "./AppContext";
import {Callback} from "../components/Callback";

import {ErrorPage} from "../components/ErrorPage";
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
    this.props.loadApplicationData();
  }

  render() {
    const { projectIdLoadingStatus, projectId } = this.props.appContext;
    if (projectIdLoadingStatus === LoadingStatus.Failed) {
      return <ErrorPage/>
    }

    if (projectId === '') {
      return <Callback/>
    }

    return this.props.children;
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
