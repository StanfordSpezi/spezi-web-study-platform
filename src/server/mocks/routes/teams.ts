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
import type { Team } from "@/server/database/entities/team/schema";
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockTeamsRoutes = async (page: Page) => {
  const teams: Team[] = structuredClone(teamFixtures);

  await mockApiRoute(page, {
    route: teamsApi.routes.list,
    response: () => ({ status: 200, body: teams }),
  });

  await mockApiRoute(page, {
    route: teamsApi.routes.retrieve,
    response: ({ params }) => {
      const { id } = params;
      const team = teams.find((team) => team.id === id);
      if (!team) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: team };
    },
  });

  await mockApiRoute(page, {
    route: teamsApi.routes.create,
    response: ({ body }) => {
      const newTeam = { id: "new-team-id", ...body };
      teams.push(newTeam);
      return { status: 201, body: newTeam };
    },
  });

  await page.route("http://localhost:3001/api/teams/_clear", (route) => {
    teams.length = 0;
    return route.fulfill({ status: 200 });
  });
};
