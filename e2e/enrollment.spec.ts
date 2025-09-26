//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { expect, test } from "@/lib/playwrightFixtures";
import { studyFixtures } from "@/server/database/entities/study/fixtures";
import { teamFixtures } from "@/server/database/entities/team/fixtures";
import { loadApiMocks } from "@/server/mocks";

const [team] = teamFixtures;
const [study] = studyFixtures.filter((study) => study.teamId === team.id);

test.describe("Study Configuration Enrollment Tests", () => {
  test.beforeEach(async ({ page }) => {
    await loadApiMocks(page);
    await page.goto(`/${team.id}/${study.id}/configuration/enrollment`);
  });

  test("displays enrollment configuration page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Enrollment" }),
    ).toBeVisible();
  });

  test("renders key enrollment fields", async ({ page }) => {
    // Study Duration number input
    await expect(
      page.getByRole("spinbutton", { name: /^study duration/i }),
    ).toBeVisible();

    // Private study switch
    await expect(
      page.getByRole("switch", { name: /^private study/i }),
    ).toBeVisible();

    // Participation criteria section label
    await expect(page.getByText(/^participation criteria/i)).toBeVisible();
  });

  test("allows the user to navigate to the study configuration page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Back" }).click();
    await expect(page).toHaveURL((url) =>
      url.pathname.endsWith(`/${team.id}/${study.id}/configuration`),
    );
  });

  test.describe("Update and Save", () => {
    test("saves updated enrollment settings and persists after reload", async ({
      page,
    }) => {
      const newDuration = 45;

      const durationInput = page.getByRole("spinbutton", {
        name: /^study duration/i,
      });
      await durationInput.clear();
      await durationInput.fill(String(newDuration));

      // Toggle the private study switch (fixtures default to false -> becomes true)
      const privateSwitch = page.getByRole("switch", {
        name: /^private study/i,
      });
      await privateSwitch.click();

      // Save changes
      await page.getByRole("button", { name: /^save$/i }).click();
      await expect(page.getByRole("button", { name: /saved/i })).toBeVisible();

      // Reload and verify persistence
      await page.reload();
      await expect(
        page.getByRole("heading", { name: "Enrollment" }),
      ).toBeVisible();
      await expect(durationInput).toHaveValue(String(newDuration));
      await expect(privateSwitch).toHaveAttribute("aria-checked", "true");
    });

    test("does not block navigation after saving changes", async ({ page }) => {
      const durationInput = page.getByRole("spinbutton", {
        name: /^study duration/i,
      });
      await durationInput.clear();
      await durationInput.fill("10");

      // Attempt to navigate with unsaved changes -> expect blocker dialog
      await page.getByRole("link", { name: "Back" }).click();
      await expect(
        page.getByText("Leave this page?", { exact: false }),
      ).toBeVisible();
      await page.getByRole("button", { name: /^stay$/i }).click();
      await expect(
        page.getByText("Leave this page?", { exact: false }),
      ).not.toBeVisible();

      // Save changes
      await page.getByRole("button", { name: /^save$/i }).click();
      await expect(page.getByRole("button", { name: /saved/i })).toBeVisible();

      // Navigate again -> should not show the blocker and should navigate
      await page.getByRole("link", { name: "Back" }).click();
      await expect(page).toHaveURL((url) =>
        url.pathname.endsWith(`/${team.id}/${study.id}/configuration`),
      );
    });
  });
});
