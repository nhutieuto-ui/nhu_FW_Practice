import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
  readonly checkoutPageTitle: Locator;
  readonly recipientInformationForm: Locator;
  readonly fullName: Locator;
  readonly address: Locator;
  readonly phoneNumber: Locator;
  readonly paymentMethod: Locator;
  readonly checkoutTotalPrice: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    // app renders this title regardless of the selected UI language
    this.checkoutPageTitle = page.locator("h1.checkout-title");
    this.recipientInformationForm = page.locator(".checkout-form .checkout-section").first();
    this.fullName = page.getByTestId("checkout-name");
    this.address = page.getByTestId("checkout-address");
    this.phoneNumber = page.getByTestId("checkout-phone");
    this.paymentMethod = page.locator(".payment-methods");
    this.checkoutTotalPrice = page.locator(".summary-total-price");
    this.placeOrderButton = page.getByTestId("checkout-submit");
    this.orderConfirmationMessage = page.getByTestId("checkout-success-heading");
  }

  // the radio input itself is visually hidden; its label is the clickable element
  private getPaymentOption(paymentMethod: string): Locator {
    return this.paymentMethod.locator(`.payment-option:has(input[value="${paymentMethod}"])`);
  }

  // Fills the recipient form and places the order using the given payment method
  async Checkout(
    fullName: string,
    phoneNumber: string,
    address: string,
    paymentMethod: string
  ): Promise<void> {
    await this.fillText(this.fullName, fullName);
    await this.fillText(this.phoneNumber, phoneNumber);
    await this.fillText(this.address, address);
    await this.clickElement(this.getPaymentOption(paymentMethod));
    await this.clickElement(this.placeOrderButton);
  }

  //verify order placed successfully
  async verifyOrderPlacedSuccessfully(): Promise<void> {
    // message renders in either English or Vietnamese depending on the selected UI language
    await expect(this.orderConfirmationMessage).toHaveText(
      /^(Đặt hàng thành công!|Order Placed Successfully!)$/
    );
  }
}
