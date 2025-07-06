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

export const studyQueryKeys = {
  list: (params: StudyListQueryOptionsParams) => ["study", "list", params],
  retrieve: (params: StudyRetrieveQueryOptionsParams) => [
    "study",
    "retrieve",
    params,
  ],
};

interface StudyListQueryOptionsParams {
  teamId?: string;
}

/**
 * Query options for fetching a list of studies. Options include filtering by team id.
 */
export const studyListQueryOptions = (params: StudyListQueryOptionsParams) => {
  return queryOptions({
    queryKey: studyQueryKeys.list(params),
    queryFn: async () => {
      await sleep(100);
      const response = mockApi.study.list(params);
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
    queryFn: async () => {
      await sleep(100);
      const response = mockApi.study.retrieve(params);
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
