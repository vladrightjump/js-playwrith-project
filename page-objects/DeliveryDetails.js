import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameField = page.locator('[data-qa="delivery-last-name"]');
    this.streetField = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeField = page.locator('[data-qa="delivery-postcode"]');
    this.cityField = page.locator('[data-qa="delivery-city"]');
    this.countryDropDown = page.locator('[data-qa="country-dropdown"]');
    this.butonsaveAdresForNextTime = page.locator(
      '[data-qa="save-address-button"]'
    );
    this.buttonContinueToPayment = page.locator(
      '[data-qa="continue-to-payment-button"]'
    );
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.savedAdressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAdressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAdressstreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAdressPostCOde = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAdressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAdressCountry = page.locator('[data-qa="saved-address-country"]');
  }
  fillDetails = async (userAddress) => {
    await this.firstNameField.waitFor();
    await this.firstNameField.fill(userAddress.firstname);
    await this.lastNameField.waitFor();
    await this.lastNameField.fill(userAddress.lastname);
    await this.streetField.waitFor();
    await this.streetField.fill(userAddress.street);
    await this.postCodeField.waitFor();
    await this.postCodeField.fill(userAddress.postcode);
    await this.cityField.waitFor();
    await this.cityField.fill(userAddress.city);
    await this.countryDropDown.waitFor();
    await this.countryDropDown.selectOption(userAddress.country);
  };
  saveDetails = async () => {
    const adressCountBeforeSavind = await this.savedAddressContainer.count();
    await this.butonsaveAdresForNextTime.waitFor();
    await this.butonsaveAdresForNextTime.click();
    await this.savedAddressContainer.waitFor();
    await expect(this.savedAddressContainer).toHaveCount(
      adressCountBeforeSavind + 1
    );

    await this.savedAdressFirstName.first().waitFor();
    expect(await this.savedAdressFirstName.first().innerText()).toBe(
      await this.firstNameField.inputValue()
    );
    await this.savedAdressLastName.first().waitFor();
    expect(await this.savedAdressLastName.first().innerText()).toBe(
      await this.lastNameField.inputValue()
    );
    await this.savedAdressstreet.first().waitFor();
    expect(await this.savedAdressstreet.first().innerText()).toBe(
      await this.streetField.inputValue()
    );
    await this.savedAdressCity.first().waitFor();
    expect(await this.savedAdressCity.first().innerText()).toBe(
      await this.cityField.inputValue()
    );
    await this.savedAdressPostCOde.first().waitFor();
    expect(await this.savedAdressPostCOde.first().innerText()).toBe(
      await this.postCodeField.inputValue()
    );
    await this.savedAdressCountry.first().waitFor();
    expect(await this.savedAdressCountry.first().innerText()).toBe(
      await this.countryDropDown.inputValue()
    );
  };
  continueToPayment = async () => {
    await this.buttonContinueToPayment.waitFor();
    await this.buttonContinueToPayment.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
