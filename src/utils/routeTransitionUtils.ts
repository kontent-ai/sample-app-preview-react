import { compile } from "path-to-regexp";

interface IDictionary<T> {
  readonly [key: string]: T | undefined;
}

export function buildPath<TRouteParams = IDictionary<string>>(route: string, params: TRouteParams): string {
  return compile(route)(params as any as object);
}
