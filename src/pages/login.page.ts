import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';

  username: Locator;
  password: Locator;
  loginButton: Locator;
  welcomeMessage: Locator;
  loginError: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByPlaceholder('Enter User Email');
    this.password = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'LogIn' });
    this.welcomeMessage = page.getByTestId('hello');
    this.loginError = page.getByTestId('login-error');
  }

  async login(email: string, password: string): Promise<void> {
    await this.username.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
