import { camelCasePropertyNameResolver, createDeliveryClient } from "@kontent-ai/delivery-sdk";

import packageInfo from "../../package.json";
import { ArticleExampleContentType } from "../models/article_example_content_type";
import { LandingPageExampleContentType } from "../models/landing_page_example_content_type";
import { ProductExampleContentType } from "../models/product_example_content_type";

const sourceTrackingHeaderName = "X-KC-SOURCE";

const createClient = (environmentId: string, previewApiKey: string) =>
  createDeliveryClient({
    previewApiKey,
    environmentId,
    proxy: {
      basePreviewUrl: import.meta.env.VITE_DELIVER_URL,
    },
    defaultQueryConfig: {
      usePreviewMode: true,
    },
    globalHeaders: () => [
      {
        header: sourceTrackingHeaderName,
        value: `${packageInfo.name};${packageInfo.version}`,
      },
    ],
    propertyNameResolver: camelCasePropertyNameResolver,
  });

export const getAllArticles = (
  environmentId: string,
  previewApiKey: string,
): Promise<Array<ArticleExampleContentType>> => {
  const client = createClient(environmentId, previewApiKey);

  return client.items<ArticleExampleContentType>()
    .type("article_example_content_type")
    .toPromise()
    .then(response => {
      return response.data.items;
    })
    .catch(reason => {
      console.log(reason);
      return new Array<ArticleExampleContentType>();
    });
};

export const getProductsPage = (
  environmentId: string,
  previewApiKey: string,
): Promise<Array<LandingPageExampleContentType>> => {
  const client = createClient(environmentId, previewApiKey);

  return client.items<LandingPageExampleContentType>()
    .type("landing_page_example_content_type")
    .toPromise()
    .then(response => {
      return response.data.items;
    })
    .catch(reason => {
      console.log(reason);
      return new Array<LandingPageExampleContentType>();
    });
};

export const getProductDetailsByUrlSlug = (
  environmentId: string,
  previewApiKey: string,
  urlPattern: string,
) => {
  const client = createClient(environmentId, previewApiKey);

  return client.items<ProductExampleContentType>()
    .type("product_example_content_type")
    .equalsFilter("elements.url", urlPattern)
    .toPromise()
    .then(response => response.data.items[0]);
};
