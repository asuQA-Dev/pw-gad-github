import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginUserModel } from '@_src/models/user.model';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test('Login with correct credentials', { tag: '@GAD-R02-01' }, async ({ loginPage }) => {
    // Arrange:
    const expectedTitle = 'Welcome';

    // Act:
    const welcomePage = await loginPage.login(testUser1);

    const title = await welcomePage.getTitle();
    // Assert:
    expect(title).toContain(expectedTitle);
  });

  test('reject Login with incorrect password', { tag: '@GAD-R02-01' }, async ({ loginPage }) => {
    // Arrange:
    const expectedTitle = 'Login';
    const errorMessage = 'Invalid username or password';

    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    // Act:
    await loginPage.login(loginUserData);

    // Assert:
    await expect.soft(loginPage.loginError).toHaveText(errorMessage);

    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedTitle);
  });
});
