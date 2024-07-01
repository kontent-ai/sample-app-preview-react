import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { ProductExampleContentType } from "../../models/product_example_content_type";
import { getProductsPage } from "../../repositories/contentItemRepository";
import { Loading } from "../Loading";
import { PageContent } from "../PageContent";
import { ProductCard } from "./ProductCard";

interface IProductsPageProps {
  readonly environmentId: string;
  readonly products: ReadonlyArray<ProductExampleContentType>;
}

const ProductsPage: React.FC<IProductsPageProps> = (props) => {
  const { products } = props;

  return (
    <PageContent>
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-4xl">Products</h2>
        {products.map((product: ProductExampleContentType) => (
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
        if (res[0]) {
          const products = res[0].elements.productList.linkedItems as unknown as ReadonlyArray<
            ProductExampleContentType
          >;
          setProducts(products);
        }
      });
  }, [appContext.environmentId, appContext.previewApiKey]);

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
