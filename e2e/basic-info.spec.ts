//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { mockDatabase } from "@/lib/mockDatabase";
import { expect, test } from "@/lib/playwrightFixtures";

const locators = {
  phoneTitle: "#phone-title",
  phoneExplanation: "#phone-explanation",
  phonePreviewHighlight: "#phone-preview-highlight",
};

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
    const titleInput = page.getByRole("textbox", {
      name: /^title/i,
    });
    await expect(titleInput).toHaveValue(study.title);

    if (study.explanation) {
      const explanationTextarea = page.getByRole("textbox", {
        name: /^explanation/i,
      });
      await expect(explanationTextarea).toHaveValue(study.explanation);
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

  test.describe("Phone Preview", () => {
    test("displays phone mockup with preview content", async ({ page }) => {
      await expect(page.getByTestId("phone-mockup")).toBeVisible();
    });

    test("displays current study data in phone preview", async ({ page }) => {
      const phoneTitle = page.locator(locators.phoneTitle);
      await expect(phoneTitle).toContainText(study.title);

      if (study.explanation) {
        const phoneExplanation = page.locator(locators.phoneExplanation);
        await expect(phoneExplanation).toContainText(study.explanation);
      }
    });

    test("updates phone preview when form fields change", async ({ page }) => {
      const newTitle = "Updated Study Title";
      const newExplanation = "This is an updated explanation for the study.";

      const titleInput = page.getByRole("textbox", {
        name: /^title/i,
      });
      await titleInput.clear();
      await titleInput.fill(newTitle);

      const explanationTextarea = page.getByRole("textbox", {
        name: /^explanation/i,
      });
      await explanationTextarea.clear();
      await explanationTextarea.fill(newExplanation);

      const phoneTitle = page.locator(locators.phoneTitle);
      await expect(phoneTitle).toContainText(newTitle);

      const phoneExplanation = page.locator(locators.phoneExplanation);
      await expect(phoneExplanation).toContainText(newExplanation);
    });

    test("shows placeholder text when form fields are empty", async ({
      page,
    }) => {
      const titleInput = page.getByRole("textbox", {
        name: /^title/i,
      });
      await titleInput.clear();

      const explanationTextarea = page.getByRole("textbox", {
        name: /^explanation/i,
      });
      await explanationTextarea.clear();

      const phoneTitle = page.locator(locators.phoneTitle);
      await expect(phoneTitle).toContainText("Title");

      const phoneExplanation = page.locator(locators.phoneExplanation);
      await expect(phoneExplanation).toContainText("Explanation");
    });
  });

  test.describe("Form Highlighting", () => {
    test("highlights phone preview elements when focusing on title field", async ({
      page,
    }) => {
      const titleInput = page.getByRole("textbox", {
        name: /^title/i,
      });
      await titleInput.focus();

      const highlightElement = page.locator(locators.phonePreviewHighlight);
      await expect(highlightElement).toBeVisible();

      await titleInput.blur();

      await expect(highlightElement).not.toBeVisible();
    });

    test("removes highlight when switching between fields", async ({
      page,
    }) => {
      const titleInput = page.getByRole("textbox", {
        name: /^title/i,
      });
      const explanationTextarea = page.getByRole("textbox", {
        name: /^explanation/i,
      });
      const highlightElement = page.locator(locators.phonePreviewHighlight);

      await titleInput.focus();
      await expect(highlightElement).toBeVisible();

      await explanationTextarea.focus();

      // The highlight should still be visible (on the new target)
      await expect(highlightElement).toBeVisible();

      await explanationTextarea.blur();

      await expect(highlightElement).not.toBeVisible();
    });

    test("does not highlight non-preview field", async ({ page }) => {
      const shortTitleInput = page.getByRole("textbox", {
        name: /^short title/i,
      });
      await shortTitleInput.focus();

      const highlightElement = page.locator(locators.phonePreviewHighlight);
      await expect(highlightElement).not.toBeVisible();
    });
  });
});
