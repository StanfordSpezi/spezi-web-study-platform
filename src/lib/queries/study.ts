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
import { useNavigate } from "@tanstack/react-router";
import { studiesApi } from "@/server/api/studies";
import type { ExtractZod, PathValue } from "@/utils/types";
import { apiRequest } from "../apiRequest";

export const studyQueryKeys = {
  all: ["study"],
  list: (params: StudyListQueryOptionsParams) => ["study", "list", params],
  retrieve: (params: StudyRetrieveQueryOptionsParams) => [
    "study",
    "retrieve",
    params,
  ],
};

interface StudyListQueryOptionsParams {
  team_id?: string;
}

/**
 * Query options for fetching a list of studies. Options include filtering by team id.
 */
export const studyListQueryOptions = (params: StudyListQueryOptionsParams) => {
  return queryOptions({
    queryKey: studyQueryKeys.list(params),
    queryFn: () => {
      return apiRequest({
        route: studiesApi.routes.list,
        query: params,
      });
    },
  });
};

interface StudyRetrieveQueryOptionsParams {
  studyId: string;
}

/**
 * Query options for fetching a specific study by id.
 */
export const studyRetrieveQueryOptions = (
  params: StudyRetrieveQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: studyQueryKeys.retrieve(params),
    queryFn: () => {
      return apiRequest({
        route: studiesApi.routes.retrieve,
        params: { id: params.studyId },
      });
    },
  });
};

interface UseCreateStudyMutationFnParams
  extends ExtractZod<
    PathValue<
      typeof studiesApi.routes.create,
      ["request", "body", "content", "application/json", "schema"]
    >
  > {}

/**
 * Mutation for creating a new study.
 */
export const useCreateStudyMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseCreateStudyMutationFnParams) => {
      return apiRequest<typeof studiesApi.routes.create, 201>({
        route: studiesApi.routes.create,
        body: params,
      });
    },
    onSuccess: async ({ id, teamId }) => {
      await queryClient.invalidateQueries({
        queryKey: studyQueryKeys.all,
      });
      await navigate({
        to: "/$team/$study",
        params: { team: teamId, study: id },
      });
    },
    onError: (error) => {
      toast.error("Error creating study", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

interface UseUpdateStudyMutationFnParams
  extends ExtractZod<
    PathValue<
      typeof studiesApi.routes.update,
      ["request", "body", "content", "application/json", "schema"]
    >
  > {
  studyId: string;
}

/**
 * Mutation for updating a study's basic information and enrollment settings.
 */
export const useUpdateStudyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studyId, ...data }: UseUpdateStudyMutationFnParams) => {
      return apiRequest({
        route: studiesApi.routes.update,
        params: { id: studyId },
        body: data,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: studyQueryKeys.all,
      });
    },
    onError: (error) => {
      toast.error("Error saving basic information", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
