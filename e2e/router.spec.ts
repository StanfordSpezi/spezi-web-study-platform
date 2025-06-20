//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { mockDatabase } from "@/lib/mockApi";
import { expect, test } from "@/lib/playwrightFixtures";

test.describe("Router Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.addSignInScript();
  });

  test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Spezi/);
  });

  test("redirects to first available team and study on root path", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Study Home Route")).toBeVisible();

    const [team] = mockDatabase.teams;
    await expect(page.getByText(team.name)).toBeVisible();

    const [study] = mockDatabase.studies.filter((s) => s.teamId === team.id);
    await expect(page.getByText(study.title)).toBeVisible();
  });

  test("redirects to first available study when accessing team route", async ({
    page,
  }) => {
    const [team] = mockDatabase.teams;

    await page.goto(`/${team.id}`);
    await expect(page.getByText("Study Home Route")).toBeVisible();
    await expect(page.getByText(team.name)).toBeVisible();

    const [study] = mockDatabase.studies.filter((s) => s.teamId === team.id);
    await expect(page.getByText(study.title)).toBeVisible();
  });

  test("navigates via links and displays correct route text", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Study Home Route")).toBeVisible();

    await page.getByRole("link", { name: "Configuration" }).click();
    await expect(page.getByText("Study Configuration Route")).toBeVisible();
  });

  test("displays error page when navigating to non-existent team", async ({
    page,
  }) => {
    const invalidTeamId = "invalid-team";

    await page.goto(`/${invalidTeamId}`);
    await expect(page.getByText("Error")).toBeVisible();
    await expect(
      page.getByText(`Team with id ${invalidTeamId} not found`),
    ).toBeVisible();
  });

  test("displays error page when navigating to non-existent study", async ({
    page,
  }) => {
    const [team] = mockDatabase.teams;
    const invalidStudyId = "invalid-study";

    await page.goto(`/${team.id}/${invalidStudyId}`);
    await expect(page.getByText("Error")).toBeVisible();
    await expect(
      page.getByText(`Study with id ${invalidStudyId} not found`),
    ).toBeVisible();
  });

  test("team selector displays dynamic teams from mock API", async ({
    page,
  }) => {
    const teams = mockDatabase.teams;

    await page.goto("/");

    // Click on the team selector to open the dropdown
    await page.getByRole("button", { name: teams[0].name }).click();

    // Verify that all teams from the mock API are displayed
    for (const team of teams) {
      await expect(
        page.getByRole("menuitem", { name: team.name }),
      ).toBeVisible();
    }
  });

  test("study selector displays dynamic studies from mock API", async ({
    page,
  }) => {
    const teams = mockDatabase.teams;
    const studies = mockDatabase.studies.filter(
      (s) => s.teamId === teams[0].id,
    );
    const otherStudies = mockDatabase.studies.filter(
      (s) => s.teamId === teams[1].id,
    );

    await page.goto(`/${teams[0].id}/${studies[0].id}`);

    // Click on the study selector to open the dropdown
    await page.getByRole("button", { name: studies[0].title }).click();

    // Verify that studies for the current team are displayed
    for (const study of studies) {
      await expect(
        page.getByRole("menuitem", { name: study.title }),
      ).toBeVisible();
    }

    // Verify that studies from other teams are not displayed
    for (const otherStudy of otherStudies) {
      await expect(
        page.getByRole("menuitem", { name: otherStudy.title }),
      ).not.toBeVisible();
    }
  });
});
