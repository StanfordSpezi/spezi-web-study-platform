//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { sleep } from "@stanfordspezi/spezi-web-design-system";
import { queryOptions } from "@tanstack/react-query";
import { mockApi } from "../mockApi";

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
    queryFn: async () => {
      await sleep(100);
      const teams = mockApi.team.list();
      return teams;
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
    queryFn: async () => {
      await sleep(100);
      const team = mockApi.team.detail(params.teamId);
      if (!team) {
        throw new Error(`Team with id ${params.teamId} not found`);
      }
      return team;
    },
  });
};
