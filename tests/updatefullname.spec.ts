import { test, expect } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import { profileData } from '@core/utils/profile.data';
import { AuthApi } from '@api/auth.api';
import { UpdateProfileApi } from '@api/updateProfile.api';
import { attachScreenshot } from '@core/utils/screenshot.util';
import * as allure from 'allure-js-commons';

test.describe('Update Full Name', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await allure.epic('Profile');
    await allure.feature('Update Full Name');
    await loginPage.goto('/login');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await page.waitForURL(/\/home/);
  });

  test('user can update full name on profile page', async ({ page, profilePage }) => {
    await profilePage.goto('/profile');

    await allure.step('Update full name and save', async () => {
      await profilePage.updateFullName(profileData.newFullName);
    });

    await allure.step('Verify success message and updated value', async () => {
      await expect(profilePage.successMessage).toBeVisible();
      await expect(profilePage.fullNameInput).toHaveValue(profileData.newFullName);
    });

    await allure.step('Take screenshot after full name update', async () => {
      await attachScreenshot(page, 'Full name updated');
    });
  });

  test.afterEach(async ({ request }) => {
    await allure.step('Cleanup: restore original full name via API', async () => {
      const authApi = new AuthApi(request);
      const token = await authApi.Login(loginData.valid.username, loginData.valid.password);
      const updateProfileApi = new UpdateProfileApi(request);
      await updateProfileApi.UpdateProfile(profileData.originalFullName, token);
    });
  });
});