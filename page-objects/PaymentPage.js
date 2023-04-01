import { expect } from "@playwright/test";
export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.dicountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountCodeField = page.locator('[data-qa="discount-code-input"]');
    this.activatetDiscountButton = page.getByRole("button", {
      name: "Submit discount",
    });
    this.discountActivateMesage = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.discountedValue = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.originalTotalPrice = page.locator('[data-qa="total-value"]');
    this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNummberInput = page.locator(
      '[data-qa="credit-card-number"]'
    );
    this.cardValidUntilInput = page.locator('[data-qa="valid-until"]');
    this.cardCvcInput = page.locator('[data-qa="credit-card-cvc"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  }
  activateDiscount = async () => {
    await this.dicountCode.waitFor();
    const code = await this.dicountCode.innerText();
    // Option 1 for laggy inputs:using .fill() with await example
    await this.discountCodeField.waitFor();
    await this.discountCodeField.fill(code);
    await expect(this.discountCodeField).toHaveValue(code);
    // Option 2 for laggy inputs: slow typing
    // await this.discountCodeField.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountCodeField.inputValue()).toBe(code);
    expect(await this.discountedValue.isVisible()).toBe(false);
    expect(await this.discountActivateMesage.isVisible()).toBe(false);
    await this.activatetDiscountButton.click();
    await this.discountActivateMesage.waitFor();
    const totalValueText = await this.originalTotalPrice.innerText();

    const totalValueOnlyStringNumber = totalValueText.replace("$", "");
    const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10);
    const discountValueText = await this.discountedValue.innerText();

    const discountValueOnlyStringNumber = discountValueText.replace("$", "");
    const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10);
    expect(totalValueNumber).toBeGreaterThan(discountValueNumber);
  };
  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(paymentDetails.owner);

    await this.creditCardNummberInput.waitFor();
    await this.creditCardNummberInput.fill(paymentDetails.number);

    await this.cardValidUntilInput.waitFor();
    await this.cardValidUntilInput.fill(paymentDetails.validUntil);

    await this.cardCvcInput.waitFor();
    await this.cardCvcInput.fill(paymentDetails.cvc);
  };
  completePayment = async () => {
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
