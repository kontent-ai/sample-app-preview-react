import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProductDetailsRoute,
  ProductDetailsRouteParams,
} from '../constants/routePaths';
import {
  AppContextConsumer,
  IProduct,
} from '../context/AppContext';
import { PageContent } from './PageContent';
import './ProductsPage.css';
import {buildPath} from "../utils/routeTransitionUtils";

export const ProductsPage: React.FunctionComponent = () => (
  <PageContent title="Products">
    <AppContextConsumer>
      {appContext => (
        <div className="product-list">
          {appContext.products.map((product: IProduct) => (
            <ProductPreview
              {...product}
              projectId={appContext.projectId}
              key={product.productId}
            />)
          )}
        </div>)}
    </AppContextConsumer>
  </PageContent>
);

interface IProductPreviewProps {
  readonly projectId: string;
  readonly productId: string;
  readonly title: string;
  readonly pictureUrl: string;
}

const ProductPreview = (props: IProductPreviewProps): JSX.Element => {
  const { productId, projectId } = props;
  return (
    <div className="product-card">
      <img
        className="product-thumbnail"
        src={props.pictureUrl}
        alt="product thumbnail"
      />
      <Link to={buildPath<ProductDetailsRouteParams>(ProductDetailsRoute, { projectId, productId })}>
        {props.title}
      </Link>
    </div>
  );
};
