import { test, expect } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import { attachScreenshot } from '@core/utils/screenshot.util';
import * as allure from 'allure-js-commons';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.epic('Authentication');
    await allure.feature('Login');
    await loginPage.goto('/login');
  });

  test('login fails when username and password are blank', async ({ page, loginPage }) => {
    await allure.step('Submit login form with blank username and password', async () => {
      await loginPage.login(loginData.blank.username, loginData.blank.password);
    });

    await allure.step('Verify error message is shown and user stays on login page', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(/\/login/);
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Login failed with blank credentials');
    });
  });

  test('login succeeds with a valid username and password', async ({ page, loginPage }) => {
    await allure.step('Submit login form with valid username and password', async () => {
      await loginPage.login(loginData.valid.username, loginData.valid.password);
    });

    await allure.step('Verify user is redirected to the home page', async () => {
      await expect(page).toHaveURL(/\/home/);
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Login succeeded - home page');
    });
  });
});
