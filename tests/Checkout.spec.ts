import { test, expect } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import * as allure from 'allure-js-commons';
import { checkoutData, paymentMethods } from '@core/utils/checkout.data';
import { attachScreenshot } from '@core/utils/screenshot.util';

test.describe('Checkout Process', () => {
    test.beforeEach(async ({ page, loginPage, checkoutPage }) => {
        await allure.epic('Checkout');
        await allure.feature('Checkout Process');
        await loginPage.goto('/login');
        await loginPage.login(loginData.valid.username, loginData.valid.password);
        await page.waitForURL(/\/home/);
    });
    
    test('should complete the checkout process successfully', async ({ page, homePage, cartPage, checkoutPage }) => {
        //add product to cart
        await allure.step('Add a product to the cart', async () => {
            await homePage.addSingleProducttoCart();
            await homePage.goToCart();
            await page.waitForURL(/\/cart/);
        });

        //proceed to checkout from cart page 
        await allure.step('Proceed to checkout from cart page', async () => {
            await cartPage.proceedToCheckout();
            await page.waitForURL(/\/checkout/);
        });
        //fill recipient information and select payment method and checkout
        await allure.step('Proceed to checkout', async () => {
            await page.waitForURL(/\/checkout/);
            await checkoutPage.Checkout(
                checkoutData.recipient.fullName,
                checkoutData.recipient.phoneNumber,
                checkoutData.recipient.address,
                paymentMethods.methods[0]
            );
            // Verify that the order was placed successfully
            await checkoutPage.verifyOrderPlacedSuccessfully();

        });

        await allure.step('Attach screenshot', async () => {
            await attachScreenshot(page, 'Checkout completed successfully');
        });
    });
});
    