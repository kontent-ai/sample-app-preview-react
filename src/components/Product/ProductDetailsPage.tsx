import React from 'react';
import {
  AppContextConsumer,
} from '../../context/AppContext';
import './ProductDetailsPage.css';
import {ProductDetailsRouteParams} from "../../constants/routePaths";
import {ProductExampleContentType} from "../../models/Product";
import {PageContent} from "../PageContent";

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
      return (
        <PageContent title={product.name.value}>
          <img
            className="product-image"
            alt={product.title}
            src={product.pictureUrl}
          />
          {/* TODO: Check if using dangerouslySetInnerHTML is the best practice to shown html content received from Deliver */}
          <div dangerouslySetInnerHTML={{ __html: product.description.value }} />
        </PageContent>);
    }

    return null;
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
        product={appContext.products.filter(product => product.system.codename === match.params.productId)[0]}
        init={appContext.loadProducts}
      />
    )}
  </AppContextConsumer>
);

export { ProductDetailsPageConnected as ProductDetailsPage }
