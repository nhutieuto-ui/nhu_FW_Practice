import { test } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import { cartData } from '@core/utils/cart.data';
import { attachScreenshot } from '@core/utils/screenshot.util';
import * as allure from 'allure-js-commons';

test.describe('Add Product To Cart', () => {
  // tests share one server-side cart account and queue behind cartLock; allow extra time for that wait
  test.describe.configure({ timeout: 90_000 });

  const { sameProductTwice } = cartData;

  test.beforeEach(async ({ page, loginPage, cartPage, cartLock }) => {
    await allure.epic('Cart');
    await allure.feature('Add Product To Cart');
    await loginPage.goto('/login');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await page.waitForURL(/\/home/);

    await allure.step('Ensure cart is empty before starting the test', async () => {
      await page.goto('/cart');
      await cartPage.clearCart();
    });
  });

  test('product quantity and price increase correctly when adding the same product twice', async ({ page, homePage, cartPage }) => {
    await allure.step('Add the same product to cart twice', async () => {
      await page.goto('/home');
      await homePage.addSameProductMultipleTimes(2);
      await homePage.goToCart();
      await page.waitForURL(/\/cart/);
    });

    await allure.step('Verify product quantity and unit price in the cart', async () => {
      await cartPage.verifyProductQuantity(sameProductTwice.productName, sameProductTwice.quantity);
      await cartPage.verifyProductPrice(sameProductTwice.productName, sameProductTwice.unitPrice);
    });

    await allure.step('Verify cart total price increased accordingly', async () => {
      await cartPage.verifyTotalPrice(sameProductTwice.expectedTotal);
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Cart after adding same product twice');
    });
  });
});
