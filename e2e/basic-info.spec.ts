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
import { loadApiMocks, mockIsAuthenticated } from "@/server/mocks";

const [team] = teamFixtures;
const [study] = studyFixtures.filter((study) => study.teamId === team.id);

test.describe("Study Configuration Basic Information Tests", () => {
  test.beforeEach(async ({ page }) => {
    await Promise.all([mockIsAuthenticated(page), loadApiMocks(page)]);
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
      const phoneTitle = page.getByTestId("phone-title");
      await expect(phoneTitle).toContainText(study.title);

      if (study.explanation) {
        const phoneExplanation = page.getByTestId("phone-explanation");
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

      const phoneTitle = page.getByTestId("phone-title");
      await expect(phoneTitle).toContainText(newTitle);

      const phoneExplanation = page.getByTestId("phone-explanation");
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

      const phoneTitle = page.getByTestId("phone-title");
      await expect(phoneTitle).toContainText("Title");

      const phoneExplanation = page.getByTestId("phone-explanation");
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

      const highlightElement = page.getByTestId("phone-preview-highlight");
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
      const highlightElement = page.getByTestId("phone-preview-highlight");

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

      const highlightElement = page.getByTestId("phone-preview-highlight");
      await expect(highlightElement).not.toBeVisible();
    });
  });
});
