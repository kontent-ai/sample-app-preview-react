import {ArticleExampleContentType} from "../models/Article";
import {DeliveryClient, IDeliveryClient, TypeResolver} from "kentico-cloud-delivery";
import {LandingPageExampleContentType} from "../models/LandingPage";
import {first} from "rxjs/operators";
import {ProductExampleContentType} from "../models/Product";

let deliveryClient: IDeliveryClient | null = null;

const ensureDeliveryClient = (projectId: string, previewApiKey: string): void => {
  if (deliveryClient) {
    return;
  }

  deliveryClient = new DeliveryClient({
    enablePreviewMode: true,
    enableAdvancedLogging: true,
    previewApiKey,
    projectId: projectId,
    basePreviewUrl: 'https://qa-preview-deliver.global.ssl.fastly.net',
    typeResolvers: [
      new TypeResolver('article_example_content_type', () => new ArticleExampleContentType()),
      new TypeResolver('landing_page_example_content_type', () => new LandingPageExampleContentType()),
      new TypeResolver('product_example_content_type', () => new ProductExampleContentType()),
    ],
  });
};


export const getAllArticles = (projectId: string, previewApiKey: string): Promise<Array<ArticleExampleContentType>> => {
  ensureDeliveryClient(projectId, previewApiKey);
  if (!deliveryClient) {
    throw 'Delivery client is not initialized yet';
  }

  return deliveryClient.items<ArticleExampleContentType>()
    .type('article_example_content_type')
    .toPromise()
    .then(response => {
      console.log('got response!', response);
      return response.items;
    })
    .catch(reason => {
      console.log(reason);
      return new Array<ArticleExampleContentType>();
    });
};

export const getProductsPage = (projectId: string, previewApiKey: string): Promise<Array<LandingPageExampleContentType>> => {
  ensureDeliveryClient(projectId, previewApiKey);
  if (!deliveryClient) {
    throw 'Delivery client is not initialized yet';
  }

  return deliveryClient.items<LandingPageExampleContentType>()
    .type('landing_page_example_content_type')
    .toPromise()
    .then(response => {
      console.log('got response!', response);
      return response.items;
    })
    .catch(reason => {
      console.log(reason);
      return new Array<LandingPageExampleContentType>();
    });
};
