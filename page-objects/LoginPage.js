import { expect } from "@playwright/test";
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginHtext = page.locator("h1");
    this.emailFiled = page.getByPlaceholder("E-Mail");
    this.passwordField = page.getByPlaceholder("Password");
    this.noAccountYetText = page.locator('[class="text-center"]');
    this.registerButton = page.locator('[data-qa="go-to-signup-button"]');
  }
  goToRegisterPage = async () => {
    await this.loginHtext.waitFor();
    await this.noAccountYetText.waitFor();
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
