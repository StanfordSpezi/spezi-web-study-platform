//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Page } from "@playwright/test";
import { mockAuthRoutes } from "./routes/auth";
import { mockStudiesRoutes } from "./routes/studies";
import { mockTeamsRoutes } from "./routes/teams";
import { mockUserRoutes } from "./routes/user";

interface LoadApiMocksOptions {
  /** Defaults to `true` */
  isAuthenticated?: boolean;
  /** Defaults to `admin` */
  role?: "admin" | "user";
}

/**
 * Loads and initializes all API route mocks for the given Playwright page.
 */
export const loadApiMocks = (page: Page, options: LoadApiMocksOptions = {}) => {
  const { isAuthenticated = true, role = "admin" } = options;
  return Promise.all([
    mockAuthRoutes(page, { isAuthenticated, role }),
    mockUserRoutes(page, { role }),
    mockTeamsRoutes(page),
    mockStudiesRoutes(page),
  ]);
};

interface ClearMockDataParams {
  page: Page;
  entity: "teams" | "studies";
}

/**
 * Clears mock data for the specified entity by sending a request to the corresponding
 * clear endpoint. This is useful for testing onboarding or setup flows.
 */
export const clearMockData = ({ page, entity }: ClearMockDataParams) => {
  return page.evaluate(async (url) => {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to clear mock data for ${entity}`);
    }
    return response;
  }, `http://localhost:3001/api/${entity}/_clear`);
};
