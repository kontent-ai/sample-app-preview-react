import React from 'react';
import {
  AppContextConsumer,
  IProduct,
} from '../context/AppContext';
import { PageContent } from './PageContent';
import './ProductDetailsPage.css';

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
        return <p>hm</p>;
        }
      }
    </AppContextConsumer>
  );
};
