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
const componentsRoute = `/${team.id}/${study.id}/configuration/components`;

test.describe("Study Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await loadApiMocks(page);
    await page.goto(componentsRoute);
    await expect(
      page.getByRole("heading", { name: "Components", level: 1 }),
    ).toBeVisible();
  });

  test("creates an information component", async ({ page }) => {
    const componentTitle = "Participant Orientation";
    const componentContent = "## Overview\nWelcome to the study!";

    await page.getByRole("button", { name: "Add component" }).first().click();
    await expect(
      page.getByRole("heading", { name: "Choose a component type" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Information" }),
    ).toBeChecked();

    await page.getByRole("link", { name: "Create component" }).click();
    await expect(
      page.getByRole("heading", { name: "New Information Component" }),
    ).toBeVisible();

    const titleInput = page.getByRole("textbox", { name: /^title/i });
    await titleInput.fill(componentTitle);

    const contentEditor = page.locator(".ProseMirror").first();
    await contentEditor.click();
    await contentEditor.fill(componentContent);

    await page.getByRole("button", { name: /^save$/i }).click();

    await expect(page).toHaveURL((url) =>
      url.pathname.endsWith(`/${team.id}/${study.id}/configuration/components`),
    );
    await expect(
      page.getByRole("link", { name: componentTitle }),
    ).toBeVisible();
    await expect(
      page.getByRole("row", {
        name: new RegExp(`${componentTitle}.*Not scheduled`, "i"),
      }),
    ).toBeVisible();
  });

  test("updates an existing information component", async ({ page }) => {
    const updatedTitle = "Welcome to Sleep Patterns";
    const updatedContent = "### Updated Overview\nPlease follow the new steps.";

    await page.getByRole("link", { name: "Welcome" }).click();
    await expect(
      page.getByRole("heading", { name: "Edit Component" }),
    ).toBeVisible();

    const titleInput = page.getByRole("textbox", { name: /^title/i });
    await titleInput.fill(updatedTitle);

    const contentEditor = page.locator(".ProseMirror").first();
    await contentEditor.fill(updatedContent);

    await page.getByRole("button", { name: /^save$/i }).click();
    await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();

    await page.getByRole("link", { name: "Back" }).click();
    await expect(
      page.getByRole("heading", { name: "Components", level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: updatedTitle })).toBeVisible();
  });

  test("deletes an information component", async ({ page }) => {
    await page.getByRole("link", { name: "Welcome" }).click();
    await expect(
      page.getByRole("heading", { name: "Edit Component" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Delete" }).click();

    await page.goto(componentsRoute);
    await expect(
      page.getByRole("heading", { name: "Components", level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Welcome" })).toHaveCount(0);
  });
});
