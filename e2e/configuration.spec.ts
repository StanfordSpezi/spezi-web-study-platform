//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { expect, test } from "@/lib/playwrightFixtures";
import { componentFixtures } from "@/server/database/entities/component/fixtures";
import { studyFixtures } from "@/server/database/entities/study/fixtures";
import { teamFixtures } from "@/server/database/entities/team/fixtures";
import { loadApiMocks } from "@/server/mocks";

const [team] = teamFixtures;
const [study] = studyFixtures.filter((study) => study.teamId === team.id);
const [component] = componentFixtures.filter(
  (component) => component.studyId === study.id,
);

test.describe("Study Configuration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await loadApiMocks(page);
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

  test("renders the components list with summary and schedule", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Components" }),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "Welcome" })).toBeVisible();
  });

  test("navigates to the component detail page from the list", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Welcome" }).click();
    await expect(page).toHaveURL((url) =>
      url.pathname.endsWith(
        `/${team.id}/${study.id}/configuration/components/${component.id}`,
      ),
    );
  });

  test("opens the new component dialog", async ({ page }) => {
    await page.getByRole("button", { name: "Add component" }).click();

    await expect(
      page.getByRole("heading", { name: "Choose a component type" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Information" }),
    ).toBeChecked();
  });
});
