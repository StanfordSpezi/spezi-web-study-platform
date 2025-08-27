//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { RouteConfig } from "@hono/zod-openapi";
import type { Page } from "@playwright/test";
import type { StatusCode } from "hono/utils/http-status";
import type { ExtractZod, PathValue } from "./types";

/**
 * Extracts the set of valid HTTP status codes available under the RouteConfig's responses.
 *
 * @example
 * ```ts
 * const route = {
 *   method: "get",
 *   path: "/users/:id",
 *   responses: {
 *     200: {
 *       // ...
 *     },
 *     404: {
 *       // ...
 *     },
 *   },
 * } satisfies RouteConfig;
 *
 * type Status = ExtractStatus<typeof route>; // 200 | 404
 * ```
 */
type ExtractStatus<T extends RouteConfig> = Extract<
  keyof T["responses"],
  StatusCode
>;

/**
 * Maps a Hono OpenAPI RouteConfig to its inferred request/responses shapes.
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const getUserRoute = {
 *   method: "get",
 *   path: "/users/:id",
 *   request: {
 *     params: z.object({ id: z.string() }),
 *     query: z.object({ includePosts: z.boolean().optional() }),
 *   },
 *   responses: {
 *     200: { content: { "application/json": { schema: z.object({ id: z.string(), name: z.string() }) } } },
 *     404: { content: { "application/json": { schema: z.object({ message: z.string() }) } } },
 *   },
 * } satisfies RouteConfig;
 *
 * type S = ExtractRouteSchemas<typeof getUserRoute>;
 * // S["Params"]   -> { id: string }
 * // S["Query"]    -> { includePosts?: boolean | undefined }
 * // S["Body"]     -> undefined
 * // S["Responses"]-> { status: 200; body: { id: string; name: string } } |
 * //                  { status: 404; body: { message: string } }
 * ```
 */
interface ExtractRouteSchemas<T extends RouteConfig> {
  Params: ExtractZod<PathValue<T, ["request", "params"]>>;
  Query: ExtractZod<PathValue<T, ["request", "query"]>>;
  Body: ExtractZod<
    PathValue<T, ["request", "body", "content", "application/json", "schema"]>
  >;
  Responses: {
    [S in ExtractStatus<T>]: {
      status: S;
      body: ExtractZod<
        PathValue<T, ["responses", S, "content", "application/json", "schema"]>
      >;
    };
  }[ExtractStatus<T>];
}

interface ResponseParams<
  T extends RouteConfig,
  S extends ExtractRouteSchemas<T> = ExtractRouteSchemas<T>,
> {
  params: S["Params"];
  query: S["Query"];
  body: S["Body"];
}

interface MockApiRouteOptions<
  T extends RouteConfig,
  S extends ExtractRouteSchemas<T> = ExtractRouteSchemas<T>,
> {
  route: T;
  response: (params: ResponseParams<T>) => S["Responses"];
  onFulfill?: () => Promise<void> | void;
}

/**
 * Splits a URL path string into its individual, decoded segments.
 *
 * @example
 * splitUrlPath("/foo/bar%20baz/") // returns ["foo", "bar baz"]
 */
const splitUrlPath = (path: string) => {
  return path.split("/").filter(Boolean).map(decodeURIComponent);
};

/**
 * Extracts path parameters from a URL based on a given pattern.
 *
 * The pattern should use colon-prefixed segments (e.g., `/users/:id/profile`)
 * to indicate parameters to extract from the URL's pathname.
 *
 * This function is robust to additional prefixes in the URL path (e.g., URL `/api/users/123`
 * with pattern `/users/:id`).
 *
 * @example
 * ```typescript
 * const url = new URL('https://example.com/users/123/profile');
 * const params = getPathParamsFromUrl(url, '/users/:id/profile');
 * // params = { id: '123' }
 *
 * const prefixedUrl = new URL('https://example.com/api/users/123');
 * const paramsWithPrefix = getPathParamsFromUrl(prefixedUrl, '/users/:id');
 * // paramsWithPrefix = { id: '123' }
 * ```
 */
const getPathParamsFromUrl = (url: URL, pattern: string) => {
  const urlParts = splitUrlPath(url.pathname);
  const patternParts = splitUrlPath(pattern);

  // Slide the pattern over the URL segments to allow for prefix mismatches
  for (
    let offset = 0;
    offset + patternParts.length <= urlParts.length;
    offset++
  ) {
    const params: Record<string, string> = {};
    let isMatch = true;

    for (let i = 0; i < patternParts.length; i++) {
      const patternSegment = patternParts[i];
      const urlSegment = urlParts[offset + i];

      if (patternSegment.startsWith(":")) {
        const key = patternSegment.slice(1);
        if (!key) {
          isMatch = false;
          break;
        }
        params[key] = urlSegment;
      } else if (patternSegment === urlSegment) {
        continue;
      } else {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return params;
    }
  }

  throw new Error(
    `URL path "${url.pathname}" does not match the pattern "${pattern}".`,
  );
};

/**
 * Convert ":param" segments to "*" wildcards for Playwright's route matching.
 *
 * @example
 * ```ts
 * convertPathParamsToWildcards("/users/:id") // "/users/*"
 * ```
 */
const convertPathParamsToWildcards = (path: string) => {
  return path.replace(/:[^/]+/g, "*");
};

/**
 * Register a Playwright route handler that mocks a typed API endpoint.
 * It parses query parameters and JSON body, calls the response factory,
 * and fulfills the request with the declared status and body.
 *
 * The response factory must return a status that exists in the RouteConfig responses.
 *
 * @example
 * ```ts
 * await mockApiRoute(page, {
 *   route: usersApi.routes.retrieve,
 *   response: ({ params, query, body }) => {
 *     // Compute response based on the incoming request
 *     return { status: 200, body: { id: "123", name: "Alice" } };
 *   },
 *   onFulfill: () => console.log("Mock fulfilled"),
 * });
 * ```
 */
export const mockApiRoute = <T extends RouteConfig>(
  page: Page,
  { route, response, onFulfill }: MockApiRouteOptions<T>,
) => {
  const cleanPath = convertPathParamsToWildcards(route.path);
  return page.route(`http://localhost:3001/api${cleanPath}*`, (mockRoute) => {
    const request = mockRoute.request();
    const url = new URL(request.url());

    const pathParams = getPathParamsFromUrl(url, route.path);
    const query = Object.fromEntries(url.searchParams);
    const requestBody = JSON.parse(request.postData() ?? "{}");

    const { status, body } = response({
      params: pathParams as ExtractRouteSchemas<T>["Params"],
      query: query as ExtractRouteSchemas<T>["Query"],
      body: requestBody as ExtractRouteSchemas<T>["Body"],
    });

    return mockRoute
      .fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify(body),
      })
      .then(onFulfill);
  });
};
