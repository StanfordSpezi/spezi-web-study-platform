//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/$team/$study")({
  component: DashboardLayout,
});

// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
function DashboardLayout() {
  const params = Route.useParams();
  return (
    <div className="flex">
      <div className="flex w-1/4 flex-col gap-4 bg-gray-100 p-4">
        <Link to="/$team/$study" params={params}>
          Home
        </Link>
        <Link to="/$team/$study/configuration" params={params}>
          Configuration
        </Link>
        <Link to="/$team/$study/participants" params={params}>
          Participants
        </Link>
        <Link to="/$team/$study/results" params={params}>
          Results
        </Link>
      </div>
      <div className="grid w-3/4 place-items-center">
        <Outlet />
      </div>
    </div>
  );
}
