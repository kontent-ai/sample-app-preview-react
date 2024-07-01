import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { ProductExampleContentType } from "../../models/product_example_content_type";
import { getProductDetailsByUrlSlug } from "../../repositories/contentItemRepository";
import { Loading } from "../Loading";
import { PageContent } from "../PageContent";

type ProductDetailsPage = Readonly<{ product: ProductExampleContentType }>;

const ProductDetailsPage: React.FC<ProductDetailsPage> = ({ product }) => {
  const pictureUrl = product.elements.image.value[0] ? product.elements.image.value[0].url : "";
  return (
    <PageContent>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-4xl">{product.elements.name.value}</h2>
        {pictureUrl && (
          <img
            className="max-w-full max-h-96 block m-auto"
            alt={product.elements.name.value}
            src={product.elements.image.value[0] ? product.elements.image.value[0].url : ""}
          />
        )}
        <div
          className="text-xl"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: product.elements.description.value }}
        />
      </div>
    </PageContent>
  );
};

const ProductDetailsPageConnected: React.FC = () => {
  const { productUrlSlug } = useParams();
  const context = useContext(AppContext);
  const [product, setProduct] = useState<ProductExampleContentType | null>(null);

  if (!productUrlSlug) {
    throw new Error("Product url slug needs to be provided.");
  }

  useEffect(() => {
    getProductDetailsByUrlSlug(context.environmentId, context.previewApiKey, productUrlSlug)
      .then(res => {
        setProduct(res);
      });
  }, [context.environmentId, context.previewApiKey, productUrlSlug]);

  if (!product) {
    return <Loading />;
  }

  return <ProductDetailsPage product={product} />;
};

export { ProductDetailsPageConnected as ProductDetailsPage };
