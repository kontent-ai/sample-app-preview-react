import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProductDetailsRoute,
  ProductDetailsRouteParams,
} from '../constants/routePaths';
import {
  AppContextConsumer,
} from '../context/AppContext';
import { PageContent } from './PageContent';
import './ProductsPage.css';
import {buildPath} from "../utils/routeTransitionUtils";
import {ProductExampleContentType} from "../models/Product";

interface IProductsPageProps {
  readonly init: () => void;
}

class ProductsPage extends React.PureComponent<IProductsPageProps> {
  componentDidMount(): void {
    this.props.init();
  }

  render() {
    return (
      <PageContent title="Products">
        <AppContextConsumer>
          {appContext => (
            <div className="product-list">
              {appContext.products.map((product: ProductExampleContentType) => (
                <ProductPreview
                  title={product.name.value}
                  pictureUrl={product.image.value}
                  productId='123'
                  projectId={appContext.projectId}
                  key='123'
                />)
              )}
            </div>)}
        </AppContextConsumer>
      </PageContent>
    );
  }
}

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

const ProductsPageConnected = () => (
  <AppContextConsumer>
    {appContext => (
      <ProductsPage init={appContext.loadProducts} />
    )}
  </AppContextConsumer>
);

export { ProductsPageConnected as ProductsPage };
