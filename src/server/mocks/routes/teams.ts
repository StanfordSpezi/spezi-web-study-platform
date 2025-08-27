//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Page } from "@playwright/test";
import { teamsApi } from "@/server/api/teams";
import { teamFixtures } from "@/server/database/entities/team/fixtures";
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockTeamsRoutes = async (page: Page) => {
  await mockApiRoute(page, {
    route: teamsApi.routes.list,
    response: () => ({ status: 200, body: teamFixtures }),
  });

  await mockApiRoute(page, {
    route: teamsApi.routes.retrieve,
    response: ({ params }) => {
      const { id } = params;
      const team = teamFixtures.find((team) => team.id === id);
      if (!team) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: team };
    },
  });
};
