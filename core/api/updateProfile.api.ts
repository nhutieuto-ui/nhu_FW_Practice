import { APIRequestContext, expect } from '@playwright/test';
import { profileData } from '../utils/profile.data';
export class UpdateProfileApi {
  constructor(private request: APIRequestContext) {}
  async UpdateProfile(
    fullname: string = profileData.originalFullName,
    token: string
    ) {
    const response = await this.request.patch(
    `${process.env.BASE_URL}/api/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: fullname,
      },
    }
  );

    expect(response.status()).toBe(200);

     return response;
    }
}
