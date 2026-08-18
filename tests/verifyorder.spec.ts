import { test, expect } from '@core/fixtures/pages.fixture';
import { loginData } from '@core/utils/login.data';
import * as allure from 'allure-js-commons';
import { orderData, orderDetailData } from '@core/utils/order.data';
import { AuthApi } from '@api/auth.api';
import { PlaceOrderApi } from '@api/placeOrder.api';
import { CleanupOrderApi } from '@api/cleanupOrder.api';
import { attachScreenshot } from '@core/utils/screenshot.util';
import { request } from '@playwright/test';

 //Cleanup order by API call before placing new order 

let orderId: string;

test.describe('Verify Order Page', () => {
  test.beforeEach(async ({ loginPage, homePage, orderPage }) => {
    await allure.epic('Orders');
    await allure.feature('Order Details');

    // Cleanup order via API before placing new order
    const requestContext = await allure.step('Cleanup existing orders via API', async () => {
      const ctx = await request.newContext();
      const authApi = new AuthApi(ctx);
      const token = await authApi.Login(loginData.valid.username, loginData.valid.password);
      const cleanupOrderApi = new CleanupOrderApi(ctx);
      await cleanupOrderApi.cleanupOrder(token);
      return { ctx, token };
    });

    //Place new order via API and capture the orderId returned by the response
    await allure.step('Place a new order via API', async () => {
      const placeOrderApi = new PlaceOrderApi(requestContext.ctx);
      orderId = await placeOrderApi.PlaceOrder(requestContext.token, orderData.items, orderData.recipientName, orderData.recipientPhone, orderData.address, orderData.paymentMethod, orderData.totalPrice);
    });

    // Log in 
    await allure.step('Log in', async () => {
      await loginPage.goto('/login');
      await loginPage.login(loginData.valid.username, loginData.valid.password);
    });

    // Navigate to Order page
    await allure.step('Navigate to Order page', async () => {
      await homePage.goToOrders();
    });
  });

  // Test case to verify the order details on the Order page
  test('Verify Order Details', async ({ page, orderPage }) => {
    // Verify the order details on the Order page, including the order ID returned by the placeOrder API response
    await allure.step('Verify the order details on the Order page', async () => {
      await orderPage.verifyOrderDetails(
        orderId,
        orderDetailData.status,
        orderDetailData.itemName,
        orderDetailData.quantity,
        orderDetailData.itemPrice,
        orderDetailData.recipient,
        orderDetailData.totalPrice,
        orderDetailData.paymentMethod,
      );
    });

    await allure.step('Attach screenshot', async () => {
      await attachScreenshot(page, 'Order details verified');
    });
  });
});
