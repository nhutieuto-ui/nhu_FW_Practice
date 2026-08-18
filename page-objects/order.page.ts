import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class OrderPage extends BasePage {
readonly ordersTitle: Locator;
readonly orderID: Locator;
readonly orderStatus: Locator;
readonly orderItemName: Locator;
readonly orderItemQuantity: Locator;
readonly orderItemPrice: Locator;
readonly orderRecipient: Locator;
readonly orderPayment: Locator;
readonly orderDate: Locator;
readonly orderTotal: Locator;

constructor(page: Page) {
    super(page);
    this.ordersTitle = page.getByTestId("orders-title");
    this.orderID = page.locator(".order-id");
    this.orderStatus = page.locator(".order-status");
    this.orderItemName = page.locator(".order-item-name");
    this.orderItemQuantity = page.locator(".order-item-qty");
    this.orderItemPrice = page.locator(".order-item-price");
    this.orderRecipient = page.locator('.order-recipient span').first();
    this.orderTotal = page.locator('.order-total');
    this.orderPayment = page.locator('.order-payment');
    this.orderDate = page.locator('.order-date');
  }

  // Verifies the order detail displayed on the order page, including the order ID returned by the placeOrder API response
  async verifyOrderDetails(
    expectedOrderID: string,
    expectedStatus: string,
    expectedName: string,
    expectedQuantity: string,
    expectedPrice: string,
    expectedRecipient: string,
    expectedTotal: string,
    expectedPayment: string,
      ): Promise<void> {
    await this.verifyContainsText(this.orderID, expectedOrderID);
    await this.verifyText(this.orderStatus, expectedStatus);
    await this.verifyText(this.orderItemName, expectedName);
    // quantity is rendered as "×<qty>", recipient name is prefixed with an emoji
    await this.verifyContainsText(this.orderItemQuantity, expectedQuantity);
    await this.verifyText(this.orderItemPrice, expectedPrice);
    await this.verifyContainsText(this.orderRecipient, expectedRecipient);
    await this.verifyText(this.orderTotal, expectedTotal);
    await this.verifyText(this.orderPayment, expectedPayment);
    // order date is rendered as "hh:mm dd/mm/yyyy", so only the date portion is verified
    const currentDate = new Date();
    const expectedOrderDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    await this.verifyContainsText(this.orderDate, expectedOrderDate);
  }
}