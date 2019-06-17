import { Link } from "react-router-dom";
import { buildPath } from "../../utils/routeTransitionUtils";
import { ProductDetailsRoute, ProductDetailsRouteParams } from "../../constants/routePaths";
import React from "react";
import './ProductCard.css';
import { productImagePlaceholderUrl } from "../../constants/resources";

interface IProductCardPlaceholderProps {
  readonly imageSource: string;
  readonly title: string;
}

const ProductCardPlaceholder: React.FunctionComponent<IProductCardPlaceholderProps> = ({ imageSource, title }) => (
  <>
    <div className="product-card__thumbnail-wrapper">
      <img
        className="product-card__thumbnail"
        src={imageSource}
        alt="product thumbnail"
      />
    </div>
    {title ? title : 'Untitled content item'}
  </>
);

interface IProductCardProps {
  readonly projectId: string;
  readonly productId: string;
  readonly title: string;
  readonly pictureUrl: string;
}

export const ProductCard: React.FunctionComponent<IProductCardProps> =
  ({ projectId, productId, pictureUrl, title }) => {
    const imageSource = pictureUrl ? pictureUrl : productImagePlaceholderUrl;
    return (
      <div className="product-card">
        {productId ? (
            <Link to={buildPath<ProductDetailsRouteParams>(ProductDetailsRoute, { projectId, productId })}>
              <ProductCardPlaceholder imageSource={imageSource} title={title}/>
            </Link>
          ) : (
            <ProductCardPlaceholder imageSource={imageSource} title={title}/>
          )}
      </div>
    );
  };
