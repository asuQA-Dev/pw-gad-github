import { BasePage } from './base.page';
import { RegisterUserModel } from '@_src/models/user.model';
import { Locator, Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';

  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  registerButton: Locator;
  alertPopup: Locator;
  emailErrorText: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('firstname-input');
    this.lastNameInput = page.getByTestId('lastname-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.registerButton = page.getByTestId('register-button');
    this.alertPopup = page.getByTestId('alert-popup');
    this.emailErrorText = page.locator('#octavalidate_email');
  }

  async registerUser(registerUserData: RegisterUserModel): Promise<void> {
    await this.firstNameInput.fill(registerUserData.userFirstName);
    await this.lastNameInput.fill(registerUserData.userLastName);
    await this.emailInput.fill(registerUserData.userEmail);
    await this.passwordInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
