const uuidPattern = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

export const DeployedProjectRootRoute = `${process.env.REACT_APP_PROJECT_ROUTE}`;

export const RootRoute = '/';
export const CallbackRoute = `${RootRoute}callback`;

export const ProjectRoute = `${RootRoute}:projectId(${uuidPattern})`;
export const ProductsRoute = `${ProjectRoute}/products`;
export const ProductDetailsRoute = `${ProductsRoute}/:productId`;

export type ProjectRouteParams = {
  readonly projectId: string;
};

export type ProductDetailsRouteParams = ProjectRouteParams & {
  readonly productId: string;
}
