import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("example test visual comparisons", async ({ page }) => {
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot();
});

test("example test visual element", async ({ page }) => {
  await page.waitForTimeout(1000);
  ``;
  await expect(
    page.locator("[data-qa='product-card']:has-text('Astronaut dabbing')")
  ).toHaveScreenshot();
});
