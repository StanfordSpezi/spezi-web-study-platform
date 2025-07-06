//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, type Page } from "@playwright/test";
import { mockDatabase } from "@/lib/mockApi";
import { mockAdminUser } from "@/lib/mockApi/user";

type CustomPage = Page & {
  /**
   *  Adds a script to the page that simulates a signed-in admin user.
   * If the mock database is already set in localStorage, it does nothing.
   */
  addSignInScript: () => Promise<void>;
  /**
   *  Overrides the default goto method to ensure all paths are relative to the root.
   */
  _goto: Page["goto"];
};

export const test = base.extend<{ page: CustomPage }>({
  page: async ({ page }, use) => {
    page._goto = page.goto.bind(page);
    page.goto = (path, options) => {
      if (path !== "/" && path.startsWith("/")) {
        path = `.${path}`;
      }
      return page._goto(path, options);
    };

    page.addSignInScript = () => {
      return page.addInitScript(
        ({ mockDatabase, mockAdminUser }) => {
          const existingData = window.localStorage.getItem("mock-api");
          if (existingData) return;
          mockDatabase.currentUser = mockAdminUser;
          window.localStorage.setItem("mock-api", JSON.stringify(mockDatabase));
        },
        { mockDatabase, mockAdminUser },
      );
    };
    await use(page);
  },
});

export { expect } from "@playwright/test";
