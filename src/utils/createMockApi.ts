//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

export class MockApiError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "MockApiError";
    this.status = status;
  }
}

interface DatabaseSuccessResponse<T> {
  success: true;
  data: T;
  error: never;
}
interface DatabaseErrorResponse {
  success: false;
  data: never;
  error: {
    message: string;
    status: number;
  };
}
export type DatabaseResponse<T> =
  | DatabaseSuccessResponse<T>
  | DatabaseErrorResponse;

/**
 * Creates a mock API object based on the provided handler functions.
 *
 * This utility takes an object of handler groups, where each group contains methods
 * that simulate API endpoints. Each method is wrapped to return a standardized
 * `DatabaseResponse` object, capturing both successful results and errors.
 *
 * @example
 * ```typescript
 * const handlers = {
 *   user: {
 *     getUser: (id: string) => ({ id, name: "Alice" }),
 *   },
 * };
 * const api = createMockApi(handlers);
 * const response = api.user.getUser("123");
 * // response: { success: true, data: { id: "123", name: "Alice" }, error: undefined }
 * ```
 */
export const createMockApi = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, Record<string, (...args: any[]) => any>>,
>(
  handlers: T,
): {
  [Group in keyof T]: {
    [Method in keyof T[Group]]: (
      ...args: Parameters<T[Group][Method]>
    ) => DatabaseResponse<ReturnType<T[Group][Method]>>;
  };
} => {
  // create an empty api object whose shape matches handlers
  const api = {} as {
    [Group in keyof T]: {
      [Method in keyof T[Group]]: (
        ...args: Parameters<T[Group][Method]>
      ) => DatabaseResponse<ReturnType<T[Group][Method]>>;
    };
  };

  for (const groupKey of Object.keys(handlers) as Array<keyof T>) {
    // force‐cast here so TS knows api[groupKey] exists
    api[groupKey] = {} as (typeof api)[typeof groupKey];

    const groupHandlers = handlers[groupKey];
    for (const methodKey of Object.keys(groupHandlers) as Array<
      keyof T[typeof groupKey]
    >) {
      const originalFn = groupHandlers[methodKey];
      // wrap the raw handler
      api[groupKey][methodKey] = ((...args) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = originalFn(...args);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return { success: true, data, error: undefined as never };
        } catch (err: unknown) {
          const message =
            err instanceof MockApiError ? err.message : String(err);
          const status = err instanceof MockApiError ? err.status : 400;
          return {
            success: false,
            data: undefined as never,
            error: { message, status },
          };
        }
      }) as (
        ...args: Parameters<typeof originalFn>
      ) => DatabaseResponse<ReturnType<typeof originalFn>>;
    }
  }

  return api;
};
