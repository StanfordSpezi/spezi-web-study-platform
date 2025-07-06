//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { parseUnknownError } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { currentUserRetrieveQueryOptions } from "@/lib/queries/currentUser";

// This layout route is used to ensure that the user is authenticated
// before accessing the dashboard.
export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    try {
      await queryClient.ensureQueryData(currentUserRetrieveQueryOptions());
    } catch (error) {
      if (parseUnknownError(error) === "Unauthorized") {
        // User is not authenticated, allow the sign-in page to load.
        return redirect({
          to: "/sign-in",
          search: { redirect: location.href },
        });
      }

      throw error;
    }
  },
});
