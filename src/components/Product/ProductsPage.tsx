import React from 'react';
import {
  AppContextConsumer,
} from '../../context/AppContext';
import { PageContent } from '../PageContent';
import './ProductsPage.css';
import {ProductExampleContentType} from "../../models/Product";
import {ProductCard} from "./ProductCard";

interface IProductsPageProps {
  readonly init: () => void;
  readonly projectId: string;
  readonly products: Array<ProductExampleContentType>;
}

class ProductsPage extends React.PureComponent<IProductsPageProps> {
  componentDidMount(): void {
    this.props.init();
  }

  render() {
    const { projectId, products } = this.props;
    return (
      <PageContent title="Products">
        <div className="product-list">
          {products.map((product: ProductExampleContentType) => (
            <ProductCard
              title={product.name.value}
              pictureUrl={product.image.assets[0] ? product.image.assets[0].url : ''}
              productId={product.system.codename}
              projectId={projectId}
              key={product.system.id}
            />)
          )}
        </div>
      </PageContent>
    );
  }
}

const ProductsPageConnected = () => (
  <AppContextConsumer>
    {appContext => (
      <ProductsPage
        init={appContext.loadProducts}
        projectId={appContext.projectId}
        products={appContext.products}
      />
    )}
  </AppContextConsumer>
);

export { ProductsPageConnected as ProductsPage };
