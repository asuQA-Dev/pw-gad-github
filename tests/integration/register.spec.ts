import { prepareRandomUser } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';

test.describe('Verify register', () => {
  let registerUserData: RegisterUserModel;

  test.beforeEach(async () => {
    registerUserData = prepareRandomUser();
  });

  test(
    'Register with correct data and login',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ registerPage }) => {
      // Arrange:
      const expectedPopupMessage = 'User created';
      const expectedTitleLogin = 'Login';
      const expectedTitleWelcome = 'Welcome';

      // const loginPage = new LoginPage(page);

      // const loginData = {
      //   userEmail: registerUserData.userEmail,
      //   userPassword: registerUserData.userPassword,
      // };

      // Act:
      const loginPage = await registerPage.registerUser(registerUserData);

      // Assert:
      await expect(registerPage.alertPopup).toHaveText(expectedPopupMessage);
      await loginPage.waitForPageLoadToUrl();

      const titleLogin = await loginPage.getTitle();
      expect.soft(titleLogin).toContain(expectedTitleLogin);

      // Assert test login
      // const welcomePage = await loginPage.login(loginData);
      const welcomePage = await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      const titleWelcome = await welcomePage.getTitle();
      expect(titleWelcome).toContain(expectedTitleWelcome);
    },
  );

  test('Not register with incorrect data - non valid email', { tag: '@GAD-R03-04' }, async ({ registerPage }) => {
    // Arrange:
    const expectedErrorText = 'Please provide a valid email address';
    registerUserData.userEmail = '#$%';

    // Act:
    await registerPage.registerUser(registerUserData);

    // Assert:
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });

  test('Not register with incorrect data - email not provided', { tag: '@GAD-R03-04' }, async ({ registerPage }) => {
    // Arrange:
    const expectedEmailErrorText = 'This field is required';

    // Act:
    await registerPage.firstNameInput.fill(registerUserData.userFirstName);
    await registerPage.lastNameInput.fill(registerUserData.userLastName);
    await registerPage.passwordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    // Assert:
    await expect(registerPage.emailErrorText).toHaveText(expectedEmailErrorText);
  });
});
