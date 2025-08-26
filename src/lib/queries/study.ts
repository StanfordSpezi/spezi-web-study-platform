//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import { studiesApi } from "@/server/api/studies";
import { apiRequest } from "../apiRequest";

export const studyQueryKeys = {
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
