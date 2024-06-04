import React from "react";
import { AppContextConsumer } from "../../context/AppContext";
import { PageContent } from "../PageContent";
import "./ProductsPage.css";
import { ProductExampleContentType } from "../../models/product_example_content_type";
import { ProductCard } from "./ProductCard";
import classNames from "classnames";

interface IProductsPageProps {
  readonly init: () => void;
  readonly environmentId: string;
  readonly products: Array<ProductExampleContentType>;
}

class ProductsPage extends React.PureComponent<IProductsPageProps> {
  componentDidMount(): void {
    this.props.init();
  }

  render() {
    const { environmentId, products } = this.props;
    const isSingleProduct = products.length === 1;
    return (
      <PageContent title="Products">
        <div
          className={classNames("products-page", {
            "products-page--has-single-product": isSingleProduct,
          })}
        >
          {products && products.map((product: ProductExampleContentType) => (
            <ProductCard
              title={product.elements.name.value}
              pictureUrl={product.elements.image.value[0] ? product.elements.image.value[0].url : ""}
              productId={product.elements.url.value}
              environmentId={environmentId}
              key={product.system.id}
            />
          ))}
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
        environmentId={appContext.environmentId}
        products={appContext.getProducts()}
      />
    )}
  </AppContextConsumer>
);

export { ProductsPageConnected as ProductsPage };
