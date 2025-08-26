//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type {
  ResponseConfig,
  ZodContentObject,
  ZodMediaTypeObject,
} from "@asteasolutions/zod-to-openapi";
import type { RouteConfig } from "@hono/zod-openapi";
import type { Page, Request } from "@playwright/test";
import type { StatusCode } from "hono/utils/http-status";
import type { z } from "zod";

/**
 * Replaces specified path parameters in a URL path with wildcards (`*`).
 *
 * @example
 * ```typescript
 * convertPathParamsToWildcards('/api/user/:id', ['id']); // '/api/user/*'
 * convertPathParamsToWildcards('/api/user/:id/:action', ['id']); // '/api/user/ * /:action'
 * convertPathParamsToWildcards('/api/user/:id/:action', []); // '/api/user/:id/:action'
 * ```
 */
const convertPathParamsToWildcards = (path: string, paramNames?: string[]) => {
  if (!paramNames || paramNames.length === 0) return path;
  return path.replace(/:(\w+)/g, (full, name) =>
    paramNames.includes(name as string) ? "*" : full,
  );
};

type ExtractStatus<T extends RouteConfig> = Extract<
  keyof T["responses"],
  StatusCode
>;

type InferJsonBody<T extends RouteConfig, S extends ExtractStatus<T>> =
  T["responses"][S] extends ResponseConfig ?
    T["responses"][S]["content"] extends ZodContentObject ?
      T["responses"][S]["content"]["application/json"] extends (
        ZodMediaTypeObject
      ) ?
        z.infer<T["responses"][S]["content"]["application/json"]["schema"]>
      : never
    : never
  : never;

type RouteJsonResponse<T extends RouteConfig> = {
  [S in ExtractStatus<T>]: {
    status: S;
    body: InferJsonBody<T, S>;
  };
}[ExtractStatus<T>];

interface MockApiRouteOptions<T extends RouteConfig> {
  route: T;
  pathParams?: string[];
  response: (request: Request) => RouteJsonResponse<T>;
  onFulfill?: () => Promise<void> | void;
}

/**
 * Mocks an API route in Playwright by intercepting requests matching the specified route configuration
 * and fulfilling them with a custom response.
 *
 * @example
 * ```typescript
 * mockApiRoute(page, {
 *   route: {
 *     method: "GET",
 *     path: "/api/user/:id",
 *   },
 *   pathParams: ["id"],
 *   response: (request) => ({
 *     status: 200,
 *     body: { id: request.params.id, name: "John Doe" },
 *   }),
 *   onFulfill: () => {
 *     console.log("Mock API route fulfilled");
 *   },
 * });
 * ```
 */
export const mockApiRoute = <T extends RouteConfig>(
  page: Page,
  { route, pathParams, response, onFulfill }: MockApiRouteOptions<T>,
) => {
  const cleanPath = convertPathParamsToWildcards(route.path, pathParams);
  return page.route(`http://localhost:3001/api${cleanPath}*`, (mockRoute) => {
    const { status, body } = response(mockRoute.request());
    return mockRoute
      .fulfill({
        contentType: "application/json",
        status,
        body: JSON.stringify(body),
      })
      .then(onFulfill);
  });
};
