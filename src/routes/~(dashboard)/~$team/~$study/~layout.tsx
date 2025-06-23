//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { studyDetailQueryOptions } from "@/lib/queries/study";
import { teamDetailQueryOptions } from "@/lib/queries/team";

const DashboardLayoutRoute = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/(dashboard)/$team/$study")({
  component: DashboardLayoutRoute,
  beforeLoad: async ({ context: { queryClient }, params }) => {
    try {
      // We validate that the `params.team` and `params.study` exist before
      // loading the dashboard, so we can redirect to the error page if they don't.
      const [teamData, studyData] = await Promise.all([
        queryClient.fetchQuery(teamDetailQueryOptions(params.team)),
        queryClient.fetchQuery(studyDetailQueryOptions(params.study)),
      ]);
      if (studyData.teamId !== teamData.id) {
        throw new Error(
          `Study ${params.study} does not belong to team ${params.team}.`,
        );
      }
    } catch (error) {
      console.error(
        `Error ensuring query data for team ${params.team} and study ${params.study}:`,
        error,
      );

      const message =
        error instanceof Error ?
          error.message
        : `Error ensuring query data for team ${params.team} and study ${params.study}`;
      throw redirect({
        to: "/error",
        search: { message },
      });
    }
  },
});
