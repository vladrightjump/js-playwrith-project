import { test, expect } from "@playwright/test";

test.skip("Product Page Add To Basket", async ({ page }) => {
  await page.goto("/");
  const addAddToBasketButton = page
    .locator('[data-qa="product-button"]')
    .first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');
  await addAddToBasketButton.waitFor();
  await expect(addAddToBasketButton).toHaveText("Add to Basket");
  await expect(basketCounter).toHaveText("0");

  await addAddToBasketButton.click();
  await expect(addAddToBasketButton).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("1");
  const CheckoutLink = page.getByRole("link", { name: "Checkout" });
  await CheckoutLink.waitFor();
  await CheckoutLink.click();
  await page.waitForURL("/basket");
});
