export const uuidPattern = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';


export const RootRoute = '/';
export const CallbackRoute = `${RootRoute}callback`;
export const LogoutRoute = `${RootRoute}logout`;

export const ProjectRoute = `${RootRoute}:projectId(${uuidPattern})`;
export const ProductsRoute = `${ProjectRoute}/products`;
export const ProductDetailRoute = `${ProductsRoute}/:productId`;

// TODO: projectId should be included in paths

export type ProjectRouteParams = {
  readonly projectId: string;
};
