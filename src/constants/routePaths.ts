export const DeployedProjectRootRoute = `${import.meta.env.VITE_PROJECT_ROUTE}`;

export const RootRoute = "/";
export const CallbackRoute = `${RootRoute}callback`;

export const EnvironmentRoute = `${RootRoute}:environmentId`;
export const ProductsRoute = `${EnvironmentRoute}/products`;
export const ProductDetailsRoute = `${ProductsRoute}/:productUrlSlug`;

export type ProjectRouteParams = {
  readonly environmentId: string;
};

export type ProductDetailsRouteParams = ProjectRouteParams & {
  readonly productUrlSlug: string;
};
