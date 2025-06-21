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
      const response = mockApi.team.list();
      if (!response.success) {
        const { message, status } = response.error;
        if (status === 404) {
          return [];
        }
        if (status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error(message);
      }
      return response.data;
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
      const response = mockApi.team.detail(teamId);
      if (!response.success) {
        const { message, status } = response.error;
        if (status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error(message);
      }
      return response.data;
    },
  });
};
