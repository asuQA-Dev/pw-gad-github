import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'Login with correct credentials',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange: async ({ page }) => {
      // Arrange:
      const loginPage = new LoginPage(page);
      const email = 'Moses.Armstrong@Feest.ca';
      const password = 'test1';
      const expectedTitle = 'Welcome';

      // Act:
      await loginPage.goto();
      await loginPage.login(email, password);

      // Assert:
      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.title();
      expect(title).toContain(expectedTitle);
    },
  );
});
