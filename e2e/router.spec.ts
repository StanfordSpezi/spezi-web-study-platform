//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Spezi/);
});
test("displays appropriate text on root path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Study Home Route")).toBeVisible();
  await expect(page.getByText("team-pine")).toBeVisible();
  await expect(page.getByText("activity-study")).toBeVisible();
});

test("navigates via links and displays correct route text", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Study Home Route")).toBeVisible();

  // Click on the "Configuration" link and check for "Configuration Route"
  await page.getByRole("link", { name: "Configuration" }).click();
  await expect(page.getByText("Study Configuration Route")).toBeVisible();
});
