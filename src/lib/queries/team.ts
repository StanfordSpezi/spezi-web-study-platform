//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { sleep } from "@stanfordspezi/spezi-web-design-system";
import { queryOptions } from "@tanstack/react-query";
import { queryKeysFactory } from "@/utils/queryKeysFactory";
import { mockApi } from "../mockApi";

const TEAM_QUERY_KEY = "team" as const;
export const teamQueryKeys = queryKeysFactory(TEAM_QUERY_KEY);

/**
 * Query options for fetching all teams.
 */
export const teamListQueryOptions = () => {
  return queryOptions({
    queryKey: teamQueryKeys.list(),
    queryFn: async () => {
      await sleep(100);
      const teams = mockApi.team.list();
      if (teams.length === 0) {
        throw new Error("No teams found");
      }

      return teams;
    },
  });
};

/**
 * Query options for fetching a specific team by id.
 */
export const teamDetailQueryOptions = (teamId: string) => {
  return queryOptions({
    queryKey: teamQueryKeys.detail(teamId),
    queryFn: async () => {
      await sleep(100);
      const team = mockApi.team.detail(teamId);
      if (!team) {
        throw new Error(`Team with id ${teamId} not found`);
      }
      return team;
    },
  });
};
