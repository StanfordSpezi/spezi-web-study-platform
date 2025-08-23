//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import type { usersApi } from "@/server/api/users";
import type { ExtractRouteSchemas } from "@/utils/extractRouteSchemas";
import { apiRequest } from "../apiRequest";

export const userQueryKeys = {
  retrieve: (params: UserRetrieveQueryOptionsParams) => [
    "user",
    "retrieve",
    params,
  ],
};

interface UserRetrieveQueryOptionsParams {
  userId: "me" | (string & {});
}

type RetrieveUserSchemas = ExtractRouteSchemas<typeof usersApi.routes.retrieve>;

/**
 * Query options for fetching a user.
 * Pass the user ID as a parameter. If the user ID is "me", the current user's information will be fetched.
 */
export const userRetrieveQueryOptions = (
  params: UserRetrieveQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: userQueryKeys.retrieve(params),
    queryFn: () => {
      return apiRequest<RetrieveUserSchemas>(`/users/${params.userId}`);
    },
  });
};
