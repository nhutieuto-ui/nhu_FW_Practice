import { test as base } from '@playwright/test';
import { LoginPage } from '@page-objects/login.page';
import { ProfilePage } from '@page-objects/profile.page';
import { HomePage } from '@page-objects/home.page';
import { CartPage } from '@page-objects/cart.page';
import { CheckoutPage } from '@page-objects/checkout.page';
import { acquireLock, releaseLock } from '@core/utils/testLock.util';
import { OrderPage } from '@page-objects/order.page';

type Pages = {
  loginPage: LoginPage;
  profilePage: ProfilePage;
  homePage: HomePage;
  cartPage: CartPage;
  // Serializes access to the shared cart account across all workers/files/projects
  cartLock: void;
  checkoutPage: CheckoutPage;
  orderPage: OrderPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
   profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
   homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  cartLock: async ({}, use) => {
    await acquireLock('shared-cart-account');
    try {
      await use();
    } finally {
      releaseLock('shared-cart-account');
    }
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  }
});

export { expect } from '@playwright/test';
