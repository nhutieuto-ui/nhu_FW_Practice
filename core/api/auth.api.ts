import { APIRequestContext, expect } from '@playwright/test';
import { loginData } from '../utils/login.data';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async Login(
    username: string = loginData.valid.username,
    password: string = loginData.valid.password
  ): Promise<string> {
    const response = await this.request.post(
      `${process.env.BASE_URL}/api/auth/login`,
      {
        data: {
          username: username,
          password: password
        }
      }
    );
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    return responseBody.token;
  }
}