import { randomUserData } from '../src/factories/user.factory';
import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUser;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = randomUserData();
    await registerPage.goto();
  });

  test(
    'Register with correct data and login',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ page }) => {
      // Arrange:
      const expectedPopupMessage = 'User created';
      const expectedTitleLogin = 'Login';
      const expectedTitleWelcome = 'Welcome';

      const loginPage = new LoginPage(page);
      const welcomePage = new WelcomePage(page);

      // Act:
      await registerPage.registerUser(registerUserData);

      // Assert:
      await expect(registerPage.alertPopup).toHaveText(expectedPopupMessage);
      await loginPage.waitForPageLoadToUrl();

      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain(expectedTitleLogin);

      // Assert: test login
      await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      const titleWelcome = await welcomePage.title();
      expect(titleWelcome).toContain(expectedTitleWelcome);
    },
  );

  test(
    'Not register with incorrect data - non valid email',
    { tag: '@GAD-R03-04' },
    async () => {
      // Arrange:
      const expectedErrorText = 'Please provide a valid email address';
      registerUserData.userEmail = '#$%';

      // Act:
      await registerPage.registerUser(registerUserData);

      // Assert:
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
  test(
    'Not register with incorrect data - email not provided',
    { tag: '@GAD-R03-04' },
    async () => {
      // Arrange:
      const expectedEmailErrorText = 'This field is required';

      // Act:
      await registerPage.firstNameInput.fill(registerUserData.userFirstName);
      await registerPage.lastNameInput.fill(registerUserData.userLastName);
      await registerPage.passwordInput.fill(registerUserData.userPassword);
      await registerPage.registerButton.click();

      // Assert:
      await expect(registerPage.emailErrorText).toHaveText(
        expectedEmailErrorText,
      );
    },
  );
});
