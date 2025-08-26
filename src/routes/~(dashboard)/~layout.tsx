//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/authClient";

// This layout route is used to ensure that the user is authenticated
// before accessing the dashboard.
export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: async ({ location }) => {
    const { data, error } = await authClient.getSession();
    if (!data?.session) {
      if (error && error.status !== 401) {
        // Handle other errors (e.g., network issues)
        throw new Error(error.message);
      }
      // User is not authenticated, redirect to the sign-in page to load.
      return redirect({ to: "/sign-in", search: { redirect: location.href } });
    }
  },
});
