import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker/locale//en';
import { expect, test } from '@playwright/test';

test.describe('verify register', () => {
  test(
    'Register with correct data and login',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ page }) => {
      // Arrange:
      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName('male').replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName('male').replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        userPassword: faker.internet.password(),
      };

      registerUserData.userEmail = faker.internet.email({
        firstName: registerUserData.userFirstName,
        lastName: registerUserData.userLastName,
        provider: 'faker.com',
        allowSpecialCharacters: true,
      });

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
      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName('male').replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName('male').replace(/[^A-Za-z]/g, ''),
        userEmail: '#$%',
        userPassword: faker.internet.password(),
      };

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
      const registerPage = new RegisterPage(page);
      const expectedEmailErrorText = 'This field is required';

      // Act:
      await registerPage.goto();
      await registerPage.firstNameInput.fill(
        faker.person.firstName('male').replace(/[^A-Za-z]/g, ''),
      );
      await registerPage.lastNameInput.fill(
        faker.person.lastName('male').replace(/[^A-Za-z]/g, ''),
      );
      await registerPage.passwordInput.fill(faker.internet.password());

      await registerPage.registerButton.click();

      // Assert:
      await expect(registerPage.emailErrorText).toHaveText(
        expectedEmailErrorText,
      );
    },
  );
});
