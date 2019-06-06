import React from 'react';
import {LoadingStatus} from "../enums/LoadingStatus";

interface IAppContextState {
  readonly dataLoadingStatus: LoadingStatus;
  readonly projectId: string;
  readonly projectIdLoadingStatus: LoadingStatus;
  readonly pages: Array<IPage>;
  readonly products: Array<IProduct>;
}

interface IAppContextProps {
  readonly addProduct: (product: IProduct) => void;
  readonly setProjectId: (projectId: string) => void;
  readonly setLoadingStatus: (loadingStatus: LoadingStatus) => void;
  readonly setProjectIdLoadingStatus: (projectIdLoadingStatus: LoadingStatus) => void;
}

export interface IAppContext extends IAppContextState, IAppContextProps {
}

export interface IProduct {
  readonly productId: string;
  readonly title: string;
  readonly pictureUrl: string;
  readonly description: string;
}

export interface IPage {
  readonly codename: string;
  readonly title: string;
  readonly content: string;
}

const defaultAppContext: IAppContext = {
  dataLoadingStatus: LoadingStatus.NotLoaded,
  projectId: '',
  projectIdLoadingStatus: LoadingStatus.NotLoaded,
  pages: new Array<IPage>(),
  products: new Array<IProduct>(),
  addProduct: () => undefined,
  setProjectId: () => undefined,
  setLoadingStatus: () => undefined,
  setProjectIdLoadingStatus: () => undefined,
};

const dummyProducts: Array<IProduct> =
  [
    {
      productId: '1',
      title: 'Product 1',
      pictureUrl: 'https://assets-us-01.kc-usercontent.com/4e9bdd7a-2db8-4c33-a13a-0c368ec2f108/6ccdb516-f4f7-408c-aa99-efb669a30c16/develop-with-ease.svg',
      description: '<p>Product description 1</p>',
    },
    {
      productId: '2',
      title: 'Product 2',
      pictureUrl: 'https://assets-us-01.kc-usercontent.com/4e9bdd7a-2db8-4c33-a13a-0c368ec2f108/ca553e07-ae21-434d-85bc-fcfbecb528ce/create-even-more.svg',
      description: '<p>Product description 2</p>',
    },
    {
      productId: '3',
      title: 'Product 3',
      pictureUrl: 'https://assets-us-01.kc-usercontent.com/4e9bdd7a-2db8-4c33-a13a-0c368ec2f108/af74e81a-f17b-408c-a673-50134c15abb7/integrate-with-existing.svg',
      description: '<p>Product description 3</p>',
    },
  ];

const dummyPages: Array<IPage> = [
  {
    codename: 'welcome',
    title: 'Welcome',
    content: '<p>This is a&nbsp;<strong>content item</strong>, which holds your content based on templates you define in your&nbsp;<strong>content types.</strong>&nbsp;To see how this one is defined, click&nbsp;<em>Content models</em>&nbsp;in the left menu and look at&nbsp;<em>Article—example content type</em>.</p><p>In this content item, you can add the actual content that will be displayed in your final app. Your content can include formatted text and images.</p><p>\n<a href="https://docs.kenticocloud.com/tutorials/compose-and-link-content/create-content/composing-content-in-the-rich-text-editor#a-adding-images">Add an image</a>&nbsp;below this paragraph.</p><p><br /></p>\n<p>To make your content available outside of Kentico Cloud, click <strong>Change workflow or publish </strong>on the right of the screen and then&nbsp;<strong>Publish</strong>&nbsp;your content.</p>',
  },
];


const context = React.createContext<IAppContext>(defaultAppContext);
const AppContextProvider = context.Provider;

export const AppContextConsumer = context.Consumer;

export class AppContext extends React.PureComponent<{}, IAppContextState> {
  readonly state = {
    dataLoadingStatus: LoadingStatus.NotLoaded,
    projectId: '',
    projectIdLoadingStatus: LoadingStatus.NotLoaded,
    pages: dummyPages,
    products: dummyProducts,
  };

  setProjectId = (projectId: string) => {
    this.setState({ projectId });
  };

  addProduct = (product: IProduct) => {
    this.setState((state) => ({ products: state.products.concat(product) }));
  };

  setLoadingStatus = (loadingStatus: LoadingStatus) => {
    this.setState({ dataLoadingStatus: loadingStatus })
  };

  setProjectIdLoadingStatus = (projectIdLoadingStatus: LoadingStatus) => {
    this.setState({ projectIdLoadingStatus });
  };

  // componentDidUpdate(prevProps: IAppContextComponentProps): void {
  //   if (this.state.projectId === '') {
  //     const projectIdFromUrl = getProjectIdFromUrl();
  //     this.setState({
  //       projectId: projectIdFromUrl ? projectIdFromUrl : '',
  //     })
  //   } else {
  //     const { authContext } = this.props;
  //     const { projectId } = this.state;
  //
  //     if (authContext.previewApiKey === '') {
  //       this.props.authContext.loadPreviewApiKey(projectId);
  //     }
  //
  //     if (prevProps.authContext.previewApiKey === '' && this.props.authContext.previewApiKey !== '') {
  //       this.fetchData();
  //     }
  //   }
  // }
  //
  // fetchData = () => {
  //   console.log('now fetch data');
  // };

  render() {
    const { products, pages, projectId, dataLoadingStatus, projectIdLoadingStatus } = this.state;
    const contextValue: IAppContext = {
      dataLoadingStatus,
      projectId,
      projectIdLoadingStatus,
      pages,
      products,
      addProduct: this.addProduct,
      setProjectId: this.setProjectId,
      setLoadingStatus: this.setLoadingStatus,
      setProjectIdLoadingStatus: this.setProjectIdLoadingStatus,
    };

    return (
      <AppContextProvider value={contextValue}>
        {this.props.children}
      </AppContextProvider>
    );
  }
}

// const AppContextWithAuthContext = (props: any) => (
//   <AuthContextConsumer>
//     {authContext => (<AppContext authContext={authContext} {...props}/> )}
//   </AuthContextConsumer>
// );
//
// const AppContextWithRouter = withRouter<RouteComponentProps>(AppContext);
// export { AppContextWithRouter as AppContext };
