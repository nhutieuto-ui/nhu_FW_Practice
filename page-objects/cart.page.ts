import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartTotal: Locator;
  readonly itemName: Locator;
  readonly qtyValue: Locator;
  readonly itemUnitPrice: Locator;
  readonly removeButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(".cart-items .cart-item");
    this.cartTotal = page.locator(".summary-total span").last();
    this.itemName = page.locator(".item-name");
    this.qtyValue = page.locator(".qty-value");
    this.itemUnitPrice = page.locator(".item-unit-price");
    this.removeButton = page.locator(".remove-btn");
    // app renders this message regardless of the selected UI language
    this.emptyCartMessage = page.locator(".cart-empty");
    this.proceedToCheckoutButton = page.locator(".checkout-btn");
  }

  private getCartItem(productName: string): Locator {
    return this.cartItems.filter({ has: this.itemName.filter({ hasText: productName }) });
  }

  // Removes every item from the cart so tests can start from a known, empty state
  async clearCart(): Promise<void> {
    // cart items are fetched asynchronously on load; wait for that to settle before counting
    await this.page.waitForLoadState('networkidle');
    while (await this.removeButton.count() > 0) {
      await this.removeButton.first().click();
    }
  }

  // Verifies the quantity shown for a given product in the cart
  async verifyProductQuantity(productName: string, expectedQuantity: number): Promise<void> {
    await this.verifyText(this.getCartItem(productName).locator(this.qtyValue), String(expectedQuantity));
  }

  // Verifies the product added on the home page is present in the cart
  async verifyProductName(productName: string): Promise<void> {
    await this.verifyText(this.getCartItem(productName).locator(this.itemName), productName);
  }

  // Verifies the unit price shown for a given product in the cart
  async verifyProductPrice(productName: string, expectedPrice: string): Promise<void> {
    await this.verifyContainsText(this.getCartItem(productName).locator(this.itemUnitPrice), expectedPrice);
  }

  // Verifies the cart's grand total
  async verifyTotalPrice(expectedTotal: string): Promise<void> {
    await this.verifyText(this.cartTotal, expectedTotal);
  }

  // Removes a single product from the cart
  async removeProduct(productName: string): Promise<void> {
    await this.clickElement(this.getCartItem(productName).locator(this.removeButton));
  }

  // Removes multiple products from the cart
  async removeProducts(productNames: string[]): Promise<void> {
    await this.clickMultipleTimes(this.removeButton.first(), productNames.length);
  }

  // Verifies multiple products are present in the cart
  async verifyProductsPresent(productNames: string[]): Promise<void> {
    await this.verifyTexts(this.itemName, productNames);
  }

  // Verifies the cart's empty state is shown
  async verifyCartIsEmpty(): Promise<void> {
    await this.verifyVisible(this.emptyCartMessage);
  }

  // Proceeds from the cart to the checkout page
  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.proceedToCheckoutButton);
  }
}
