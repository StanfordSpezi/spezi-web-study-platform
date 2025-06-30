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
      const studies = mockApi.study.list(params);
      if (studies.length === 0) {
        throw new Error("No studies found");
      }
      return studies;
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
      const study = mockApi.study.detail(params.studyId);
      if (!study) {
        throw new Error(`Study with id ${params.studyId} not found`);
      }
      return study;
    },
  });
};
