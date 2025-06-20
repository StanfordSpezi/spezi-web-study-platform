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

const CURRENT_USER_QUERY_KEY = "currentUser" as const;

/**
 * Query options for fetching the current user.
 */
export const currentUserQueryOptions = () => {
  return queryOptions({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: async () => {
      await sleep(100);
      const response = mockApi.auth.getCurrentUser();
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
