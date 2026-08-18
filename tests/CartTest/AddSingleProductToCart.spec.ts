import { test } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import { cartData } from '@core/utils/cart.data';
import { attachScreenshot } from '@core/utils/screenshot.util';
import * as allure from 'allure-js-commons';

test.describe('Add Product To Cart', () => {
  // tests share one server-side cart account and queue behind cartLock; allow extra time for that wait
  test.describe.configure({ timeout: 90_000 });

  const { singleproducttest } = cartData;

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

  test('user can add a product to the cart', async ({ page, homePage, cartPage }) => {
    await allure.step('Add sneaker to cart', async () => {
      await page.goto('/home');
      await homePage.addSingleProducttoCart();
      await homePage.goToCart();
      await page.waitForURL(/\/cart/);
    });

    await allure.step('Verify product name, quantity and price in the cart', async () => {
      await cartPage.verifyProductName(singleproducttest.productName);
      await cartPage.verifyProductQuantity(singleproducttest.productName, singleproducttest.quantity);
      await cartPage.verifyProductPrice(singleproducttest.productName, singleproducttest.unitPrice);
    });

    await allure.step('Verify cart total price', async () => {
      await cartPage.verifyTotalPrice(singleproducttest.expectedTotal);
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Cart after adding single product');
    });
  });
});
