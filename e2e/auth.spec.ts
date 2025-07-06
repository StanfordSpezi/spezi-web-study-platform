//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { expect, test } from "@/lib/playwrightFixtures";

test.describe("Authentication Flows", () => {
  test("redirects to sign-in when not authenticated", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/sign-in/);
    await expect(page.getByText("Sign into the study platform")).toBeVisible();
  });

  test("can sign in and access protected route", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).not.toHaveURL(/\/sign-in/);
    await page.goto("/");
    await expect(page).not.toHaveURL(/\/sign-in/);
  });

  test("logging out redirects to sign-in and blocks dashboard", async ({
    page,
  }) => {
    await page.addSignInScript();
    await page.goto("/");
    // Open user dropdown and click sign out
    await page.getByRole("button", { name: /user menu/i }).click();
    await page.getByRole("menuitem", { name: /sign out/i }).click();
    await expect(page).toHaveURL(/\/sign-in/);
    await page.goto("/");
    // Try to access dashboard again
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("auth state persists across reloads", async ({ page }) => {
    await page.addSignInScript();
    await page.goto("/");
    await expect(page).not.toHaveURL(/\/sign-in/);
    await page.reload();
    await expect(page).not.toHaveURL(/\/sign-in/);
  });
});
