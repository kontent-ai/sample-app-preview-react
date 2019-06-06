import React from 'react';
import {getProjectIdFromUrl} from "../utils/projectIdUtil";
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

// const dummyProducts: Array<IProduct> =
//   [
//     {
//       productId: '1',
//       title: 'Product 1',
//       pictureUrl: 'https://assets-us-01.kc-usercontent.com/4e9bdd7a-2db8-4c33-a13a-0c368ec2f108/6ccdb516-f4f7-408c-aa99-efb669a30c16/develop-with-ease.svg',
//       description: '<p>Product description 1</p>',
//     },
//     {
//       productId: '2',
//       title: 'Product 2',
//       pictureUrl: 'https://assets-us-01.kc-usercontent.com/4e9bdd7a-2db8-4c33-a13a-0c368ec2f108/ca553e07-ae21-434d-85bc-fcfbecb528ce/create-even-more.svg',
//       description: '<p>Product description 2</p>',
//     },
//     {
//       productId: '3',
//       title: 'Product 3',
//       pictureUrl: 'https://assets-us-01.kc-usercontent.com/4e9bdd7a-2db8-4c33-a13a-0c368ec2f108/af74e81a-f17b-408c-a673-50134c15abb7/integrate-with-existing.svg',
//       description: '<p>Product description 3</p>',
//     },
//   ];
//
// const dummyPages: Array<IPage> = [
//   {
//     codename: 'welcome',
//     title: 'Welcome',
//     content: '<p>This is a&nbsp;<strong>content item</strong>, which holds your content based on templates you define in your&nbsp;<strong>content types.</strong>&nbsp;To see how this one is defined, click&nbsp;<em>Content models</em>&nbsp;in the left menu and look at&nbsp;<em>Article—example content type</em>.</p><p>In this content item, you can add the actual content that will be displayed in your final app. Your content can include formatted text and images.</p><p>\n<a href="https://docs.kenticocloud.com/tutorials/compose-and-link-content/create-content/composing-content-in-the-rich-text-editor#a-adding-images">Add an image</a>&nbsp;below this paragraph.</p><p><br /></p>\n<p>To make your content available outside of Kentico Cloud, click <strong>Change workflow or publish </strong>on the right of the screen and then&nbsp;<strong>Publish</strong>&nbsp;your content.</p>',
//   },
// ];

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
              projectId: appContext.projectId,
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
