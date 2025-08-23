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
    pathParams: ["id"],
    response: (request) => {
      const url = new URL(request.url());
      const teamId = url.pathname.split("/").pop();
      const team = teamFixtures.find((team) => team.id === teamId);
      if (!team) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: team };
    },
  });
};
