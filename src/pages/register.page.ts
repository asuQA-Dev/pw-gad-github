import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';

  firstname: Locator;
  lastname: Locator;
  email: Locator;
  password: Locator;
  registerButton: Locator;
  alertPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.firstname = page.getByTestId('firstname-input');
    this.lastname = page.getByTestId('lastname-input');
    this.email = page.getByTestId('email-input');
    this.password = page.getByTestId('password-input');
    this.registerButton = page.getByTestId('register-button');
    this.alertPopup = page.getByTestId('alert-popup');
  }

  async registerUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerButton.click();
  }
}
