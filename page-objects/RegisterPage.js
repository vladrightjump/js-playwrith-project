export class RegistePage {
  constructor(page) {
    this.page = page;
    this.emailFiled = page.getByPlaceholder("e-Mail");
    this.passwordField = page.getByPlaceholder("password");
    this.registerButton = page.getByRole("button", { name: "register" });
  }
  singUpAsNewUser = async (email, password) => {
    await this.emailFiled.waitFor();

    await this.emailFiled.fill(email);
    await this.passwordField.waitFor();

    await this.passwordField.fill(password);
    await this.registerButton.waitFor();
    await this.registerButton.click();
  };
}
