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

test.describe("Study Configuration Basic Information Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.addSignInScript();
    await page.goto(`/${team.id}/${study.id}/configuration/basic-information`);
  });

  test("displays basic information configuration page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Basic Information" }),
    ).toBeVisible();
  });

  test("displays the study's current basic information", async ({ page }) => {
    await expect(page.getByText(study.title)).toBeVisible();
    if (study.explanation) {
      await expect(page.getByText(study.explanation)).toBeVisible();
    }
  });

  test("allows the user to navigate to the study configuration page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Back" }).click();
    await expect(page).toHaveURL((url) =>
      url.pathname.endsWith(`/${team.id}/${study.id}/configuration`),
    );
  });
});
