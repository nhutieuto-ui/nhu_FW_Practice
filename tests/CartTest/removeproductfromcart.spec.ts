import { test } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import { cartData } from '@core/utils/cart.data';
import { attachScreenshot } from '@core/utils/screenshot.util';
import * as allure from 'allure-js-commons';

test.describe('Remove Product To Cart', () => {
  // tests share one server-side cart account and queue behind cartLock; allow extra time for that wait
  test.describe.configure({ timeout: 90_000 });

  const { singleproducttest, multipleProductsTest } = cartData;

  test.beforeEach(async ({ page, loginPage, cartPage, cartLock }) => {
    await allure.epic('Cart');
    await allure.feature('Remove Product From Cart');
    await loginPage.goto('/login');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await page.waitForURL(/\/home/);
    await allure.step('Ensure cart is empty before starting the test', async () => {
      await page.goto('/cart');
      await cartPage.clearCart();
    });
  });

  test('user can remove a product from the cart', async ({ page, homePage, cartPage }) => {
    await allure.step('Add a product to the cart', async () => {
      await page.goto('/home');
      await homePage.addSingleProducttoCart();
      await homePage.goToCart();
      await page.waitForURL(/\/cart/);
    });

    await allure.step('Verify product is in the cart before removal', async () => {
      await cartPage.verifyProductName(singleproducttest.productName);
    });

    await allure.step('Remove the product from the cart', async () => {
      await cartPage.removeProduct(singleproducttest.productName);
    });

    await allure.step('Verify cart is empty after removal', async () => {
      await cartPage.verifyCartIsEmpty();
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Cart after removing single product');
    });
  });

  test('user can remove multiple products from the cart', async ({ page, homePage, cartPage }) => {
    const { productNames } = multipleProductsTest;

    await allure.step('Add multiple products to the cart', async () => {
      await page.goto('/home');
      for (const productName of productNames) {
        await homePage.addProductToCart(productName);
      }
      await homePage.goToCart();
      await page.waitForURL(/\/cart/);
    });

    await allure.step('Verify products are in the cart before removal', async () => {
      await cartPage.verifyProductsPresent(productNames);
    });

    await allure.step('Remove each product from the cart', async () => {
      await cartPage.removeProducts(productNames);
    });

    await allure.step('Verify cart is empty after removing all products', async () => {
      await cartPage.verifyCartIsEmpty();
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Cart after removing multiple products');
    });
  });
});
