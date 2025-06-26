import { LoginUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'Login with correct credentials',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange:
      const expectedTitle = 'Welcome';
      const loginPage = new LoginPage(page);
      const welcomePage = new WelcomePage(page);

      // Act:
      await loginPage.goto();
      await loginPage.login(testUser1);

      // Assert:
      const title = await welcomePage.getTitle();
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'reject Login with incorrect password',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange:
      const expectedTitle = 'Login';
      const errorMessage = 'Invalid username or password';
      const loginPage = new LoginPage(page);

      const loginUserData: LoginUserModel = {
        userEmail: testUser1.userEmail,
        userPassword: 'incorrectPassword',
      };

      // Act:
      await loginPage.goto();
      await loginPage.login(loginUserData);

      // Assert:
      await expect.soft(loginPage.loginError).toHaveText(errorMessage);

      const title = await loginPage.getTitle();
      expect.soft(title).toContain(expectedTitle);
    },
  );
});
