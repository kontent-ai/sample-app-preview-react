import React from "react";
import { Link } from "react-router-dom";

import { productImagePlaceholderUrl } from "../../constants/resources";

type ProductCardPlaceholderProps = Readonly<{
  imageSource: string;
  title: string;
}>;

const ProductCardPlaceholder: React.FunctionComponent<ProductCardPlaceholderProps> = ({ imageSource, title }) => (
  <>
    <div className="w-64 h-64 p-2 flex flex-col items-center">
      <img
        className="max-w-80 max-h-64"
        src={imageSource}
        alt="product thumbnail"
      />
    </div>
    <p className="m-4 text-xl">{title ? title : "Untitled content item"}</p>
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
    <div className="flex flex-col items-center text-center border border-solid border-gray-300 rounded-lg shadow-md hover:shadow-lg">
      {productSlug
        ? (
          <Link
            to={productSlug}
          >
            <ProductCardPlaceholder
              imageSource={imageSource}
              title={title}
            />
          </Link>
        )
        : (
          <ProductCardPlaceholder
            imageSource={imageSource}
            title={title}
          />
        )}
    </div>
  );
};
