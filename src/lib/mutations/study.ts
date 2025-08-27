//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studiesApi } from "@/server/api/studies";
import { apiRequest } from "../apiRequest";
import { studyQueryKeys } from "../queries/study";

interface UseUpdateStudyMutationFnParams {
  studyId: string;
  title?: string;
  shortTitle?: string;
  icon?: string;
  explanation?: string;
  shortExplanation?: string;
  enrollmentPeriod?: { start?: string; end?: string };
  studyDuration?: number;
  isPrivateStudy?: boolean;
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
    onSuccess: ({ id }) => {
      return queryClient.invalidateQueries({
        queryKey: studyQueryKeys.retrieve({ studyId: id }),
      });
    },
    onError: (error) => {
      toast.error(`Error saving basic information: ${error.message}`, {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });
};
