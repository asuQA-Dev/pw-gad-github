import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('verify register', () => {
  test(
    'Register with correct data and login',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ page }) => {
      // Arrange:
      const registerPage = new RegisterPage(page);
      const firstname = 'Jack';
      const lastname = 'Black';
      const email = `black.jack${new Date().getTime()}@gmail.com`;
      const password = 'password';
      const expectedTitleLogin = 'Login';
      const popupMessage = 'User created';
      const expectedTitleWelcome = 'Welcome';

      // Act:
      await registerPage.goto();
      await registerPage.registerUser(firstname, lastname, email, password);

      // Assert:

      await expect(registerPage.alertPopup).toHaveText(popupMessage);
      const loginPage = new LoginPage(page);
      await loginPage.waitForPageLoadToUrl();

      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain(expectedTitleLogin);

      await loginPage.login(email, password);

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();
      expect(titleWelcome).toContain(expectedTitleWelcome);
    },
  );
});
