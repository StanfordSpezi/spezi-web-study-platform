//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { OnboardingLayout } from "@/components/layouts/OnboardingLayout";
import { teamListQueryOptions } from "@/lib/queries/team";

const OnboardingLayoutRoute = () => {
  return (
    <OnboardingLayout>
      <Outlet />
    </OnboardingLayout>
  );
};

export const Route = createFileRoute("/(dashboard)/onboarding")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const teams = await queryClient.ensureQueryData(teamListQueryOptions());
    const firstTeam = teams.at(0);
    if (firstTeam) {
      return redirect({
        to: "/$team",
        params: { team: firstTeam.id },
      });
    }
  },
  component: OnboardingLayoutRoute,
});
