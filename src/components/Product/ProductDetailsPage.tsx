import React from 'react';
import {
  AppContextConsumer,
} from '../../context/AppContext';
import './ProductDetailsPage.css';
import { ProductDetailsRouteParams } from "../../constants/routePaths";
import { ProductExampleContentType } from "../../models/Product";
import { PageContent } from "../PageContent";

interface IProductDetailsPage {
  readonly product: ProductExampleContentType;
  readonly init: () => void;
}

class ProductDetailsPage extends React.PureComponent<IProductDetailsPage> {
  componentDidMount(): void {
    this.props.init();
  }

  render() {
    const { product } = this.props;
    if (product) {
      const pictureUrl = product.image.assets[0] ? product.image.assets[0].url : '';
      return (
        <PageContent title={product.name.value}>
          {pictureUrl && (
            <img
              className="product-details__image"
              alt={product.name.value}
              src={product.image.assets[0] ? product.image.assets[0].url : ''}
            />
          )}

          <div
            className="product-details__description"
            dangerouslySetInnerHTML={{ __html: product.description.getHtml() }}
          />
        </PageContent>);
    }

    return <p>There's no such product</p>;
  }
}

interface IProductDetailsPageConnectedProps {
  readonly match: {
    readonly params: ProductDetailsRouteParams;
  };
}

const ProductDetailsPageConnected: React.FunctionComponent<IProductDetailsPageConnectedProps> = ({ match }) => (
  <AppContextConsumer>
    {appContext => (
      <ProductDetailsPage
        product={appContext.products.filter(product => product.url.value === match.params.productId)[0]}
        init={appContext.loadProducts}
      />
    )}
  </AppContextConsumer>
);

export { ProductDetailsPageConnected as ProductDetailsPage }
