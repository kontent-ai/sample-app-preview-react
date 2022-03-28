import React from 'react';
import {
  AppContextConsumer,
} from '../../context/AppContext';
import './ProductDetailsPage.css';
import './Testimonial.css';
import { ProductDetailsRouteParams } from "../../constants/routePaths";
import { ProductExampleContentType } from "../../models/product_example_content_type";
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
      const pictureUrl = product.elements.image.value[0] ? product.elements.image.value[0].url : '';
      return (
        <PageContent title={product.elements.name.value}>
          {pictureUrl && (
            <img
              className="product-details__image"
              alt={product.elements.name.value}
              src={product.elements.image.value[0] ? product.elements.image.value[0].url : ''}
            />
          )}

          <div
            className="product-details__description"
            dangerouslySetInnerHTML={{ __html: product.elements.description.value }}
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
        product={appContext.productsByUrlSlug[match.params.productUrlSlug]}
        init={() => appContext.loadProduct(match.params.productUrlSlug)}
      />
    )}
  </AppContextConsumer>
);

export { ProductDetailsPageConnected as ProductDetailsPage }
