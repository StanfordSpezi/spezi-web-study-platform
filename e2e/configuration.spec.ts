//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { mockDatabase } from "@/lib/mockDatabase";
import { expect, test } from "@/lib/playwrightFixtures";

const [team] = mockDatabase.teams;
const [study] = mockDatabase.studies.filter(
  (study) => study.teamId === team.id,
);

test.describe("Study Configuration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.addSignInScript();
    await page.goto(`/${team.id}/${study.id}/configuration`);
  });

  test("displays configuration page", async ({ page }) => {
    await expect(page.getByText("Study Configuration")).toBeVisible();
  });

  test("displays current study configuration", async ({ page }) => {
    const statusText = study.isPublished ? "Published" : "Draft";
    await expect(page.getByText(statusText)).toBeVisible();
  });

  test("allows the user to navigate to the basic information configuration page", async ({
    page,
  }) => {
    await page.getByTestId("edit-basic-information").click();
    await expect(page).toHaveURL((url) =>
      url.pathname.endsWith(
        `/${team.id}/${study.id}/configuration/basic-information`,
      ),
    );
  });
});
