//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Page } from "@playwright/test";
import { usersApi } from "@/server/api/users";
import { userFixtures } from "@/server/database/entities/user/fixtures";
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockUserRoutes = async (page: Page) => {
  await mockApiRoute(page, {
    route: usersApi.routes.retrieve,
    response: ({ params }) => {
      const { id } = params;

      if (id === "me") {
        // This is the default logged-in user
        return { status: 200, body: userFixtures[0] };
      }

      const user = userFixtures.find((user) => user.id === id);
      if (!user) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: user };
    },
  });
};
