import { ArticleExampleContentType } from "../models/article_example_content_type";
import { camelCasePropertyNameResolver, createDeliveryClient, IDeliveryClient} from "@kentico/kontent-delivery";
import { LandingPageExampleContentType } from "../models/landing_page_example_content_type";
import { ProductExampleContentType } from "../models/product_example_content_type";
import packageInfo from "../../package.json";

let deliveryClient: IDeliveryClient | null = null;

const sourceTrackingHeaderName = "X-KC-SOURCE";

const ensureDeliveryClient = (projectId: string, previewApiKey: string): void => {
  if (deliveryClient) {
    return;
  }

  deliveryClient = createDeliveryClient({
    previewApiKey,
    projectId: projectId,
    proxy: {
      basePreviewUrl: process.env.REACT_APP_DELIVER_URL,
    },
    defaultQueryConfig: {
      usePreviewMode: true
    },
    globalHeaders: (_queryConfig) => [
      {
        header: sourceTrackingHeaderName,
        value: `${packageInfo.name};${packageInfo.version}`,
      },
    ],
    propertyNameResolver: camelCasePropertyNameResolver
  });
};


export const getAllArticles = (projectId: string, previewApiKey: string): Promise<Array<ArticleExampleContentType>> => {
  ensureDeliveryClient(projectId, previewApiKey);
  if (!deliveryClient) {
    throw new Error('Delivery client is not initialized yet');
  }

  return deliveryClient.items<ArticleExampleContentType>()
    .type('article_example_content_type')
    .toPromise()
    .then(response => {
      return response.data.items;
    })
    .catch(reason => {
      console.log(reason);
      return new Array<ArticleExampleContentType>();
    });
};

export const getProductsPage = (projectId: string, previewApiKey: string): Promise<Array<LandingPageExampleContentType>> => {
  ensureDeliveryClient(projectId, previewApiKey);
  if (!deliveryClient) {
    throw new Error('Delivery client is not initialized yet');
  }

  return deliveryClient.items<LandingPageExampleContentType>()
    .type('landing_page_example_content_type')
    .toPromise()
    .then(response => {
      return response.data.items;
    })
    .catch(reason => {
      console.log(reason);
      return new Array<LandingPageExampleContentType>();
    });
};

export const getProductDetailsByUrlSlug = (projectId: string, previewApiKey: string, urlPattern: string): Promise<ProductExampleContentType | undefined | void> => {
  ensureDeliveryClient(projectId, previewApiKey);
  if (!deliveryClient) {
    throw new Error('Delivery client is not initialized yet');
  }

  return deliveryClient.items<ProductExampleContentType>()
    .type('product_example_content_type')
    .equalsFilter('elements.url', urlPattern)
    .toPromise()
    .then(response => {
      return response.data.items[0];
    })
    .catch(reason => {
      console.log(reason);
    })
};
