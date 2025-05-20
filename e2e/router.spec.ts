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
test('displays Hello "/"! on root path', async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText('Hello "/"!')).toBeVisible();
});

test('displays Hello "/about"! on about path', async ({ page }) => {
  await page.goto("./about");
  await expect(page.getByText('Hello "/about"!')).toBeVisible();
});
