import {Link} from "react-router-dom";
import {buildPath} from "../../utils/routeTransitionUtils";
import {ProductDetailsRoute, ProductDetailsRouteParams} from "../../constants/routePaths";
import React from "react";
import './ProductCard.css';

interface IProductPreviewProps {
  readonly projectId: string;
  readonly productId: string;
  readonly title: string;
  readonly pictureUrl: string;
}

export const ProductCard: React.FunctionComponent<IProductPreviewProps> =
  ({ projectId, productId, pictureUrl, title }) => {
    return (
      <div className="product-card">
        <Link to={buildPath<ProductDetailsRouteParams>(ProductDetailsRoute, { projectId, productId })}>
          <img
            className="product-card__thumbnail"
            src={pictureUrl}
            alt="product thumbnail"
          />
          {title}
        </Link>
      </div>
    );
};
