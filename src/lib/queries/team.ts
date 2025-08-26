//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import { teamsApi } from "@/server/api/teams";
import { apiRequest } from "../apiRequest";

export const teamQueryKeys = {
  list: () => ["team", "list"],
  retrieve: (params: TeamRetrieveQueryOptionsParams) => [
    "team",
    "retrieve",
    params,
  ],
};

/**
 * Query options for fetching all teams.
 */
export const teamListQueryOptions = () => {
  return queryOptions({
    queryKey: teamQueryKeys.list(),
    queryFn: () => {
      return apiRequest({
        route: teamsApi.routes.list,
      });
    },
  });
};

interface TeamRetrieveQueryOptionsParams {
  teamId: string;
}

/**
 * Query options for fetching a specific team by id.
 */
export const teamRetrieveQueryOptions = (
  params: TeamRetrieveQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: teamQueryKeys.retrieve(params),
    queryFn: () => {
      return apiRequest({
        route: teamsApi.routes.retrieve,
        params: { id: params.teamId },
      });
    },
  });
};
