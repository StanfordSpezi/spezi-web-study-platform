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
import { userRetrieveQueryOptions } from "@/lib/queries/user";

/*
  If a user lands on the root path, we want to redirect them to the
  first team and study they have access to. If they have no teams and they have
  admin rights, they will be redirected to the onboarding flow. If they have no
  teams and they don't have admin rights, they will be redirected to the access
  pending page.
 */
export const Route = createFileRoute("/(dashboard)/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const [user, teams] = await Promise.all([
      queryClient.ensureQueryData(userRetrieveQueryOptions({ userId: "me" })),
      queryClient.ensureQueryData(teamListQueryOptions()),
    ]);
    const firstTeam = teams.at(0);

    if (!firstTeam) {
      if (user.role === "admin") {
        return redirect({ to: "/onboarding" });
      }
      return redirect({ to: "/onboarding/access-pending" });
    }

    const studies = await queryClient.fetchQuery(
      studyListQueryOptions({ team_id: firstTeam.id }),
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
  },
});
