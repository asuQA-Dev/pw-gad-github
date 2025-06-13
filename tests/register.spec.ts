import { randomUserData } from '../src/factories/user.factory';
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
      const registerUserData = randomUserData();
      const registerPage = new RegisterPage(page);

      const expectedTitleLogin = 'Login';
      const popupMessage = 'User created';
      const expectedTitleWelcome = 'Welcome';

      // Act:
      await registerPage.goto();
      await registerPage.registerUser(registerUserData);

      // Assert:

      await expect(registerPage.alertPopup).toHaveText(popupMessage);
      const loginPage = new LoginPage(page);
      await loginPage.waitForPageLoadToUrl();

      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain(expectedTitleLogin);

      // Assert:
      await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();
      expect(titleWelcome).toContain(expectedTitleWelcome);
    },
  );

  test(
    'Not register with incorrect data - non valid email',
    { tag: '@GAD-R03-04' },
    async ({ page }) => {
      // Arrange:
      const registerUserData = randomUserData();
      registerUserData.userEmail = '#$%';

      const expectedErrorText = 'Please provide a valid email address';
      const registerPage = new RegisterPage(page);

      // Act:
      await registerPage.goto();
      await registerPage.registerUser(registerUserData);

      // Assert:
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
  test(
    'Not register with incorrect data - email not provided',
    { tag: '@GAD-R03-04' },
    async ({ page }) => {
      // Arrange:
      const registerUserData = randomUserData();

      const registerPage = new RegisterPage(page);
      const expectedEmailErrorText = 'This field is required';

      // Act:
      await registerPage.goto();
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
