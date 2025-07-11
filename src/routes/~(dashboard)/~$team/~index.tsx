//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, redirect } from "@tanstack/react-router";
import { studyListQueryOptions } from "@/lib/queries/study";
import { teamRetrieveQueryOptions } from "@/lib/queries/team";

/*
 Redirect them to the first available study in their team.
 */
export const Route = createFileRoute("/(dashboard)/$team/")({
  beforeLoad: async ({ context: { queryClient }, params }) => {
    // We validate that the `params.team` exists, so we can throw a more
    // meaningful error if it doesn't.
    await queryClient.ensureQueryData(
      teamRetrieveQueryOptions({
        teamId: params.team,
      }),
    );

    const studies = await queryClient.fetchQuery(
      studyListQueryOptions({ teamId: params.team }),
    );
    const firstStudy = studies.at(0);

    if (!firstStudy) {
      throw new Error(`No studies found for team ${params.team}`);
    }

    return redirect({
      to: "/$team/$study",
      params: {
        team: params.team,
        study: firstStudy.id,
      },
    });
  },
});
