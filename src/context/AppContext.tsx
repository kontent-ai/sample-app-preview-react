import React from "react";
import { LoadingStatus } from "../enums/LoadingStatus";
import { PollingStatus } from "../enums/PollingStatus";
import { ArticleExampleContentType } from "../models/article_example_content_type";
import { ProductExampleContentType } from "../models/product_example_content_type";
import { getAllArticles, getProductsPage, getProductDetailsByUrlSlug } from "../repositories/contentItemRepository";

interface IAppContextState {
  readonly dataLoadingStatus: LoadingStatus;
  readonly dataPollingStatus: PollingStatus;
  readonly previewApiKey: string;
  readonly previewApiKeyLoadingStatus: LoadingStatus;
  readonly environmentId: string;
  readonly environmentIdLoadingStatus: LoadingStatus;
  readonly articles: Array<ArticleExampleContentType>;
  readonly productsByUrlSlug: { [key: string]: ProductExampleContentType };
}

interface IAppContextProps {
  readonly loadWelcomePage: () => void;
  readonly loadProduct: (productUrlSlug: string) => void;
  readonly loadProducts: () => void;
  readonly getProducts: () => Array<ProductExampleContentType>;
  readonly setEnvironmentId: (environmentId: string) => void;
  readonly setLoadingStatus: (loadingStatus: LoadingStatus) => void;
  readonly setEnvironmentIdLoadingStatus: (environmentIdLoadingStatus: LoadingStatus) => void;
  readonly setPreviewApiKey: (previewApiKey: string) => void;
  readonly setPreviewApiKeyLoadingStatus: (previewApiKeyLoadingStatus: LoadingStatus) => void;
}

export interface IAppContext extends IAppContextState, IAppContextProps {
}

const defaultAppContext: IAppContext = {
  dataLoadingStatus: LoadingStatus.NotLoaded,
  dataPollingStatus: PollingStatus.Stopped,
  previewApiKey: "",
  previewApiKeyLoadingStatus: LoadingStatus.NotLoaded,
  environmentId: "",
  environmentIdLoadingStatus: LoadingStatus.NotLoaded,
  articles: new Array<ArticleExampleContentType>(),
  productsByUrlSlug: {},
  loadWelcomePage: () => undefined,
  loadProduct: () => undefined,
  loadProducts: () => undefined,
  getProducts: () => [],
  setEnvironmentId: () => undefined,
  setLoadingStatus: () => undefined,
  setEnvironmentIdLoadingStatus: () => undefined,
  setPreviewApiKey: () => undefined,
  setPreviewApiKeyLoadingStatus: () => undefined,
};

export const AppContext = React.createContext<IAppContext>(defaultAppContext);
const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export class AppContextComponent extends React.PureComponent<{}, IAppContextState> {
  readonly state = {
    dataLoadingStatus: LoadingStatus.NotLoaded,
    dataPollingStatus: PollingStatus.Stopped,
    previewApiKey: "",
    previewApiKeyLoadingStatus: LoadingStatus.NotLoaded,
    environmentId: "",
    environmentIdLoadingStatus: LoadingStatus.NotLoaded,
    articles: new Array<ArticleExampleContentType>(),
    productsByUrlSlug: {},
  };

  private _dataPollingInterval: NodeJS.Timer | null = null;

  private _startDataPolling = (callback: () => void): void => {
    if (this._dataPollingInterval !== null) {
      clearInterval(this._dataPollingInterval);
    }

    this._dataPollingInterval = setInterval(async () => {
      this.setState({ dataPollingStatus: PollingStatus.Fetching });
      await callback();
      this.setState({ dataPollingStatus: PollingStatus.Waiting });
    }, 3000);
    this.setState({ dataPollingStatus: PollingStatus.Waiting });
  };

  setEnvironmentId = (environmentId: string) => {
    this.setState({ environmentId: environmentId });
  };

  setLoadingStatus = (loadingStatus: LoadingStatus) => {
    this.setState({ dataLoadingStatus: loadingStatus });
  };

  setEnvironmentIdLoadingStatus = (environmentIdLoadingStatus: LoadingStatus) => {
    this.setState({ environmentIdLoadingStatus: environmentIdLoadingStatus });
  };

  setPreviewApiKey = (previewApiKey: string) => {
    this.setState({ previewApiKey });
  };

  setPreviewApiKeyLoadingStatus = (previewApiKeyLoadingStatus: LoadingStatus) => {
    this.setState({ previewApiKeyLoadingStatus });
  };

  private _loadWelcomePageData = async () => {
    const articles = await getAllArticles(this.state.environmentId, this.state.previewApiKey);
    this.setState({ articles });
  };

  loadWelcomePage = async () => {
    this._startDataPolling(this._loadWelcomePageData);
    await this._loadWelcomePageData();
  };

  private _loadProductsData = async () => {
    const productsPage = await getProductsPage(this.state.environmentId, this.state.previewApiKey);
    if (productsPage && productsPage[0]) {
      const newProducts = productsPage[0].elements.productList.linkedItems as Array<ProductExampleContentType>;
      this.setState((state) => ({
        productsByUrlSlug: newProducts
          .reduce(
            (byId, product: ProductExampleContentType) => ({ ...byId, [product.elements.url.value]: product }),
            Object.assign({}, state.productsByUrlSlug),
          ),
      }));
    }
  };

  loadProducts = async () => {
    this._startDataPolling(this._loadProductsData);
    await this._loadProductsData();
  };

  private _loadProductData = async (productUrlSlug: string) => {
    const product = await getProductDetailsByUrlSlug(
      this.state.environmentId,
      this.state.previewApiKey,
      productUrlSlug,
    );
    if (product) {
      this.setState((state) => ({
        productsByUrlSlug: ({ ...Object.assign({}, state.productsByUrlSlug), [product.elements.url.value]: product }),
      }));
    }
  };

  loadProduct = async (productUrlSlug: string) => {
    this._startDataPolling(() => this._loadProductData(productUrlSlug));
    await this._loadProductData(productUrlSlug);
  };

  getProducts = (): Array<ProductExampleContentType> => Object.values(this.state.productsByUrlSlug);

  render() {
    const {
      productsByUrlSlug,
      articles,
      environmentId,
      dataLoadingStatus,
      dataPollingStatus,
      environmentIdLoadingStatus,
      previewApiKey,
      previewApiKeyLoadingStatus,
    } = this.state;

    const contextValue: IAppContext = {
      dataLoadingStatus,
      dataPollingStatus,
      previewApiKey,
      previewApiKeyLoadingStatus,
      environmentId: environmentId,
      environmentIdLoadingStatus: environmentIdLoadingStatus,
      articles,
      productsByUrlSlug,
      loadWelcomePage: this.loadWelcomePage,
      loadProduct: this.loadProduct,
      loadProducts: this.loadProducts,
      getProducts: this.getProducts,
      setEnvironmentId: this.setEnvironmentId,
      setLoadingStatus: this.setLoadingStatus,
      setEnvironmentIdLoadingStatus: this.setEnvironmentIdLoadingStatus,
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
