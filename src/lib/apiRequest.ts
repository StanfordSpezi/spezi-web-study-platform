//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { RouteConfig } from "@hono/zod-openapi";
import type { ErrorPayload } from "@/server/error";
import { joinUrlPaths } from "@/utils/joinUrlPaths";
import type {
  ConditionallyOptional,
  ExtractZod,
  PathValue,
} from "@/utils/types";
import { env } from "./env";

/**
 * Maps a Hono OpenAPI RouteConfig to its inferred runtime types (via Zod).
 * Each property resolves to the inferred type or undefined if the schema is missing.
 *
 * @example
 * ```ts
 * import { createRoute, z } from "@hono/zod-openapi";
 *
 * const getUserRoute = {
 *   method: "get",
 *   path: "/users/:id",
 *   request: {
 *     params: z.object({ id: z.string() }),
 *     query: z.object({ includePosts: z.boolean().optional() }),
 *   },
 *   responses: {
 *     200: {
 *       content: {
 *         "application/json": {
 *           schema: z.object({ id: z.string(), name: z.string() }),
 *         },
 *       },
 *     },
 *   },
 * } satisfies RouteConfig;
 *
 * type Schemas = ExtractRouteSchemas<typeof getUserRoute>;
 * // Schemas["Params"]  -> { id: string }
 * // Schemas["Query"]   -> { includePosts?: boolean | undefined }
 * // Schemas["Body"]    -> undefined (no JSON body)
 * // Schemas["Response"]-> { id: string; name: string }
 * ```
 */
interface ExtractRouteSchemas<T extends RouteConfig> {
  Params: ExtractZod<PathValue<T, ["request", "params"]>>;
  Query: ExtractZod<PathValue<T, ["request", "query"]>>;
  Body: ExtractZod<
    PathValue<T, ["request", "body", "content", "application/json", "schema"]>
  >;
  Response: ExtractZod<
    PathValue<T, ["responses", 200, "content", "application/json", "schema"]>
  >;
}

type ApiRequestOptions<
  T extends RouteConfig,
  S extends ExtractRouteSchemas<T>,
> = {
  route: T;
  headers?: Record<string, string>;
  signal?: AbortSignal;
} & ConditionallyOptional<{
  params: S["Params"];
  query: S["Query"];
  body: S["Body"];
}>;

/**
 * Type guard for allowed primitive-ish parameter values in URLs.
 * Used to validate query and path parameter values before serialization.
 *
 * @example
 * ```ts
 * isValidParamValue("abc"); // true
 * isValidParamValue({});    // false
 * ```
 */
const isValidParamValue = (
  value: unknown,
): value is string | number | boolean | null | undefined => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  );
};

/**
 * Build an absolute API URL from path, query params, and path params.
 * Handles placeholders like /users/:id in apiPath and replaces them from pathParams.
 *
 * @example
 * ```ts
 * const url = buildApiUrl({
 *   apiPath: "/users/:id",
 *   pathParams: { id: "123" },
 *   queryParams: { includePosts: true },
 * });
 * // => "https://.../users/123?includePosts=true"
 * ```
 */
const buildApiUrl = ({
  apiPath,
  queryParams,
  pathParams,
}: {
  apiPath: string;
  queryParams?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
}): string => {
  const requestUrl = new URL(joinUrlPaths(env.VITE_API_BASE_PATH, apiPath));

  if (queryParams) {
    Object.entries(queryParams).forEach(([paramKey, paramValue]) => {
      if (isValidParamValue(paramValue)) {
        requestUrl.searchParams.append(paramKey, String(paramValue));
      } else {
        throw new Error(`Invalid query parameter: ${paramKey} in ${apiPath}`);
      }
    });
  }

  if (pathParams) {
    Object.entries(pathParams).forEach(([paramKey, paramValue]) => {
      if (isValidParamValue(paramValue)) {
        const newRequestPathname = requestUrl.pathname.replace(
          `:${paramKey}`,
          String(paramValue),
        );

        if (requestUrl.pathname === newRequestPathname) {
          throw new Error(
            `Path parameter ${paramKey} in ${apiPath} was not replaced`,
          );
        }

        requestUrl.pathname = newRequestPathname;
      } else {
        throw new Error(`Invalid path parameter: ${paramKey} in ${apiPath}`);
      }
    });
  }

  return requestUrl.toString();
};

/**
 * Retrieves the value associated with the specified key from the given request object,
 * casting it to a `Record<string, unknown>`. If the key does not exist in the request,
 * returns `undefined`.
 */
const getRequestValue = (
  req: Record<string, unknown>,
  key: string,
): Record<string, unknown> | undefined => {
  return key in req ? (req[key] as Record<string, unknown>) : undefined;
};

/**
 * Perform a typed API request for a given RouteConfig.
 * Infers params, query, body, and response types from the route's Zod schemas.
 *
 * @example
 * ```ts
 * // GET without body
 * const user = await apiRequest({
 *   route: getUserRoute, // method: "get", path: "/users/:id"
 *   params: { id: "42" },
 *   query: { includePosts: true },
 * });
 *
 * // POST with body
 * const createUserRoute = {
 *   method: "post",
 *   path: "/users",
 *   request: {
 *     body: {
 *       content: {
 *         "application/json": {
 *           schema: z.object({ name: z.string() }),
 *         },
 *       },
 *     },
 *   },
 *   responses: {
 *     200: { content: { "application/json": { schema: z.object({ id: z.string() }) } } },
 *   },
 * } satisfies RouteConfig;
 *
 * const result = await apiRequest({
 *   route: createUserRoute,
 *   body: { name: "John" },
 * });
 * ```
 */
export const apiRequest = async <
  T extends RouteConfig,
  S extends ExtractRouteSchemas<T> = ExtractRouteSchemas<T>,
>({
  route: { method, path },
  headers,
  signal,
  ...request
}: ApiRequestOptions<T, S>): Promise<S["Response"]> => {
  const query = getRequestValue(request, "query");
  const params = getRequestValue(request, "params");
  const body = getRequestValue(request, "body");

  const requestUrl = buildApiUrl({
    apiPath: path,
    queryParams: query,
    pathParams: params,
  });

  const fetchOptions: RequestInit = {
    method,
    headers,
    signal,
    credentials: "include",
  };

  if (body !== undefined && method !== "get") {
    fetchOptions.body = JSON.stringify(body);
    fetchOptions.headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  const apiResponse = await fetch(requestUrl, fetchOptions);

  if (!apiResponse.ok) {
    const responseContentType = apiResponse.headers.get("content-type");
    const baseErrorMessage = `API error: ${apiResponse.status}`;

    try {
      const isJsonResponse = responseContentType?.includes("application/json");
      if (isJsonResponse) {
        const errorPayload = (await apiResponse.json()) as ErrorPayload;
        throw new Error(`${baseErrorMessage} - ${errorPayload.message}`);
      } else {
        const errorText = await apiResponse.text();
        throw new Error(`${baseErrorMessage} - ${errorText}`);
      }
    } catch (parseError) {
      const isApiError =
        parseError instanceof Error && parseError.message.includes("API error");
      if (isApiError) {
        throw parseError;
      }
      // If JSON parsing fails, fall back to text
      const fallbackErrorText = await apiResponse.text();
      throw new Error(`${baseErrorMessage} - ${fallbackErrorText}`);
    }
  }

  const responseContentType = apiResponse.headers.get("content-type");
  const isJsonResponse = responseContentType?.includes("application/json");
  if (isJsonResponse) {
    return apiResponse.json() as Promise<S["Response"]>;
  }
  return apiResponse.text() as unknown as S["Response"];
};
