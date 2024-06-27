import { Link } from "react-router-dom";
import React from "react";
import "./ProductCard.css";
import { productImagePlaceholderUrl } from "../../constants/resources";

type ProductCardPlaceholderProps = Readonly<{
  imageSource: string;
  title: string;
}>;

const ProductCardPlaceholder: React.FunctionComponent<ProductCardPlaceholderProps> = ({ imageSource, title }) => (
  <>
    <div className="product-card__thumbnail-wrapper">
      <img
        className="product-card__thumbnail"
        src={imageSource}
        alt="product thumbnail"
      />
    </div>
    {title ? title : "Untitled content item"}
  </>
);

type ProductCardProps = Readonly<{
  productSlug: string;
  title: string;
  pictureUrl: string;
}>;

export const ProductCard: React.FunctionComponent<ProductCardProps> = (
  { productSlug, pictureUrl, title },
) => {
  const imageSource = pictureUrl ? pictureUrl : productImagePlaceholderUrl;
  return (
    <div className="product-card">
      {productSlug
        ? (
          <Link
            to={productSlug}
          >
            <ProductCardPlaceholder imageSource={imageSource} title={title} />
          </Link>
        )
        : <ProductCardPlaceholder imageSource={imageSource} title={title} />}
    </div>
  );
};
