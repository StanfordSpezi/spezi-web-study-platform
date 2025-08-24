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

/**
 * Loads and initializes all API route mocks for the given Playwright page.
 */
export const loadApiMocks = (page: Page) => {
  return Promise.all([
    mockAuthRoutes(page),
    mockUserRoutes(page),
    mockTeamsRoutes(page),
    mockStudiesRoutes(page),
  ]);
};

// Re-export for convenience
export { mockIsAuthenticated, mockIsNotAuthenticated } from "./routes/auth";
