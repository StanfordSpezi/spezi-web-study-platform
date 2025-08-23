//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Page } from "@playwright/test";
import type { z } from "zod";
import { userFixtures } from "@/server/database/entities/user/fixtures";
import { mockApiRoute } from "@/utils/mockApiRoute";
import { authApi } from "../../api/auth";
import type { authUserSchema } from "../../api/auth/schema";

const authUser: z.infer<typeof authUserSchema> = {
  id: userFixtures[0].id,
  email: userFixtures[0].email,
  name: userFixtures[0].name,
  image: userFixtures[0].imageUrl ?? null,
  emailVerified: false,
  createdAt: "2025-08-21T11:28:34.000Z",
  updatedAt: "2025-08-21T11:28:34.000Z",
};

export const mockIsAuthenticated = async (page: Page) => {
  console.log("Mocking authenticated user");
  await mockApiRoute(page, {
    route: authApi.routes.getSession,
    response: () => ({
      status: 200,
      body: {
        session: {
          expiresAt: "2025-08-29T19:41:36.000Z",
          token: "oELjUJiwOvpVMGC4v4ICj8VGvwZvK1vQ",
          createdAt: "2025-08-22T19:41:36.000Z",
          updatedAt: "2025-08-22T19:41:36.000Z",
          ipAddress: "192.168.1.1",
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          userId: userFixtures[0].id,
          id: "zdcXIFbz4iwA30KDct1PZ6mT4gF22LDI",
        },
        user: authUser,
      },
    }),
  });
};

export const mockIsNotAuthenticated = async (page: Page) => {
  console.log("Mocking unauthenticated user");
  await mockApiRoute(page, {
    route: authApi.routes.getSession,
    response: () => ({ status: 200, body: null }),
  });
};

export const mockAuthRoutes = async (page: Page) => {
  await mockApiRoute(page, {
    route: authApi.routes.signIn,
    response: () => ({
      status: 200,
      body: {
        redirect: false,
        token: "oELjUJiwOvpVMGC4v4ICj8VGvwZvK1vO",
        user: authUser,
      },
    }),
    onFulfill: () => mockIsAuthenticated(page),
  });

  await mockApiRoute(page, {
    route: authApi.routes.signOut,
    response: () => ({
      status: 200,
      body: {
        success: true,
      },
    }),
    onFulfill: () => mockIsNotAuthenticated(page),
  });
};
