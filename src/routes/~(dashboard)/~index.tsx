//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, redirect } from "@tanstack/react-router";
import { studyListQueryOptions } from "@/lib/queries/study";
import { teamListQueryOptions } from "@/lib/queries/team";

/*
 If a user lands on the root path, we want to redirect them to the
 first team and study they have access to. If they have no teams or studies,
 we redirect them to an error page for now. In the future this will route to
 a "create team" or "create study" page.
 */
export const Route = createFileRoute("/(dashboard)/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const teams = await queryClient.fetchQuery(teamListQueryOptions());
      const firstTeam = teams.at(0);

      if (!firstTeam) {
        throw new Error("No teams found");
      }

      const studies = await queryClient.fetchQuery(
        studyListQueryOptions({ teamId: firstTeam.id }),
      );
      const firstStudy = studies.at(0);

      if (!firstStudy) {
        throw new Error(`No studies found for team ${firstTeam.id}`);
      }

      return redirect({
        to: "/$team/$study",
        params: {
          team: firstTeam.id,
          study: firstStudy.id,
        },
      });
    } catch (error) {
      console.error("Error redirecting to a team and study:", error);

      const message =
        error instanceof Error ?
          error.message
        : "Error redirecting to a team and study";
      return redirect({
        to: "/error",
        search: { message },
      });
    }
  },
});
