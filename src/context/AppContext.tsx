import React from 'react';
import { LoadingStatus } from "../enums/LoadingStatus";
import { getAllArticles, getProductsPage } from "../repositories/contentItemRepository";
import { ArticleExampleContentType } from "../models/Article";
import { ProductExampleContentType } from "../models/Product";
import { clearInterval, setInterval } from "timers";

interface IAppContextState {
  readonly dataLoadingStatus: LoadingStatus;
  readonly previewApiKey: string;
  readonly previewApiKeyLoadingStatus: LoadingStatus;
  readonly projectId: string;
  readonly projectIdLoadingStatus: LoadingStatus;
  readonly articles: Array<ArticleExampleContentType>;
  readonly products: Array<ProductExampleContentType>;
}

interface IAppContextProps {
  readonly loadWelcomePage: () => void;
  readonly loadProducts: () => void;
  readonly setProjectId: (projectId: string) => void;
  readonly setLoadingStatus: (loadingStatus: LoadingStatus) => void;
  readonly setProjectIdLoadingStatus: (projectIdLoadingStatus: LoadingStatus) => void;
  readonly setPreviewApiKey: (previewApiKey: string) => void;
  readonly setPreviewApiKeyLoadingStatus: (previewApiKeyLoadingStatus: LoadingStatus) => void;
}

export interface IAppContext extends IAppContextState, IAppContextProps {
}

const defaultAppContext: IAppContext = {
  dataLoadingStatus: LoadingStatus.NotLoaded,
  previewApiKey: '',
  previewApiKeyLoadingStatus: LoadingStatus.NotLoaded,
  projectId: '',
  projectIdLoadingStatus: LoadingStatus.NotLoaded,
  articles: new Array<ArticleExampleContentType>(),
  products: new Array<ProductExampleContentType>(),
  loadWelcomePage: () => undefined,
  loadProducts: () => undefined,
  setProjectId: () => undefined,
  setLoadingStatus: () => undefined,
  setProjectIdLoadingStatus: () => undefined,
  setPreviewApiKey: () => undefined,
  setPreviewApiKeyLoadingStatus: () => undefined,
};

const context = React.createContext<IAppContext>(defaultAppContext);
const AppContextProvider = context.Provider;
export const AppContextConsumer = context.Consumer;

export class AppContext extends React.PureComponent<{}, IAppContextState> {

  readonly state = {
    dataLoadingStatus: LoadingStatus.NotLoaded,
    previewApiKey: '',
    previewApiKeyLoadingStatus: LoadingStatus.NotLoaded,
    projectId: '',
    projectIdLoadingStatus: LoadingStatus.NotLoaded,
    articles: new Array<ArticleExampleContentType>(),
    products: new Array<ProductExampleContentType>(),
  };

  private _dataPollingInterval: NodeJS.Timer | null = null;

  private _startDataPolling = (callback: () => void): void => {
    if (this._dataPollingInterval !== null) {
      clearInterval(this._dataPollingInterval);
    }

    this._dataPollingInterval = setInterval(callback, 3000);
  };

  setProjectId = (projectId: string) => {
    this.setState({ projectId });
  };

  setLoadingStatus = (loadingStatus: LoadingStatus) => {
    this.setState({ dataLoadingStatus: loadingStatus })
  };

  setProjectIdLoadingStatus = (projectIdLoadingStatus: LoadingStatus) => {
    this.setState({ projectIdLoadingStatus });
  };

  setPreviewApiKey = (previewApiKey: string) => {
    this.setState({ previewApiKey });
  };

  setPreviewApiKeyLoadingStatus = (previewApiKeyLoadingStatus: LoadingStatus) => {
    this.setState({ previewApiKeyLoadingStatus });
  };

  private _loadWelcomePageData = async () => {
    const articles = await getAllArticles(this.state.projectId, this.state.previewApiKey);
    this.setState({ articles });
  };

  loadWelcomePage = async () => {
    this._startDataPolling(this._loadWelcomePageData);
    await this._loadWelcomePageData();
  };

  private _loadProductsData = async () => {
    const productsPage = await getProductsPage(this.state.projectId, this.state.previewApiKey);
    if (productsPage && productsPage[0]) {
      this.setState({ products: productsPage[0].productList });
    }
  };

  loadProducts = async () => {
    this._startDataPolling(this._loadProductsData);
    await this._loadProductsData();
  };

  render() {
    const {
      products,
      articles,
      projectId,
      dataLoadingStatus,
      projectIdLoadingStatus,
      previewApiKey,
      previewApiKeyLoadingStatus,
    } = this.state;

    const contextValue: IAppContext = {
      dataLoadingStatus,
      previewApiKey,
      previewApiKeyLoadingStatus,
      projectId,
      projectIdLoadingStatus,
      articles,
      products,
      loadWelcomePage: this.loadWelcomePage,
      loadProducts: this.loadProducts,
      setProjectId: this.setProjectId,
      setLoadingStatus: this.setLoadingStatus,
      setProjectIdLoadingStatus: this.setProjectIdLoadingStatus,
      setPreviewApiKey: this.setPreviewApiKey,
      setPreviewApiKeyLoadingStatus: this.setPreviewApiKeyLoadingStatus,
    };

    return (
      <AppContextProvider value={contextValue}>
        {this.props.children}
      </AppContextProvider>
    );
  }
}
