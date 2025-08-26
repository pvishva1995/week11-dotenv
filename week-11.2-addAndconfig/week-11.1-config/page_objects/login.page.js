export class LoginPage {

  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('[type="submit"]');
    this.loginHome = page.getByText('Sign in to Delek Homes');
  }

  async login(adminEmail, adminPassword) {
    await this.emailInput.fill(adminEmail);
    await this.passwordInput.fill(adminPassword);
    await this.loginButton.click();
  }
}
