import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./ProductDetailsPage.css";
import "./Testimonial.css";
import { ProductExampleContentType } from "../../models/product_example_content_type";
import { PageContent } from "../PageContent";
import { useParams } from "react-router-dom";
import { getProductDetailsByUrlSlug } from "../../repositories/contentItemRepository";
import { Loading } from "../Loading";

interface IProductDetailsPage {
  readonly product: ProductExampleContentType;
}

const ProductDetailsPage: React.FC<IProductDetailsPage> = ({ product }) => {
  const pictureUrl = product.elements.image.value[0] ? product.elements.image.value[0].url : "";
  return (
    <PageContent title={product.elements.name.value}>
      {pictureUrl && (
        <img
          className="product-details__image"
          alt={product.elements.name.value}
          src={product.elements.image.value[0] ? product.elements.image.value[0].url : ""}
        />
      )}

      <div
        className="product-details__description"
        dangerouslySetInnerHTML={{ __html: product.elements.description.value }}
      />
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
  }, []);

  if (!product) {
    return <Loading />;
  }

  return <ProductDetailsPage product={product} />;
};

export { ProductDetailsPageConnected as ProductDetailsPage };
