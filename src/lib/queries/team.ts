//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import type { teamsApi } from "@/server/api/teams";
import type { ExtractRouteSchemas } from "@/utils/extractRouteSchemas";
import { apiRequest } from "../apiRequest";

export const teamQueryKeys = {
  list: () => ["team", "list"],
  retrieve: (params: TeamRetrieveQueryOptionsParams) => [
    "team",
    "retrieve",
    params,
  ],
};

type ListTeamSchemas = ExtractRouteSchemas<typeof teamsApi.routes.list>;

/**
 * Query options for fetching all teams.
 */
export const teamListQueryOptions = () => {
  return queryOptions({
    queryKey: teamQueryKeys.list(),
    queryFn: () => {
      return apiRequest<ListTeamSchemas>("/teams");
    },
  });
};

interface TeamRetrieveQueryOptionsParams {
  teamId: string;
}

type RetrieveTeamSchemas = ExtractRouteSchemas<typeof teamsApi.routes.retrieve>;

/**
 * Query options for fetching a specific team by id.
 */
export const teamRetrieveQueryOptions = (
  params: TeamRetrieveQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: teamQueryKeys.retrieve(params),
    queryFn: () => {
      return apiRequest<RetrieveTeamSchemas>(`/teams/${params.teamId}`);
    },
  });
};
