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
