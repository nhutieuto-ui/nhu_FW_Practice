import testData from '../source/testData.json';

export interface Credentials {
  username: string;
  password: string;
}

export const loginData: { valid: Credentials; blank: Credentials } = testData.login;
