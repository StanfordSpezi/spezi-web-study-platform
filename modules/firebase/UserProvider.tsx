//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getCurrentUser } from "@/modules/firebase/app";
import { getUserInfo } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ["getUser"],
    queryFn: async () => {
      const { currentUser, user } = await getCurrentUser();
      return {
        auth: getUserInfo(currentUser),
        user,
      };
    },
  });

export const useUser = () => useSuspenseQuery(currentUserQueryOptions()).data;
