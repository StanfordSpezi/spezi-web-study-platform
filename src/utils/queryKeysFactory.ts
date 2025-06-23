//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

export interface TQueryKey<TKey, TListQuery = unknown, TDetailQuery = string> {
  all: readonly [TKey];
  /**
   * This is typically only used for invalidations to invalidate all queries
   * related to filtered or queried lists
   */
  lists: () => readonly [...TQueryKey<TKey>["all"], "list"];
  /**
   * This is typically used in useQuery to fetch a list of items
   * e.g. a list of studies or teams
   */
  list: (
    query?: TListQuery,
  ) => readonly [
    ...ReturnType<TQueryKey<TKey>["lists"]>,
    { query: TListQuery | undefined },
  ];
  /**
   * This is typically only used for invalidations to invalidate all queries
   * related to details queries regardless of any filters or particular items.
   * This is not used that often.
   */
  details: () => readonly [...TQueryKey<TKey>["all"], "detail"];
  /**
   * This is typically used in useQuery to fetch a single item
   * e.g. a single study or team
   */
  detail: (
    id: TDetailQuery,
    query?: TListQuery,
  ) => readonly [
    ...ReturnType<TQueryKey<TKey>["details"]>,
    TDetailQuery,
    { query: TListQuery | undefined },
  ];
}

/**
 * Factory function to generate standardized query key objects for use with React Query.
 * This is the recommended way to create query keys in a consistent manner.
 * Implementation inspired by {@link https://github.com/medusajs/b2b-starter-medusa/blob/main/backend/src/admin/lib/query-key-factory.ts Medusa.JS}.
 *
 * @see {@link https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories Effective React Query Keys}
 * @example
 * ```typescript
 * const userQueryKeys = queryKeysFactory('user');
 * userQueryKeys.all; // ['user']
 * userQueryKeys.lists(); // ['user', 'list']
 * userQueryKeys.list({ page: 1 }); // ['user', 'list', { query: { page: 1 } }]
 * userQueryKeys.details(); // ['user', 'detail']
 * userQueryKeys.detail('123', { active: true }); // ['user', 'detail', '123', { query: { active: true } }]
 * ```
 */
export const queryKeysFactory = <
  T,
  TListQueryType = unknown,
  TDetailQueryType = string,
>(
  globalKey: T,
) => {
  const queryKeyFactory: TQueryKey<T, TListQueryType, TDetailQueryType> = {
    all: [globalKey],
    lists: () => [...queryKeyFactory.all, "list"],
    list: (query?: TListQueryType) => [...queryKeyFactory.lists(), { query }],
    details: () => [...queryKeyFactory.all, "detail"],
    detail: (id: TDetailQueryType, query?: TListQueryType) => [
      ...queryKeyFactory.details(),
      id,
      { query },
    ],
  };
  return queryKeyFactory;
};
