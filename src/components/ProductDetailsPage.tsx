import React from 'react';
import {
  AppContextConsumer,
  IProduct,
} from '../context/AppContext';
import { PageContent } from './PageContent';
import './ProductDetailPage.css';

interface IProductRouteParams {
  readonly match: {
    readonly params: {
      readonly productId: string;
    }
  }
}

export const ProductDetailsPage = ({ match: { params } }: IProductRouteParams): JSX.Element => {
  return (
    <AppContextConsumer>
      {appContext => {
        const product = appContext.products.find(product => product.productId === params.productId) as IProduct;
        if (product) {
          return (
            <PageContent title={product.title}>
              <img
                className="product-image"
                alt={product.title}
                src={product.pictureUrl}
              />
              {/* TODO: Check if using dangerouslySetInnerHTML is the best practice to shown html content received from Deliver */}
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </PageContent>);
        }
      }}
    </AppContextConsumer>
  );
};
