export class RegistrationPage {

  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[name="firstName"]');
    this.lastName = page.locator('[name="lastName"]');
    this.emailAddress = page.locator('[name="email"]');
    this.password = page.locator('[name="password"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.firstNameRequired = page.getByText('First name required');
    this.lastNameRequired = page.getByText('Last name required');
    this.emailRequired = page.getByText('Email is required');
    this.passwordRequired = page.getByText('Password is required');
  }

  async registration(randomFirstName, randomLastName, randomEmail, randomPassword) {
    await this.firstName.fill(randomFirstName);
    await this.lastName.fill(randomLastName);
    await this.emailAddress.fill(randomEmail);
    await this.password.fill(randomPassword);
    await this.registerButton.click();
  }
}
