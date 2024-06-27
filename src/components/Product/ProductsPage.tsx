import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { PageContent } from "../PageContent";
import "./ProductsPage.css";
import { ProductExampleContentType } from "../../models/product_example_content_type";
import { ProductCard } from "./ProductCard";
import classNames from "classnames";
import { getProductsPage } from "../../repositories/contentItemRepository";
import { Loading } from "../Loading";

interface IProductsPageProps {
  readonly environmentId: string;
  readonly products: ReadonlyArray<ProductExampleContentType>;
}

const ProductsPage: React.FC<IProductsPageProps> = (props) => {
  const { environmentId, products } = props;
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
            productSlug={product.elements.url.value}
            key={product.system.id}
          />
        ))}
      </div>
    </PageContent>
  );
};

const ProductsPageConnected: React.FC = () => {
  const appContext = useContext(AppContext);
  const [products, setProducts] = useState<ReadonlyArray<ProductExampleContentType> | null>(null);

  useEffect(() => {
    getProductsPage(appContext.environmentId, appContext.previewApiKey)
      .then(res => {
        if (res && res[0]) {
          const products = res[0].elements.productList.linkedItems as unknown as ReadonlyArray<
            ProductExampleContentType
          >;
          setProducts(products);
        }
      });
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <ProductsPage
      environmentId={appContext.environmentId}
      products={products}
    />
  );
};

export { ProductsPageConnected as ProductsPage };
