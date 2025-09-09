//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { teamsApi } from "@/server/api/teams";
import type { ExtractZod, PathValue } from "@/utils/types";
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

interface UseCreateTeamMutationFnParams
  extends ExtractZod<
    PathValue<
      typeof teamsApi.routes.create,
      ["request", "body", "content", "application/json", "schema"]
    >
  > {}

/**
 * Mutation for creating a new team.
 */
export const useCreateTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UseCreateTeamMutationFnParams) => {
      return apiRequest<typeof teamsApi.routes.create, 201>({
        route: teamsApi.routes.create,
        body: data,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: teamQueryKeys.list(),
      });
    },
    onError: (error) => {
      toast.error("Error creating team", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
