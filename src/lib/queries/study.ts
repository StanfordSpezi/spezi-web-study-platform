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

const STUDY_QUERY_KEY = "study" as const;
export const studyQueryKeys = queryKeysFactory(STUDY_QUERY_KEY);

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

/**
 * Query options for fetching a specific study by id.
 */
export const studyDetailQueryOptions = (studyId: string) => {
  return queryOptions({
    queryKey: studyQueryKeys.detail(studyId),
    queryFn: async () => {
      await sleep(100);
      const study = mockApi.study.detail(studyId);
      if (!study) {
        throw new Error(`Study with id ${studyId} not found`);
      }
      return study;
    },
  });
};
