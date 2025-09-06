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

interface MockUserRoutesOptions {
  role: "admin" | "user";
}

export const mockUserRoutes = async (
  page: Page,
  options: MockUserRoutesOptions,
) => {
  await mockApiRoute(page, {
    route: usersApi.routes.retrieve,
    response: ({ params }) => {
      const { id } = params;

      if (id === "me") {
        const user = userFixtures.find((user) => user.role === options.role);
        if (!user) {
          throw new Error(`No user fixture found for role ${options.role}`);
        }
        return { status: 200, body: user };
      }

      const user = userFixtures.find((user) => user.id === id);
      if (!user) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: user };
    },
  });
};
