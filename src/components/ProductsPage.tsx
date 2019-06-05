import React from 'react';
import { Link } from 'react-router-dom';
import { ProductsRoute } from '../constants/routePaths';
import {
  AppContextConsumer,
  IProduct,
} from '../context/AppContext';
import { PageContent } from './PageContent';
import './ProductsPage.css';

export const ProductsPage: React.FunctionComponent = () => (
  <PageContent title="Products">
    <AppContextConsumer>
      {appContext => (
        <div className="product-list">
          {appContext.products.map((product: IProduct) => <ProductPreview {...product} key={product.productId} />)}
        </div>)}
    </AppContextConsumer>
  </PageContent>
);

const ProductPreview = (props: IProduct): JSX.Element => {
  return (
    <div className="product-card">
      <img
        className="product-thumbnail"
        src={props.pictureUrl}
        alt="product thumbnail"
      />
      <Link to={`${ProductsRoute}/${props.productId}`}>
        {props.title}
      </Link>
    </div>
  );
};
