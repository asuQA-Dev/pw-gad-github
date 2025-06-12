import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'Login with correct credentials',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange: async ({ page }) => {
      // Arrange:
      const loginPage = new LoginPage(page);
      const userEmail = testUser1.userEmail;
      const password = testUser1.userPassword;
      const expectedTitle = 'Welcome';

      // Act:
      await loginPage.goto();
      await loginPage.login(userEmail, password);

      // Assert:
      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.title();
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'reject Login with incorrect password',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange: async ({ page }) => {
      // Arrange:
      const loginPage = new LoginPage(page);
      const userEmail = testUser1.userEmail;
      const userPassword = 'incorrectPassword';
      const expectedTitle = 'Login';
      const errorMessage = 'Invalid username or password';

      // Act:
      await loginPage.goto();
      await loginPage.login(userEmail, userPassword);

      // Assert:
      await expect.soft(loginPage.loginError).toHaveText(errorMessage);

      const title = await loginPage.title();
      expect.soft(title).toContain(expectedTitle);
    },
  );
});
