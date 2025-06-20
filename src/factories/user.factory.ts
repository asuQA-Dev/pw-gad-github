import { RegisterUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker/locale//en';

export function prepareRandomUser(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
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

  return registerUserData;
}
