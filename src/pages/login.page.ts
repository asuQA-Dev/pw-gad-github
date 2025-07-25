import { LoginUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';

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

  async login(loginUserData: LoginUserModel): Promise<WelcomePage> {
    await this.username.fill(loginUserData.userEmail);
    await this.password.fill(loginUserData.userPassword);
    await this.loginButton.click();

    return new WelcomePage(this.page);
  }
}
