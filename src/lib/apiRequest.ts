//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ErrorPayload } from "@/server/error";
import { joinUrlPaths } from "@/utils/joinUrlPaths";
import { env } from "./env";

type QueryParams = Record<string, string | number | boolean | undefined>;

interface ApiRequestGeneric {
  Query?: QueryParams;
  Body?: unknown;
  Response?: unknown;
}

interface ApiRequestOptions<T extends ApiRequestGeneric> {
  method?: string;
  headers?: Record<string, string>;
  body?: T["Body"];
  query?: T["Query"];
  signal?: AbortSignal;
}

/**
 * Constructs a complete URL string by combining a base API URL with a specified path and optional query parameters.
 *
 * @example
 * const apiUrl = buildApiUrl("/users", { search: "michael", age: 28 });
 * // apiUrl: "https://example.com/api/users?search=michael&age=28"
 */
const buildApiUrl = (
  apiPath: string,
  queryParams?: Record<string, string | number | boolean | undefined>,
): string => {
  const requestUrl = new URL(joinUrlPaths(env.VITE_API_BASE_PATH, apiPath));
  if (queryParams) {
    Object.entries(queryParams).forEach(([paramKey, paramValue]) => {
      if (paramValue !== undefined) {
        requestUrl.searchParams.append(paramKey, String(paramValue));
      }
    });
  }
  return requestUrl.toString();
};

/**
 * Makes an HTTP request to the specified API endpoint and returns the parsed response.
 *
 * @example
 * const userData = await apiRequest("/users/1");
 * // userData: { id: 1, name: "John Doe" }
 *
 * @example
 * const userList = await apiRequest("/users", { query: { search: "michael" } });
 * // userList: [
 * //  { id: 1, name: "Michael Scott" },
 * //  { id: 2, name: "Michael Jordan" }
 * // ]
 */
export const apiRequest = async <
  T extends ApiRequestGeneric = ApiRequestGeneric,
>(
  apiPath: string,
  {
    method = "GET",
    headers = {},
    body,
    query,
    signal,
  }: ApiRequestOptions<T> = {},
): Promise<T["Response"]> => {
  const requestUrl = buildApiUrl(apiPath, query);
  const fetchOptions: RequestInit = {
    method,
    headers,
    signal,
    credentials: "include",
  };

  if (body !== undefined && method !== "GET") {
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
    return apiResponse.json() as Promise<T["Response"]>;
  }
  return apiResponse.text() as unknown as T["Response"];
};
