import type { Page } from "@playwright/test";
import { usersApi } from "@/server/api/users";
import { userFixtures } from "@/server/database/entities/user/fixtures";
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockUserRoutes = async (page: Page) => {
  await mockApiRoute(page, {
    route: usersApi.routes.retrieve,
    pathParams: ["id"],
    response: (request) => {
      const url = new URL(request.url());
      const userId = url.pathname.split("/").pop();

      if (userId === "me") {
        // This is the default logged-in user
        return { status: 200, body: userFixtures[0] };
      }

      const user = userFixtures.find((user) => user.id === userId);
      if (!user) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: user };
    },
  });
};
