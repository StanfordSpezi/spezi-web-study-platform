//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { expect, test } from "@/lib/playwrightFixtures";
import { clearMockData, loadApiMocks } from "@/server/mocks";

test.describe("Onboarding Tests", () => {
  test.describe("Non-admin onboarding flow", () => {
    test.beforeEach(async ({ page }) => {
      await loadApiMocks(page, { role: "user" });
      await Promise.all([
        clearMockData({ page, entity: "studies" }),
        clearMockData({ page, entity: "teams" }),
      ]);
    });

    test("displays no team message for non-admins without teams", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(
        page.getByRole("heading", { name: /you're not on a team/i }),
      ).toBeVisible();
    });
  });
});

test.describe("Admin onboarding flow", () => {
  test.beforeEach(async ({ page }) => {
    await loadApiMocks(page, { role: "admin" });
    await Promise.all([
      clearMockData({ page, entity: "studies" }),
      clearMockData({ page, entity: "teams" }),
    ]);
  });

  test("redirects admin with no teams to onboarding", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /create your first team/i }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/onboarding(\/?$|\?)/);
  });

  test("creates a team and proceeds to invite teammates", async ({ page }) => {
    await page.goto("/");
    const nameInput = page.getByPlaceholder("Team name");
    await nameInput.fill("My New Team");
    await page.getByRole("button", { name: /^create team$/i }).click();

    // Navigates to invite screen with team query param
    await expect(page).toHaveURL(/\/onboarding\/invite/);
    await expect(
      page.getByRole("heading", { name: /invite teammates/i }),
    ).toBeVisible();
  });

  test("invite requires valid email and then navigates to team page", async ({
    page,
  }) => {
    // Go through create team first
    await page.goto("/");
    await page.getByPlaceholder("Team name").fill("My Team");
    await page.getByRole("button", { name: /^create team$/i }).click();
    await expect(page).toHaveURL(/\/onboarding\/invite\?team=new-team-id/);

    // Fill a valid email and submit
    await page.getByPlaceholder(/enter email/i).fill("jane@example.com");
    await page.getByRole("button", { name: /invite team members/i }).click();

    // Navigates to the newly created team's page (no studies yet)
    await expect(page).toHaveURL(/\/new-team-id(\/?$)/);
    await expect(
      page.getByText("Welcome to the Spezi Study Platform!"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /create study/i }),
    ).toBeVisible();
  });
});

test.describe("Create study flow", () => {
  test.beforeEach(async ({ page }) => {
    await loadApiMocks(page, { role: "admin" });
    await clearMockData({ page, entity: "studies" });
  });

  test("creates a study and navigates to study home", async ({ page }) => {
    await page.goto("/");

    // Open create study modal
    await page.getByRole("button", { name: /create study/i }).click();
    await expect(
      page.getByRole("heading", { name: /create a new study/i }),
    ).toBeVisible();

    // Fill study name and submit
    await page.getByPlaceholder(/study title/i).fill("My New Study");
    await page.getByRole("button", { name: /create study/i }).click();

    // Navigates to the newly created study's home
    await expect(page).toHaveURL(new RegExp("new-study-id"));
    await expect(page.getByText("Study Home Route")).toBeVisible();
  });
});

test.describe("Onboarding redirect when teams already exist", () => {
  test.beforeEach(async ({ page }) => {
    // Default fixtures include teams and studies
    await loadApiMocks(page, { role: "admin" });
  });

  test("navigating to /onboarding redirects to dashboard", async ({ page }) => {
    await page.goto("/onboarding");
    // Will be redirected to team route, then to first available study
    await expect(page.getByText("Study Home Route")).toBeVisible();
  });
});
